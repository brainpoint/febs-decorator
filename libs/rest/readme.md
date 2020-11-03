
- [Example](#example)
- [配置及初始化.](#配置及初始化)
  - [RestController](#restcontroller)
  - [FeignClient](#feignclient)
- [@RequestMapping](#requestmapping)
- [@PathVariable](#pathvariable)
- [@RequestParam](#requestparam)
- [@RequestBody](#requestbody)
- [定义响应或请求内容的类型.](#定义响应或请求内容的类型)
- [@RestObject 获取Rest对象的详细信息](#restobject-获取rest对象的详细信息)

## Example

可使用如下装饰器实现feignClient:

```js
import { 
  FeignClient,
  RequestMapping, 
  RequestMethod,
} from "febs-decorator";

@FeignClient({ name: 'base' })
class BaseService {
  /**
   * 请求 base服务中的 /api接口.
   */
  @RequestMapping({ path: '/api', method: RequestMethod.GET, dataType:BeanDemo })
  async request(): Promise<BeanDemo> {
    // fallback.
    throw new Error('Message Error');
  }
}

new BaseService().request().then((res:BeanDemo)=>{
  // get the message.
});
```

## 配置及初始化.

### RestController

RestController相关装饰器, 查看 [RestController](./restcontroller.md)

### FeignClient

微服务FeignClient相关装饰器, 查看 [FeignClient](./feignclient.md)

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
    @RequestBody body: any
  ) : Promise<any> {
    throw new Error('fallback deal');
  }
}

// 按如下方式发起请求, 将请求 /api 接口
// 并使用 'hello'作为内容
let obj = new DemoService();
await obj.request('hello');
```

默认情况下会根据content-type进行字符串化, 如果需要自定义处理, 可以按如下方式传递字符串化处理方法.

```js
@RequestBody({
  /** 是否是必须存在 */
  required: true,
  /** 对body参数字符串化处理 (默认会根据content-type进行字符串化) */
  stringifyCallback?: (bodyData:any):string=>JSON.stringify(bodyData)
}) body: any
```


## 定义响应或请求内容的类型.

除使用 `findServiceCallback` 对接收的消息进行统一处理之外, 还可以使用如下方式进行.

使用 `dataType` 参数指定返回值类型. 并结合Validation装饰器对类型做限制.

```js
import { AssertTrue, FeignClient, RequestMapping } from "febs-decorator";

/** 定义返回数据类 */
class DemoBean {
  @AssertTrue
  ok: boolean;
}

/** 定义feignClient */
@FeignClient({name: 'serviceName'})
class DemoService {
  @RequestMapping({path: '/api', dataType: DemoBean}) // 如果无法转换远程发送来的数据为DemoBean, 将进入fallback处理.
  async request() : Promise<DemoBean> {
    // fallback
    throw new Error('fallback deal');
  }
}

let bean:DemoBean = await new DemoService().request();
```

如果使用RestController, 则`dataType`将表示`RequestBody`的类型

```js
@RestController()
class DemoService {
  @RequestMapping({path: '/api', dataType: DemoBean}) // 如果无法转换远程发送来的数据为DemoBean, 将进入errorRequestCallback.
  async request( @RequestBody data:DemoBean ) : Promise<any> {

  }
}
```

## @RestObject 获取Rest对象的详细信息

可以使用 `@RestObject` 装饰器获取request,response对象以及处理过程中Error的详细信息.

```js
import { AssertTrue, FeignClient, RequestMapping, RestObject, RestObjectType } from "febs-decorator";

/** 定义返回数据类 */
class DemoBean {
  @AssertTrue
  ok: boolean;
}

/** 定义feignClient */
@FeignClient({name: 'serviceName'})
class DemoService {
  @RequestMapping({path: '/api', dataType: DemoBean}) // 如果无法转换为DemoBean, 将进入fallback处理.
  async request(@RestObject restObject: RestObjectType) : Promise<DemoBean> {
    // fallback

    console.log(restObject.request) // request对象.
    console.log(restObject.response) // response对象.
    console.log(restObject.responseMsg) // 已经从response中读取的消息.
    console.log(restObject.error)       // 引起进入fallback的错误.

    throw new Error('fallback deal');
  }
}

let bean:DemoBean = await new DemoService().request();
```
