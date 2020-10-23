'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-22 18:15
* Desc: 
*/

import 'reflect-metadata'
import * as febs from 'febs-browser';
import { _PathVariableDo } from './PathVariable';
import { _FeignClientDo, _FeignClientMetadataKey } from './FeignClient';
import { _RequestBodyDo } from './RequestBody';
import { _RequestParamDo } from './RequestParam';
import { _ResponseBodyDo } from './ResponseBody';

const DefaultRequestCfg = Symbol('DefaultRequestCfg');

// export type RequestMappingMetadataType = {
//   path: string[],
//   method: RequestMethod,
//   mode: string|'no-cors'|'cors'|'same-origin',
//   headers: { [key: string]: string },
//   timeout: number,
//   credentials: 'include'|null|undefined,
// };

/**
* @desc: 设置默认的请求配置. 可用于设置header等.
*/
export function setRequestMappingDefaultCfg(cfg: {
  /** 每次请求需要附加的header */
  headers?: { [key: string]: string },
  /** 请求超时(ms) */
  timeout?: number,
  /** 在front-end使用时设置跨域等信息 */
  mode?: string|'no-cors'|'cors'|'same-origin',
  credentials?: 'include'|null,
}) {
  (global as any)[DefaultRequestCfg] = {
    mode: cfg.mode,
    headers: cfg.headers,
    timeout: cfg.timeout,
    credentials: cfg.credentials,
  }
}

function getRequestMappingDefaultCfg() : {
  mode?: string|'no-cors'|'cors'|'same-origin',
  headers?: { [key: string]: string },
  timeout?: number,
  credentials?: 'include'|null,
} {
  let cfg = (global as any)[DefaultRequestCfg];
  return cfg || {};
}


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
}) {
  return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.POST));
}

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
}) {
  return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.PUT));
}

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
}) {
  return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.PATCH));
}

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
}) {
  return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.GET));
}

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
}) {
  return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.DELETE));
}

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
  mode?: string|'no-cors'|'cors'|'same-origin',
  credentials?: 'include'|null,
}): MethodDecorator {

  let cpath = Array.isArray(cfg.path) ? cfg.path : [cfg.path];
  for (let i = 0; i < cpath.length; i++) {
    if (febs.string.isEmpty(cpath[i])) {
      throw new febs.exception(
        '@RequestMapping need \'path\' parameter',
        febs.exception.ERROR,
        __filename,
        __line,
        __column
      );
    }
  }

  if (cfg.path.length == 0) {
    throw new febs.exception(
      '@RequestMapping need \'path\' parameter',
      febs.exception.ERROR,
      __filename,
      __line,
      __column
    )
  }

  cfg.method = cfg.method || RequestMethod.GET;

  let pathVariables = getPathVariables(cpath);
  
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
    let method = descriptor.value;
    descriptor.value = function () {
      // FeignClient.
      let isFeignClientClass: boolean = Reflect.hasOwnMetadata(_FeignClientMetadataKey, target.constructor);

      //
      // PathVariable
      //
      if (!_PathVariableDo(target, propertyKey, arguments, pathVariables)) {
        return;
      }

      let urlPaths = setPathVariables(cpath, pathVariables);

      let requestDefaultCfg = getRequestMappingDefaultCfg();
      let requestMappingParam = {
        path: urlPaths,
        method: cfg.method,
        mode: cfg.mode || requestDefaultCfg.mode,
        headers: cfg.headers || requestDefaultCfg.headers,
        timeout: cfg.timeout || requestDefaultCfg.timeout,
        credentials: cfg.credentials || requestDefaultCfg.credentials,
        body: null as string,
      };

      //
      // RequestBody
      //
      _RequestBodyDo(target, propertyKey, arguments, requestMappingParam);

      //
      // RequestParam
      //
      _RequestParamDo(target, propertyKey, arguments, requestMappingParam);

      //
      // ResponseBody.
      //
      let respBody = _ResponseBodyDo(target, propertyKey, arguments);

      //
      // feignClient.
      //
      if (isFeignClientClass) {
        return _FeignClientDo(target, requestMappingParam, respBody, arguments, () => method.apply(this, arguments));
      } else {
        return method.apply(this, arguments);
      }
    }
  }
}

/**
 * 在参数路径中寻找所有 {xxx} 形式的参数; 如果重复, 则抛出异常
 * @param urlPaths 
 */
function getPathVariables(urlPaths: string[]): { [key: string]: string } {
  let vars: { [key: string]: string } = {};

  for (let i in urlPaths) {
    let url = urlPaths[i]
    let urls = url.split('/');
    for (let j in urls) {
      url = urls[j];
      if (/^\{[a-zA-Z\$_][a-zA-Z\d_]*\}$/.test(url)) {
        url = url.substr(1, url.length - 2);
        if (vars.hasOwnProperty(url)) {
          throw new febs.exception(
            '@RequestMapping path variables is conflicted',
            febs.exception.ERROR,
            __filename,
            __line,
            __column
          );
        }
        else {
          vars[url] = '';
        }
      } // if.
    } // for.
  } // for.

  return vars;
}


/**
 * 使用pathVariables构建正确的path.
 * @param urlPaths 
 */
function setPathVariables(urlPaths: string[], pathVariables:{ [key: string]: string }): string[] {
  for (let vari in pathVariables) {
    for (let i in urlPaths) {
      let url = urlPaths[i];
      let urls = url.split('/');
      let match: boolean = false;
      for (let j in urls) {
        if (urls[j] == '{' + vari + '}') {
          urls[j] = pathVariables[vari];
          match = true;
          break;
        }
      }
      if (match) {
        url = '';
        for (let j in urls) {
          if (url.length > 0) {
            url += '/';
          }
          url += urls[j];
        }
        urlPaths[i] = url;
        break;
      }
    }
  }
  return urlPaths;
}