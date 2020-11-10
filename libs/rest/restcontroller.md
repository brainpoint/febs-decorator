
- [Example](#example)
- [配置及初始化.](#配置及初始化)
  - [RestController配置](#restcontroller配置)
  - [在web框架中调用Router处理方法](#在web框架中调用router处理方法)
- [@RestController](#restcontroller)

## Example

可使用如下装饰器实现feignClient.

```js
import { 
  RestController,
  RequestMapping, 
  RequestMethod,
  RestObject,
  RestObjectTypeRest
} from "febs-decorator";

/**
 * RestController 继承至 Service, 会在文件被引用到时自动初始化实例; 
 */
@RestController()
class BaseService {
  /**
   * 处理 /api 路由.
   */
  @RequestMapping({ path: '/api', method: RequestMethod.GET, dataType:BeanDemo })
  request(@RestObject obj:RestObjectTypeRest): Promise<BeanDemo> {

    // 如果设置了obj.response.body, 则不会使用返回对象作为body值响应给调用方.
    obj.response.body = {hello:1};

    return Promise.resolve(new BeanDemo());
  }
}
```

## 配置及初始化.

### RestController配置

```js
import * as febs from 'febs';
import { setRestControllerDefaultCfg } from "febs-decorator";

/**
 * @desc: 设置默认的配置. 可用于全局response消息的处理等.
 */
setRestControllerDefaultCfg({
  /** 日志级别. */
  logLevel?: RestLogLevel,
  /** 如果response对象中不存在对应的header, 则附加的header */
  headers?: { [key: string]: string|string[] },
  /** 处理controller处理方法返回的对象returnMessage, 并返回需要response到请求端的内容 */
  filterMessageCallback?: (returnMessage: any, requestUrl: string) => any,
  /** 接收消息时发生数据类型等错误. */
  errorRequestCallback?: (error:Error, request:Rest.RestRequest, response:Rest.RestResponse ) => void,
  /** 响应消息时发生错误. */
  errorResponseCallback?: (error:Error, request:Rest.RestRequest, response:Rest.RestResponse ) => void,
  /** 404. */
  notFoundCallback?: (request:Rest.RestRequest, response:Rest.RestResponse ) => void,
});
```

### 在web框架中调用Router处理方法

```js
import * as febs from 'febs';
import { CallRestControllerRoute } from "febs-decorator";

/**
* @desc 处理请求; 
* @description 在web框架收到http请求时, 调用此接口后将会触发指定的RestController进行处理. 当匹配到一个处理后即中断后续匹配.
* @return 返回null表明未匹配到适当的router.
*/
function CallRestControllerRoute(
  request: Rest.RestRequest,
  ctx: any,
): Promise<Rest.RestResponse>;
```

## @RestController

声明一个class为RestController.

```js
import { RestController } from "febs-decorator";

@RestController({
  /** 定义RestController类中请求的统一前缀 */
  path?: string
})
class demo {}
```