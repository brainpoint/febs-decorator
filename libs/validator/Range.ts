'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import * as febs from 'febs-browser'
import {
  MetadataKey_Range as MetadataKey,
  MetadataKey_RangeList as MetadataKeyList,
  _validate_set_property_matedata,
  _validate_set_property_matedata_list,
} from './validatorUtils'

function validate(param: any, decoratorData: any): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }

  param = Number(param)
  if (!Number.isNaN(param)) {
    if (param > decoratorData.max || param < decoratorData.min) {
      return { r: false }
    }
    return { v: param }
  }

  return { r: false }
}

function DecoratorList(cfg: {
  listMaxLength?: number
  min?: number /*=0*/
  max: number
  message?: string
}) {
  cfg.min = Number(cfg.min) || 0
  cfg.max = Number(cfg.max) || 0
  return (target: Object, propertyKey: string | symbol) => {
    _validate_set_property_matedata_list(
      MetadataKeyList,
      target,
      propertyKey,
      validate,
      {
        listMaxLength: cfg.listMaxLength,
        min: cfg.min,
        max: cfg.max,
        message: cfg.message,
      }
    )
  }
}

/**
 * 验证是否是数组.
 */
Range.List = DecoratorList

/**
 * @desc 指定参数值必须在 [min, max] 范围内;
 * @returns {PropertyDecorator}
 */
export function Range(cfg: {
  min?: number /*=0*/
  max: number
  message?: string
}) {
  cfg.min = Number(cfg.min) || 0
  cfg.max = Number(cfg.max) || 0
  return (target: Object, propertyKey: string | symbol) => {
    _validate_set_property_matedata(
      MetadataKey,
      target,
      propertyKey,
      validate,
      {
        min: cfg.min,
        max: cfg.max,
        message: cfg.message,
      }
    )
  }
}
