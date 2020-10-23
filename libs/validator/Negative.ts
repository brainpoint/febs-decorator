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
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }
  if (!febs.utils.bigint_check(propertyValue)) {
    return { isValid: false }
  }

  if (febs.utils.bigint_more_than_e(propertyValue, 0)) {
    return { isValid: false }
  }

  if (typeof propertyValue === 'string') {
    if (propertyValue.length > 15) {
      return { propertyValue: febs.utils.bigint(propertyValue) }
    } else {
      return { propertyValue: Number(propertyValue) }
    }
  } else {
    return { propertyValue: propertyValue }
  }
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
Negative.List = DecoratorList

/**
 * @desc 指定参数值必须是负数
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
export function Negative(cfg?: {
  message?: string
}): PropertyDecorator
export function Negative(target: Object, propertyKey: string | symbol): void
export function Negative(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(verify, cfg);
  } else {
    doPropertyDecorator( args[0], args[1], verify, {})
  }
}
