// Type definitions for febs-decorator

/// <reference types="node" />

/**
 * @desc ResponseBody参数类型.
 */
export type ResponseBodyType = {
  /** 接收到的原始数据 */
  sourceMessage: any;
  /** 处理过程中发生的错误 */
  error: Error
};

/**
 * @desc 表明指定的类为feignClient类.
 *
 *      仅支持service返回格式为 application/json或application/x-www-form-urlencoded.
 *
 * @returns {ClassDecorator}
 */
export function FeignClient(cfg: {
  /** 指定微服务的名称 */
  name: string
  /** 用于调试, 指定调用的地址, 使用此地址通信, 忽略RequestMapping中的地址. */
  url?: string
  /** 定义FeignClient类中请求的统一前缀 */
  path?: string
}): ClassDecorator;

/**
 * @desc: 设置默认的请求配置. 可用于设置fetch对象, 重试信息等.
 *
 *     负载均衡策略由 findServiceCallback 提供.
 *
 * @example
 *   import * as fetch from 'node-fetch'
 *   setFeignClientDefaultCfg({
 *      fetchObj:fetch,
 *      findServiceCallback(serviceName, excludeHost):Promise<ip:string, port:number>=> {
 *        return Promise.resolve({ip, port}); 
 *      }
 *   });
 */
export function setFeignClientDefaultCfg(cfg: {
  /** 网络请求对象, 当在back-end使用时需设置; 可使用 node-fetch等兼容api */
  fetchObj?: any
  /** 最大更换实例次数; (默认3) */
  maxAutoRetriesNextServer?: number
  /** 同一实例的重试次数; (默认2) */
  maxAutoRetries?: number
  /** 获取指定service的回调. */
  findServiceCallback: (
    serviceName: string,
    excludeHost: string
  ) => Promise<{
    ip: string
    port: number
  }>,
  /** 处理收到的对象receiveMessage, 将正确的结果存储至retureMessage中 */
  filterMessageCallback?: (receiveMessage: any, retureMessage: any) => void,
}): void;

/**
 * request method.
 */
export enum RequestMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

/**
 * @desc 用于映射请求路径中的参数.
 * 
 * @example
 * 
 *       // url: /contacts/xxx 
 * 
 *       ﹫RequestMapping({path: "/contacts/{contactname}"}) 
 *       foo(﹫PathVariable("contactname") contactname: string) { 
 *           ... 
 *       }  
 * @returns {ParameterDecorator}
 */
export function PathVariable(cfg: {
  /** 参数名 */
  name: string,
  /** 是否是必须存在的参数 */
  required?: boolean,
}): ParameterDecorator;

/**
 * @desc 用于映射请求中的content body.
 * 
 *  将根据 {RequestMapping} 的请求header中的Content-Type来决定body的格式化.
 * 
 *  - 如果参数类型为string, 则直接作为body, 不进行格式化
 *  - 如果参数类型为object, Content-Type:application/json, 将格式化为json.
 *  - 如果参数类型为object, Content-Type:application/x-www-form-urlencoded, 将格式化为querystring.
 *  - 如果请求类型为GET, 将格式化为querystring, 附加在url上.
 * 
 * @returns {ParameterDecorator}
 */
export function RequestBody(cfg: {
  /** 是否是必须存在; */
  required?: boolean,
}): ParameterDecorator;


/**
 * @desc 用于定义post请求.
 * 
 * @returns {MethodDecorator}
 */
export function PostMapping(cfg: {
  /** 指定请求的路径; 不可指定多个路径 */
  path: string | string[],
  /** 附加的header */
  headers?: { [key: string]: string },
  /** 超时 (ms), 默认为5000 */
  timeout?: number,
  mode?: string|'no-cors'|'cors'|'same-origin',
  credentials?: 'include'|null,
}): MethodDecorator;

/**
 * @desc 用于定义put请求.
 * 
 * @returns {MethodDecorator}
 */
export function PutMapping(cfg: {
  /** 指定请求的路径; 不可指定多个路径 */
  path: string | string[],
  /** 附加的header */
  headers?: { [key: string]: string },
  /** 超时 (ms), 默认为5000 */
  timeout?: number,
  mode?: string|'no-cors'|'cors'|'same-origin',
  credentials?: 'include'|null,
}): MethodDecorator;

/**
 * @desc 用于定义patch请求.
 * 
 * @returns {MethodDecorator}
 */
export function PatchMapping(cfg: {
  /** 指定请求的路径; 不可指定多个路径 */
  path: string | string[],
  /** 附加的header */
  headers?: { [key: string]: string },
  /** 超时 (ms), 默认为5000 */
  timeout?: number,
  mode?: string|'no-cors'|'cors'|'same-origin',
  credentials?: 'include'|null,
}): MethodDecorator;

/**
 * @desc 用于定义get请求.
 * 
 * @returns {MethodDecorator}
 */
export function GetMapping(cfg: {
  /** 指定请求的路径; 不可指定多个路径 */
  path: string | string[],
  /** 附加的header */
  headers?: { [key: string]: string },
  /** 超时 (ms), 默认为5000 */
  timeout?: number,
  mode?: string|'no-cors'|'cors'|'same-origin',
  credentials?: 'include'|null,
}): MethodDecorator;

/**
 * @desc 用于定义delete请求.
 * 
 * @returns {MethodDecorator}
 */
export function DeleteMapping(cfg: {
  /** 指定请求的路径; 不可指定多个路径 */
  path: string | string[],
  /** 附加的header */
  headers?: { [key: string]: string },
  /** 超时 (ms), 默认为5000 */
  timeout?: number,
  mode?: string|'no-cors'|'cors'|'same-origin',
  credentials?: 'include'|null,
}): MethodDecorator;

/**
 * @desc 用于定义请求.
 * 
 * @returns {MethodDecorator}
 */
export function RequestMapping(cfg: {
  /** 指定请求的路径; 不可指定多个路径 */
  path: string | string[],
  /** 默认为 GET */
  method?: RequestMethod,
  /** 附加的header */
  headers?: { [key: string]: string },
  /** 超时 (ms), 默认为5000 */
  timeout?: number,
  mode?: string | 'no-cors' | 'cors' | 'same-origin',
  credentials?: 'include' | null,
}): MethodDecorator;

/**
* @desc: 设置默认的请求配置. 可用于设置header等.
*/
export function setRequestMappingDefaultCfg(cfg: {
  /** 每次请求需要附加的header */
  headers?: { [key: string]: string },
  /** 请求超时(ms) */
  timeout?: number,
  /** 在front-end使用时设置跨域等信息 */
  mode?: string | 'no-cors' | 'cors' | 'same-origin',
  credentials?: 'include' | null,
}): void;

/**
 * @desc 用于映射请求中的查询参数.
 * 
 * 
 * @example
 * 
 *       // url: /contacts?contactname=xxx 
 * 
 *       ﹫RequestMapping({path: "/contacts"}) 
 *       foo(﹫RequestParam("contactname") contactname: string) { 
 *           ... 
 *       } 
 * @returns {ParameterDecorator}
 */
export function RequestParam(cfg: {
  /** 参数名 */
  name: string,
  /** 是否是必须存在的参数 */
  required?: boolean,
  /** 如果参数不存在时的默认值 */
  defaultValue?: any,
}): ParameterDecorator;


/**
 * @desc 用于映射请求中的响应body. 并对返回数据类型做限制.
 * @param type 可以传递响应对象的类型.
 * 
 * @returns {ParameterDecorator}
 */
export function ResponseBody(target: Object, propertyKey: string | symbol, parameterIndex: number): void;
export function ResponseBody(type?: any): ParameterDecorator;