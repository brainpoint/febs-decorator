'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import * as febs from 'febs-browser'
import {
  MetadataKey_Size as MetadataKey,
  MetadataKey_SizeList as MetadataKeyList,
  _validate_set_property_matedata,
  _validate_set_property_matedata_list,
} from './validatorUtils'

function validate(param: any, decoratorData: any): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (param === null || param === undefined) {
    return { r: false }
  }

  if (typeof param.size === 'function') {
    return param.size() >= decoratorData.min &&
      param.size() <= decoratorData.max
      ? { v: param }
      : { r: false }
  } else {
    return param.length >= decoratorData.min &&
      param.length <= decoratorData.max
      ? { v: param }
      : { r: false }
  }
}

function DecoratorList(cfg?: {
  listMaxLength?: number
  max?: number
  min?: number
  message?: string
}) {
  cfg = cfg || {}
  return (target: Object, propertyKey: string | symbol) => {
    _validate_set_property_matedata_list(
      MetadataKeyList,
      target,
      propertyKey,
      validate,
      {
        listMaxLength: cfg.listMaxLength,
        min: cfg ? cfg.min || 0 : 0,
        max: cfg ? cfg.max || Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER,
        message: cfg.message,
      }
    )
  }
}

/**
 * 验证是否是数组.
 */
Size.List = DecoratorList

/**
 * @desc 指定参数(字符串,array)的长度的最大最小值.
 * @returns {PropertyDecorator}
 */
export function Size(cfg?: { max?: number; min?: number; message?: string }) {
  cfg = cfg || {}
  return (target: Object, propertyKey: string | symbol) => {
    _validate_set_property_matedata(
      MetadataKey,
      target,
      propertyKey,
      validate,
      {
        min: cfg ? cfg.min || 0 : 0,
        max: cfg ? cfg.max || Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER,
        message: cfg.message,
      }
    )
  }
}
