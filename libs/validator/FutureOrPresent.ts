'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import * as febs from 'febs-browser'
import {
  MetadataKey_FutureOrPresent as MetadataKey,
  MetadataKey_FutureOrPresentList as MetadataKeyList,
  _validate_set_property_matedata,
  _validate_set_property_matedata_list,
} from './validatorUtils'

function validate(param: any, decoratorData: any): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (typeof param === 'string') {
    param = new Date(param)
  }

  if (!febs.date.isValidate(param)) {
    return { r: false }
  }

  let now: Date = new Date()
  if (
    param.getTime() + param.getTimezoneOffset() * 60 * 1000 <
    now.getTime() + now.getTimezoneOffset() * 60 * 1000
  ) {
    return { r: false }
  }

  return { v: param }
}

function DecoratorList(cfg?: {
  listMaxLength?: number
  message?: string
}): (target: Object, propertyKey: string | symbol) => void
function DecoratorList(target: Object, propertyKey: string | symbol): void
function DecoratorList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata_list(
        MetadataKeyList,
        target,
        propertyKey,
        validate,
        {
          listMaxLength: cfg.listMaxLength,
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
}): (target: Object, propertyKey: string | symbol) => void
export function FutureOrPresent(
  target: Object,
  propertyKey: string | symbol
): void
export function FutureOrPresent(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata(
        MetadataKey,
        target,
        propertyKey,
        validate,
        { message: cfg.message }
      )
    }
  } else {
    _validate_set_property_matedata(MetadataKey, args[0], args[1], validate, {})
  }
}
