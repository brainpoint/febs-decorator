'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import * as febs from 'febs-browser'
import {
  verifyPropertyList,
  doPropertyDecorator,
  getPropertyDecorator,

} from './validatorUtils'

function verify(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  if (febs.string.isEmpty(propertyValue) || febs.string.trim(propertyValue).length <= 0) {
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
NotBlank.List = DecoratorList

/**
* @desc: 指定参数必须至少包含一个非空字符串; trim操作后长度>0
*/
export function NotBlank(cfg?: {
  message?: string
}): PropertyDecorator
export function NotBlank(target: Object, propertyKey: string | symbol): void
export function NotBlank(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(verify, cfg);
  } else {
    doPropertyDecorator( args[0], args[1], verify, {})
  }
}
