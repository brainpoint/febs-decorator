// Type definitions for febs-decorator

export * from './logger.d';
export * from './rest.d';
export * from './rest_request.d';
export * from './service.d';
export * from './validation.d';


declare global {
  /**
  * @desc: 如果开启; 在FeignClient配置中url优先生效, 否则url不生效.
  */
  var __debugFeignClient: boolean;
}

declare namespace urlUtils {
  /**
  * @desc: 连接url地址.
  */
  function join(...args: string[]): string;
}