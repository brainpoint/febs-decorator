'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import {
  verifyPropertyList,
  doPropertyDecorator,
  getPropertyDecorator,

} from './validatorUtils'

function verify(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  if (propertyValue === undefined || propertyValue === null) {
    return { isValid: false }
  }
  return { propertyValue: propertyValue }
}


function verify_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, verify);
}




function DecoratorList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function DecoratorList(target: Object, propertyKey: string | symbol): void
function DecoratorList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(verify_list, cfg);
  } else {
    doPropertyDecorator(
      
      args[0],
      args[1],
      verify_list,
      {}
    )
  }
}

/**
 * 验证是否是数组.
 */
NotNull.List = DecoratorList

/**
* @desc: 指定参数不能为 null 或 undefined.
*/
export function NotNull(cfg?: {
  message?: string
}): PropertyDecorator
export function NotNull(target: Object, propertyKey: string | symbol): void
export function NotNull(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(verify, cfg);
  } else {
    doPropertyDecorator( args[0], args[1], verify, {})
  }
}
