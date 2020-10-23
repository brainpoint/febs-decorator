
- [Example](#example)
- [配置及初始化.](#配置及初始化)
  - [FeignClient配置](#feignclient配置)
  - [RequestMapping配置](#requestmapping配置)
- [@FeignClient](#feignclient)
- [@RequestMapping](#requestmapping)
- [@PathVariable](#pathvariable)
- [@RequestParam](#requestparam)
- [@RequestBody](#requestbody)
- [对响应内容进行处理.](#对响应内容进行处理)
  - [@ResponseBody](#responsebody)

## Example

可使用如下装饰器实现feignClient:

```js
import { 
  FeignClient,
  RequestMapping, 
  RequestMethod, 
  ResponseBody, 
  ResponseBodyType,
} from "febs-decorator";

@FeignClient({ name: 'base' })
class BaseService {
  /**
   * 请求 base服务中的 /api接口.
   */
  @RequestMapping({ path: '/api', method: RequestMethod.GET })
  async request(@ResponseBody(BeanDemo) resp ?: ResponseBodyType): Promise<BeanDemo> {
    // fallback.
    console.log(resp.sourceMessage) // sourceMessage.
    console.log(resp.error) // error.
    throw new Error('Message Error');
  }
}

new BaseService().request().then((res:BeanDemo)=>{
  // get the message.
});
```

## 配置及初始化.

### FeignClient配置

使用 `@FeignClient` 装饰器前需要进行初始化配置.

```js
import * as febs from 'febs';
import { setFeignClientDefaultCfg } from "febs-decorator";

/**
 * @desc: 设置默认的请求配置. 可用于设置fetch对象, 重试信息等.
 *
 *     负载均衡策略由 findServiceCallback 提供.
 */
setFeignClientDefaultCfg({
  /** 网络请求对象, 当在back-end使用时需设置; 可使用 node-fetch等兼容api */
  fetchObj: febs.net.fetch,
  /** 最大更换实例次数; (默认3) */
  maxAutoRetriesNextServer: 3
  /** 同一实例的重试次数; (默认2) */
  maxAutoRetries: 2,
  // 查询指定的微服务单元.
  findServiceCallback: onFindServiceCallback,
  // 统一过滤网络消息, 返回正确的信息; (可用于统一处理errCode等场景)
  filterMessageCallback: onFilterMessageCallback
})
```

`findServiceCallback` 服务查找回调函数负责给feignClient提供适合的服务节点; 节点的负载均衡由其实现.

<summary>代码示例</summary>

```js
/**
 * @desc 返回指定的服务信息.
 */
async function onFindServiceCallback(
  serviceName: string,
  excludeHost: string
): Promise<{
  ip: string
  port: number
}> {
  // use nacos or eureka api to get a host.
  let hosts = await microservice.getNacosService(serviceName);
  if (!hosts || hosts.length == 0) {
    return null;
  }

  while (true) {
    let host = hosts[Math.floor(Math.random() * hosts.length)];
    if (`${host.ip}:${host.port}` === excludeHost && hosts.length > 1) {
      continue;
    }

    return host;
  }
}
```

`filterMessageCallback` 消息过滤器可对接收到的消息做统一处理, 将需要的信息存储并返回给调用方.

可用于统一处理消息中的errCode等场景.

<summary>代码示例</summary>

```js
function onFilterMessageCallback(receiveMessage: any, retureMessage: any) {
  // errCode == 200 时为正确
  if (receiveMessage.errCode == 200) {
    if (receiveMessage.data) {  // 业务数据.
      for (const key in receiveMessage.data) {
        retureMessage[key] = receiveMessage.data[key];
      }
    }
  }
  // error.
  else {
    throw new Error("service message error");
  }
}
```

### RequestMapping配置

每次使用@RequestMapping装饰器时, 可以单独设置timeout等参数, 也可以设置RequestMapping默认的`timeout`, `headers`等参数.

<summary>设置默认值</summary>

```js
/**
* 设置默认的请求配置. 可用于设置header等.
*/
setRequestMappingDefaultCfg(cfg: {
  /** 每次请求需要附加的header */
  headers?: { [key: string]: string },
  /** 请求超时(ms) */
  timeout?: number,
  /** 在front-end使用时设置跨域等信息 */
  mode?: string|'no-cors'|'cors'|'same-origin',
  credentials?: 'include'|null,
})
```

## @FeignClient

声明一个class为feignClient.

```js
import { FeignClient } from "febs-decorator";

@FeignClient({
  /** 指定微服务的名称 */
  name: string
  /** 用于调试, 指定调用的地址, 使用此地址通信, 忽略RequestMapping中的地址. */
  url?: string
  /** 定义FeignClient类中请求的统一前缀 */
  path?: string
})
class demo {}
```

## @RequestMapping

定义一个请求;

```js
import { FeignClient, RequestMapping, RequestMethod } from "febs-decorator";

@FeignClient({name: 'serviceName'})
class DemoService {
  @RequestMapping({
    /** 指定请求的路径 */
    path: string,
    /** 默认为 GET */
    method?: RequestMethod,
    /** 附加的header */
    headers?: { [key: string]: string },
    /** 超时 (ms), 默认为5000 */
    timeout?: number,
    /** front-end */
    mode?: string|'no-cors'|'cors'|'same-origin',
    credentials?: 'include'|null,})
  async request() : Promise<any> {
    throw new Error('fallback deal');
  }
}
```

除RequestMapping外, 另提供了如下几个装饰器, 可省略method参数

| 装饰器名      | 作用               |
| ------------- | ------------------ |
| `@PostMapping`   | 定义一个post请求   |
| `@GetMapping`    | 定义一个get请求    |
| `@DeleteMapping` | 定义一个delete请求 |
| `@PutMapping`    | 定义一个put请求    |
| `@PatchMapping`  | 定义一个patch请求  |

## @PathVariable

用于映射请求路径中的参数

```js
import { FeignClient, RequestMapping, PathVariable } from "febs-decorator";

@FeignClient({name: 'serviceName'})
class DemoService {
  @GetMapping({path: '/api/{param}'})
  async request( 
    @PathVariable({
      /** 参数名 */
      name: 'param',
      /** 是否是必须存在的参数 */
      required: true,
    }) param:string
  ) : Promise<any> {
    throw new Error('fallback deal');
  }
}

// 按如下方式发起请求, 将请求 /api/hello 接口
let obj = new DemoService();
await obj.request('hello');
```


## @RequestParam

用于映射请求中的查询参数

```js
import { FeignClient, RequestMapping, RequestParam } from "febs-decorator";

@FeignClient({name: 'serviceName'})
class DemoService {
  @GetMapping({path: '/api'})
  async request( 
    @RequestParam({
      /** 参数名 */
      name: 'param',
      /** 是否是必须存在的参数 */
      required: true,
      /** 如果参数不存在时的默认值 */
      defaultValue: 'aa',
    }) param:string
  ) : Promise<any> {
    throw new Error('fallback deal');
  }
}

// 按如下方式发起请求, 将请求 /api?param=hello 接口
let obj = new DemoService();
await obj.request('hello');
```


## @RequestBody

用于映射请求中的content body

```js
import { FeignClient, RequestMapping, RequestBody } from "febs-decorator";

@FeignClient({name: 'serviceName'})
class DemoService {
  @GetMapping({path: '/api'})
  async request( 
    @RequestBody({
      /** 是否是必须存在 */
      required: true,
    }) body: any
  ) : Promise<any> {
    throw new Error('fallback deal');
  }
}

// 按如下方式发起请求, 将请求 /api 接口
// 并使用 'hello'作为内容
let obj = new DemoService();
await obj.request('hello');
```


## 对响应内容进行处理.

除使用 `findServiceCallback` 对接收的消息进行统一处理之外, 还可以使用如下方式进行.

### @ResponseBody

用于映射请求中的响应body, 并对返回数据做校验限制.

```js
import { AssertTrue, FeignClient, RequestMapping, ResponseBody, ResponseBodyType } from "febs-decorator";

/** 定义返回数据类 */
class DemoBean {
  @AssertTrue
  ok: boolean;
}

/** 定义feignClient */
@FeignClient({name: 'serviceName'})
class DemoService {
  @GetMapping({path: '/api'})
  async request( 
    // 限定返回数据类型为 DemoBean, 如果无法转换, 将进入fallback处理.
    @ResponseBody(DemoBean) respBody: ResponseBodyType
  ) : Promise<DemoBean> {

    console.log(respBody.sourceMessage);  // sourceMessage.
    console.log(respBody.error);          // Error object.

    throw new Error('fallback deal');
  }
}
```