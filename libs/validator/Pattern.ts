'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import * as febs from 'febs-browser'
import {
  MetadataKey_Pattern as MetadataKey,
  MetadataKey_PatternList as MetadataKeyList,
  _validate_set_property_matedata,
  _validate_set_property_matedata_list,
} from './validatorUtils'

function validate(param: any, decoratorData: any): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (febs.string.isEmpty(param)) {
    return { r: false }
  }

  if (!decoratorData.regexp.test(param)) {
    return { r: false }
  }

  return { v: param }
}

function DecoratorList(cfg: {
  listMaxLength?: number
  regexp: RegExp
  message?: string
}) {
  if (!cfg.regexp || typeof cfg.regexp.test !== 'function') {
    throw new febs.exception(
      'validate @Pattern regexp error',
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
}

/**
 * 验证是否是数组.
 */
Pattern.List = DecoratorList

/**
 * @desc 指定参数必须是email或指定的正则表达式.
 * @returns {PropertyDecorator}
 */
export function Pattern(cfg: { regexp: RegExp; message?: string }) {
  if (!cfg.regexp || typeof cfg.regexp.test !== 'function') {
    throw new febs.exception(
      'validate @Pattern regexp error',
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
}
