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
  let ty = typeof propertyValue;
  if (ty === 'string') {
    propertyValue = new Date(propertyValue)
  }
  else if (ty === 'number') {
    propertyValue = new Date(ty);
  }

  if (!febs.date.isValidate(propertyValue)) {
    return { isValid: false }
  }

  let now: Date = decoratorData.now ? decoratorData.now : new Date()
  if (
    propertyValue.getTime() + propertyValue.getTimezoneOffset() * 60 * 1000 + 10 <=
    now.getTime() + now.getTimezoneOffset() * 60 * 1000
  ) {
    return { isValid: false }
  }

  return { propertyValue: propertyValue }
}

function verify_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  decoratorData.now = new Date();
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
FutureOrPresent.List = DecoratorList

/**
 * @desc 指定参数必须是将来或当前时间.
 *
 * 时间可以是 Date或是 形如 '2009-06-15T08:00:00.000Z' 的ISO时间字符串
 *
 * 验证后属性值将转换为Date
 *
 *
 * @returns {PropertyDecorator}
 */
export function FutureOrPresent(cfg?: {
  message?: string
}): PropertyDecorator
export function FutureOrPresent(
  target: Object,
  propertyKey: string | symbol
): void
export function FutureOrPresent(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(verify, cfg);
  } else {
    doPropertyDecorator( args[0], args[1], verify, {})
  }
}
