'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import * as febs from 'febs-browser'
import {
  MetadataKey_Null as MetadataKey,
  MetadataKey_NullList as MetadataKeyList,
  _validate_set_property_matedata,
  _validate_set_property_matedata_list,
} from './validatorUtils'

function validate(param: any, decoratorData: any): { r?: boolean; v?: any } {
  if (param !== undefined && param !== null) {
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
Null.List = DecoratorList

export function Null(cfg?: {
  message?: string
}): (target: Object, propertyKey: string | symbol) => void
export function Null(target: Object, propertyKey: string | symbol): void
export function Null(...args: any[]) {
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
