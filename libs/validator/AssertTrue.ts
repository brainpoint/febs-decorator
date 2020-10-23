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
  if (propertyValue !== true && propertyValue !== 'true' && propertyValue !== 1) {
    return { isValid: false }
  }

  return { propertyValue: true }
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
    return getPropertyDecorator(verify_list, args[0]);
  } else {
    doPropertyDecorator(args[0], args[1], verify_list, {})
  }
}

/**
 * 验证是否是数组.
 */
AssertTrue.List = DecoratorList

/**
 * 判断值是否为true或'true'
 *
 * 验证后属性值将转换为boolean
 *
 * @param cfg
 */
export function AssertTrue(cfg?: {
  message?: string
}): PropertyDecorator
export function AssertTrue(target: Object, propertyKey: string | symbol): void
export function AssertTrue(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    return getPropertyDecorator(verify, args[0]);
  } else {
    doPropertyDecorator(args[0], args[1], verify, {})
  }
}
