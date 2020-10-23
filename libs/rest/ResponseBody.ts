'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-22 18:15
* Desc: 
*/

import 'reflect-metadata'
import * as febs from 'febs-browser';

const _ResponseBodyMetadataKey = Symbol('_ResponseBodyMetadataKey');

type _ResponseBodyMetadataType = { parameterIndex: number, type: any };

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
 * @desc 用于映射请求中的响应body. 并对返回数据类型做限制.
 * @param type 可以传递响应对象的类型.
 * 
 * @returns {ParameterDecorator}
 */
export function ResponseBody(target: Object, propertyKey: string | symbol, parameterIndex: number): void;
export function ResponseBody(type?: any): ParameterDecorator;
export function ResponseBody(...args: any[]) {
  if (args.length == 3) {
    let target = args[0];
    let propertyKey = args[1];
    let parameterIndex = args[2];
    if (Reflect.hasOwnMetadata(_ResponseBodyMetadataKey, target, propertyKey)) {
      throw new febs.exception(
        '@ResponseBody must only one',
        febs.exception.ERROR,
        __filename,
        __line,
        __column
      );
    }

    Reflect.defineMetadata(_ResponseBodyMetadataKey, {
      type: null,
      parameterIndex,
    }, target, propertyKey);
  } else {
    let type = args[0];
    return (target: Object, propertyKey: string | symbol, parameterIndex: number): void => {
      if (Reflect.hasOwnMetadata(_ResponseBodyMetadataKey, target, propertyKey)) {
        throw new febs.exception(
          '@ResponseBody must only one',
          febs.exception.ERROR,
          __filename,
          __line,
          __column
        );
      }

      Reflect.defineMetadata(_ResponseBodyMetadataKey, {
        type: type,
        parameterIndex,
      }, target, propertyKey);
    }
  }
}

export function _ResponseBodyDo(target: Object, propertyKey: string | symbol, args: IArguments): {parameterIndex: number, type:any } {
  let parameter: _ResponseBodyMetadataType = Reflect.getOwnMetadata(_ResponseBodyMetadataKey, target, propertyKey);
  if (!parameter) {
    return null;
  }

  return {
    parameterIndex: parameter.parameterIndex,
    type: parameter.type,
  }
}
