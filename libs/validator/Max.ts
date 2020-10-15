'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import * as febs from 'febs-browser'
import {
  MetadataKey_Max as MetadataKey,
  MetadataKey_MaxList as MetadataKeyList,
  _validate_set_property_matedata,
  _validate_set_property_matedata_list,
} from './validatorUtils'

function validate(param: any, decoratorData: any): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (!febs.utils.bigint_check(param)) {
    return { r: false }
  }

  if (febs.utils.bigint_less_than(decoratorData.value, param)) {
    return { r: false }
  }

  if (typeof param === 'string') {
    if (param.length > 15) {
      return { v: febs.utils.bigint(param) }
    } else {
      return { v: Number(param) }
    }
  } else {
    return { v: param }
  }
}

function DecoratorList(cfg: {
  listMaxLength?: number
  value: number | febs.BigNumber | string
  message?: string
}) {
  return (target: Object, propertyKey: string | symbol) => {
    _validate_set_property_matedata_list(
      MetadataKeyList,
      target,
      propertyKey,
      validate,
      {
        listMaxLength: cfg.listMaxLength,
        value: cfg.value || 0,
        message: cfg.message,
      }
    )
  }
}

/**
 * 验证是否是数组.
 */
Max.List = DecoratorList

/**
 * @desc 指定参数值必须小于等于指定的值.
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
export function Max(cfg: {
  value: number | febs.BigNumber | string
  message?: string
}) {
  return (target: Object, propertyKey: string | symbol) => {
    _validate_set_property_matedata(
      MetadataKey,
      target,
      propertyKey,
      validate,
      { value: cfg.value || 0, message: cfg.message }
    )
  }
}
