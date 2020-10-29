
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
} from "febs-decorator";

@RestController()
class BaseService {
  /**
   * 处理 /api 路由.
   */
  @RequestMapping({ path: '/api', method: RequestMethod.GET, dataType:BeanDemo })
  async request(): Promise<BeanDemo> {
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
  /** 处理controller处理方法返回的对象returnMessage, 并返回需要response到请求端的内容 */
  filterMessageCallback: (returnMessage: any) => any,
});
```

### 在web框架中调用Router处理方法

```js
import * as febs from 'febs';
import { CallRestControllerRoute } from "febs-decorator";

/**
* @desc 在网络请求到来时处理请求; 
* @description 在web框架收到http请求时, 调用此接口后将会触发指定的RestController进行处理. 当匹配到一个处理后即中断后续匹配.
* @return 返回值表明是否匹配到适当的router.
*/
CallRestControllerRoute(
  request: Rest.RestRequest,
  response: Rest.RestResponse,
): Promise<boolean>;
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