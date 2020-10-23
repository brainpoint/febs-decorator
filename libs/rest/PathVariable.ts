'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-22 18:15
* Desc: 
*/

import 'reflect-metadata'
import * as febs from 'febs-browser';

const _PathVariableMetadataKey = Symbol('_PathVariableMetadataKey');

type _PathVariableMetadataType = { name: string, required: boolean, parameterIndex: number };

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
}): ParameterDecorator {
  if (febs.string.isEmpty(cfg.name)) {
    throw new febs.exception(
      '@RequestParam need \'name\' parameter',
      febs.exception.ERROR,
      __filename,
      __line,
      __column
    )
  }

  cfg.required = febs.utils.isNull(cfg.required) ? true : cfg.required;
  
  return (target: Object, propertyKey: string | symbol, parameterIndex: number):void => {
    let existingParameters: _PathVariableMetadataType[] = Reflect.getOwnMetadata(_PathVariableMetadataKey, target, propertyKey) || [];
    existingParameters.push({
      name: cfg.name,
      required: cfg.required,
      parameterIndex
    });
    Reflect.defineMetadata(_PathVariableMetadataKey, existingParameters, target, propertyKey);
  }
}

export function _PathVariableDo(target: Object, propertyKey: string | symbol, args:IArguments, pathVariables:{ [key: string]: string }): boolean {
  let parameters: _PathVariableMetadataType[] = Reflect.getOwnMetadata(_PathVariableMetadataKey, target, propertyKey);
  if (parameters) {
    for (let parameter of parameters) {
      if (parameter.required) {
        if (parameter.parameterIndex >= args.length || febs.utils.isNull(args[parameter.parameterIndex])) {
          throw new Error("@PathVariable Missing required argument.");
        }
      }

      if (!pathVariables.hasOwnProperty(parameter.name)) {
        throw new febs.exception(
          `@PathVariable parameter '${parameter.name}' cannot be finded`,
          febs.exception.ERROR,
          __filename,
          __line,
          __column
        );
      }

      pathVariables[parameter.name] = args[parameter.parameterIndex];
    } // for.
  } // if.

  return true;
}