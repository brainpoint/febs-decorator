
- [Example](#example)
- [配置及初始化.](#配置及初始化)
  - [FeignClient配置](#feignclient配置)
  - [findServiceCallback](#findservicecallback)
  - [在前端使用](#在前端使用)
  - [filterMessageCallback](#filtermessagecallback)
- [@FeignClient](#feignclient)

## Example

可使用如下装饰器实现feignClient.

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
    // 当使用@FeignClient时, @RequestMapping所修饰的方法体即是 fallback.
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
  fetch?: fetch.Fetch
  /** 最大更换实例次数; (默认3) */
  maxAutoRetriesNextServer?: number
  /** 同一实例的重试次数; (默认2) */
  maxAutoRetries?: number
  /** 每次请求需要附加的header */
  headers?: { [key: string]: string|string[] },
  /** 请求超时, 默认20000ms */
  timeout?: number,
  /** 日志级别. */
  logLevel?: RestLogLevel,
  /** 获取指定service的回调. */
  findServiceCallback: (
    serviceName: string,
    excludeHost: string
  ) => Promise<MicroserviceInfo>,
  /** 
   * 处理收到的对象receiveMessage, 将正确的结果存储至retureMessage中. 
   * 若抛出异常则表明消息错误, 将会由RestObject传递给controller.
   */
  filterMessageCallback?: (receiveMessage: any, returnMessage: any, requestService: string, requestUrl: string) => void,
  /** 在front-end使用时设置跨域等信息 */
  mode?: string|'no-cors'|'cors'|'same-origin',
  credentials?: 'include'|null,
})
```

### findServiceCallback

`findServiceCallback` 服务查找回调函数负责给feignClient提供适合的服务节点; 节点的负载均衡由其实现.

<summary>代码示例</summary>

```js
/**
 * @desc 返回指定的服务信息.
 */
async function onFindServiceCallback(
  serviceName: string,
  excludeHost: string
): Promise<{MicroserviceInfo}> {
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

### 在前端使用

当简单返回服务器的ip和port时, 可以在前端使用, 作为普通的httpClient.

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
  return Promise.resolve({
    ip: '127.0.0.1', 
    port: '8080'
  });
}
```

### filterMessageCallback

`filterMessageCallback` 消息过滤器可对接收到的消息做统一处理, 将需要的信息存储并返回给调用方.

可用于统一处理消息中的errCode等场景.

<summary>代码示例</summary>

```js
function onFilterMessageCallback(receiveMessage: any, returnMessage: any, requestService: string, requestUrl: string) {
  // errCode == 200 时为正确
  if (receiveMessage.errCode == 200) {
    if (receiveMessage.data) {  // 业务数据.
      for (const key in receiveMessage.data) {
        returnMessage[key] = receiveMessage.data[key];
      }
    }
  }
  // error.
  else {
    throw new Error("service message error");
  }
}
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