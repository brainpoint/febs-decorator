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

const defaultReg = /^(([A-Za-z0-9\u4e00-\u9fa5_-]|\.)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)$/

function verify(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }

  if (!decoratorData.regexp.test(propertyValue)) {
    return { isValid: false }
  }

  return { propertyValue: propertyValue }
}

function verify_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, verify);
}

function DecoratorList(cfg?: {
  listMaxLength?: number
  regexp?: RegExp
  message?: string
}): PropertyDecorator
function DecoratorList(target: Object, propertyKey: string | symbol): void
function DecoratorList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    cfg = cfg || {}
    cfg.regexp = cfg.regexp || defaultReg

    if (typeof cfg.regexp.test !== 'function') {
      throw new febs.exception(
        'verify @Email regexp error',
        febs.exception.PARAM,
        __filename,
        __line,
        __column
      )
    }

    return getPropertyDecorator(verify_list, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      verify_list,
      {
        regexp: defaultReg,
      }
    )
  }
}

/**
 * 验证是否是数组.
 */
Email.List = DecoratorList

/**
 * @desc 指定参数必须是email或指定的正则表达式.
 * @returns {PropertyDecorator}
 */

export function Email(cfg?: {
  regexp?: RegExp
  message?: string
}): PropertyDecorator
export function Email(target: Object, propertyKey: string | symbol): void
export function Email(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    cfg = cfg || {}
    cfg.regexp = cfg.regexp || defaultReg

    if (typeof cfg.regexp.test !== 'function') {
      throw new febs.exception(
        'verify @Email regexp error',
        febs.exception.PARAM,
        __filename,
        __line,
        __column
      )
    }

    return getPropertyDecorator(verify, cfg);
  } else {
    doPropertyDecorator(args[0], args[1], verify, {
      regexp: defaultReg,
    })
  }
}
