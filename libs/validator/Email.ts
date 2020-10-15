'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import * as febs from 'febs-browser'
import {
  MetadataKey_Email as MetadataKey,
  MetadataKey_EmailList as MetadataKeyList,
  _validate_set_property_matedata,
  _validate_set_property_matedata_list,
} from './validatorUtils'

const defaultReg = /^(([A-Za-z0-9\u4e00-\u9fa5_-]|\.)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)$/

function validate(param: any, decoratorData: any): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }

  if (!decoratorData.regexp.test(param)) {
    return { r: false }
  }

  return { v: param }
}

function DecoratorList(cfg?: {
  listMaxLength?: number
  regexp?: RegExp
  message?: string
}): (target: Object, propertyKey: string | symbol) => void
function DecoratorList(target: Object, propertyKey: string | symbol): void
function DecoratorList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    cfg = cfg || {}
    cfg.regexp = cfg.regexp || defaultReg

    if (typeof cfg.regexp.test !== 'function') {
      throw new febs.exception(
        'validate @Email regexp error',
        febs.exception.ERROR,
        __filename,
        __line,
        __column
      )
    }
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata_list(
        MetadataKeyList,
        target,
        propertyKey,
        validate,
        {
          listMaxLength: cfg.listMaxLength,
          regexp: cfg.regexp,
          message: cfg.message,
        }
      )
    }
  } else {
    _validate_set_property_matedata_list(
      MetadataKeyList,
      args[0],
      args[1],
      validate,
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
}): (target: Object, propertyKey: string | symbol) => void
export function Email(target: Object, propertyKey: string | symbol): void
export function Email(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    cfg = cfg || {}
    cfg.regexp = cfg.regexp || defaultReg

    if (typeof cfg.regexp.test !== 'function') {
      throw new febs.exception(
        'validate @Email regexp error',
        febs.exception.ERROR,
        __filename,
        __line,
        __column
      )
    }

    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata(
        MetadataKey,
        target,
        propertyKey,
        validate,
        {
          regexp: cfg.regexp,
          message: cfg.message,
        }
      )
    }
  } else {
    _validate_set_property_matedata(MetadataKey, args[0], args[1], validate, {
      regexp: defaultReg,
    })
  }
}
