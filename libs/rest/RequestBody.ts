'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-22 18:15
* Desc: 
*/

import 'reflect-metadata'
import * as febs from 'febs-browser';
var qs = require('../utils/qs/dist')

const _RequestBodyMetadataKey = Symbol('_RequestBodyMetadataKey');

type _RequestBodyMetadataType = { required: boolean, parameterIndex: number, stringifyCallback?: (bodyData:any)=>string, };


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
  /** 对body参数字符串化处理 (默认会根据content-type进行字符串化) */
  stringifyCallback?: (bodyData:any)=>string,
}): ParameterDecorator {
  cfg.required = febs.utils.isNull(cfg.required) ? true : cfg.required;
  
  return (target: Object, propertyKey: string | symbol, parameterIndex: number): void => {
    if (Reflect.hasOwnMetadata(_RequestBodyMetadataKey, target, propertyKey)) {
      throw new febs.exception(
        '@RequestBody must only one',
        febs.exception.ERROR,
        __filename,
        __line,
        __column
      );
    }

    Reflect.defineMetadata(_RequestBodyMetadataKey, {
      required: cfg.required,
      stringifyCallback: cfg.stringifyCallback,
      parameterIndex,
    }, target, propertyKey);
  }
}

export function _RequestBodyDo(target: Object, propertyKey: string | symbol, args: IArguments, requestMapping: any): void {
  let parameter: _RequestBodyMetadataType = Reflect.getOwnMetadata(_RequestBodyMetadataKey, target, propertyKey);
  if (!parameter) {
    return;
  }
  
  let argVal = args[parameter.parameterIndex];
  if (parameter.required) {
    if (parameter.parameterIndex >= args.length || febs.utils.isNull(argVal)) {
      throw new Error(`@RequestBody Missing required argument`);
    }
  }

  let paramStr: string;
  let t = typeof argVal;
  if (typeof parameter.stringifyCallback === 'function') {
    paramStr = parameter.stringifyCallback(argVal)
  }
  else if (t === 'string') {
    paramStr = argVal;
  }
  else if (t === 'boolean' || t === 'number' || t === 'bigint') {
    paramStr = argVal.toString();
  } 
  else {
    let isJson: boolean = false;
    if (requestMapping.method === 'GET') {
      isJson = false;
    }
    else if (requestMapping.headers) {
      for (let k in requestMapping.headers) {
        if (k.toLowerCase() === 'content-type') {
          let v = requestMapping.headers[k];
          if (v && v.indexOf('application/json') >= 0) {
            isJson = true;
          }
          break;
        }
      }
    } // if..else.

    if (isJson) {
      paramStr = JSON.stringify(argVal);
    }
    else {
      paramStr = qs.stringify(argVal);
    }
  } // if..else.

  if (febs.string.isEmpty(paramStr)) {
    return;
  }

  //
  // set to requestMapping.
  if (requestMapping.method === 'GET') {
    // append qs
    for (const key in requestMapping.path) {
      let p = requestMapping.path[key];
      let i = p.indexOf('?');
      if (i == p.length - 1) {
        p += paramStr;
      } else if (i < 0) {
        p += '?' + paramStr;
      } else {
        p += '&' + paramStr;
      }
      requestMapping.path[key] = p;
    }
  } else {
    requestMapping.body = paramStr;
  } // if..else.
}
