'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import * as febs from 'febs-browser'
import {
  getPropertyDecorator,
  verifyPropertyList,
  doPropertyDecorator,
} from './validatorUtils'

function verify(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }
  if (propertyValue !== false && propertyValue !== 'false' && propertyValue !== 0) {
    return { isValid: false }
  }

  return { propertyValue: false }
}

function verify_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, verify);
}

/**
 * 验证是否是数组.
 */
AssertFalse.List = DecoratorList

function DecoratorList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function DecoratorList(target: Object, propertyKey: string | symbol): void
function DecoratorList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    return getPropertyDecorator(verify_list, args);
  } else {
    doPropertyDecorator(args[0], args[1], verify_list, {})
  }
}

/**
 * 判断值是否为false或'false'
 *
 * 验证后属性值将转换为boolean
 *
 * @param cfg
 */
export function AssertFalse(cfg?: {
  message?: string
}): PropertyDecorator
export function AssertFalse(target: Object, propertyKey: string | symbol): void
export function AssertFalse(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    return getPropertyDecorator(verify, args[0]);
  } else {
    doPropertyDecorator(args[0], args[1], verify, {})
  }
}
