'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-22 18:15
* Desc: 
*/

import 'reflect-metadata'
import * as febs from 'febs-browser';
import * as Fetch from '@/types/fetch';
import * as Rest from '@/types/rest_request';
import { _RequestMappingPushParams } from './RequestMapping';

const _RestObjectMetadataKey = Symbol('_RestObjectMetadataKey');

type _RestObjectMetadataType = { parameterIndex: number };

/**
 * @desc RestObject参数类型.
 */
export type RestObjectType = {
  /** request对象 */
  request: Fetch.Request|Rest.RestRequest;
  /** response对象 */
  response: Fetch.Response|Rest.RestResponse;
  /** 已经从response对象中读取的消息 */
  responseMsg: any;
  /** 处理过程中发生的错误 */
  error: Error;
  /** web 上下文对象; 如koa.Context等 */
  ctx: any;
};

/**
 * @desc 用于映射请求中的Rest对象, 可以对Request,Response等内容做特殊处理.
 * 
 * @returns {ParameterDecorator}
 */
export function RestObject(target: Object, propertyKey: string | symbol, parameterIndex: number): void;
export function RestObject(): ParameterDecorator;
export function RestObject(...args: any[]) {
  if (args.length == 3) {
    let target = args[0];
    let propertyKey = args[1];
    let parameterIndex = args[2];
    if (Reflect.hasOwnMetadata(_RestObjectMetadataKey, target, propertyKey)) {
      throw new febs.exception(
        '@RestObject must only one',
        febs.exception.ERROR,
        __filename,
        __line,
        __column
      );
    }

    Reflect.defineMetadata(_RestObjectMetadataKey, {
      parameterIndex,
    }, target, propertyKey);

    _RequestMappingPushParams(target, {
      parameterIndex,
      type: 'ro'
    });

  } else {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number): void => {
      if (Reflect.hasOwnMetadata(_RestObjectMetadataKey, target, propertyKey)) {
        throw new febs.exception(
          '@RestObject must only one',
          febs.exception.ERROR,
          __filename,
          __line,
          __column
        );
      }

      Reflect.defineMetadata(_RestObjectMetadataKey, {
        parameterIndex,
      }, target, propertyKey);

      _RequestMappingPushParams(target, {
        parameterIndex,
        type: 'ro'
      });
    }
  }
}

export function _RestObjectDo(target: Object, propertyKey: string | symbol, args: IArguments): _RestObjectMetadataType {
  let parameter: _RestObjectMetadataType = Reflect.getOwnMetadata(_RestObjectMetadataKey, target, propertyKey);
  if (!parameter) {
    return null;
  }

  return {
    parameterIndex: parameter.parameterIndex,
  }
}
