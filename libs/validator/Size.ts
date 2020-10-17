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
  getPropertyDecorator,

} from './validatorUtils'

function verify(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }

  if (typeof propertyValue.size === 'function') {
    return propertyValue.size() >= decoratorData.min &&
      propertyValue.size() <= decoratorData.max
      ? { propertyValue: propertyValue }
      : { isValid: false }
  } else {
    return propertyValue.length >= decoratorData.min &&
      propertyValue.length <= decoratorData.max
      ? { propertyValue: propertyValue }
      : { isValid: false }
  }
}


function verify_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, verify);
}



function DecoratorList(cfg?: {
  listMaxLength?: number
  max?: number
  min?: number
  message?: string
}) {
  cfg = cfg || {}
  cfg.min = cfg.min || 0;
  cfg.max = febs.utils.isNull(cfg.max) ? Number.MAX_SAFE_INTEGER: cfg.max;

  return getPropertyDecorator(verify_list, cfg);
}

/**
 * 验证是否是数组.
 */
Size.List = DecoratorList

/**
 * @desc 指定参数(字符串,array)的长度的最大最小值 (o.size() 或 o.length) .
 * @returns {PropertyDecorator}
 */
export function Size(cfg?: { max?: number; min?: number; message?: string }) {
  cfg = cfg || {}
  cfg.min = cfg.min || 0;
  cfg.max = febs.utils.isNull(cfg.max) ? Number.MAX_SAFE_INTEGER: cfg.max;

  return getPropertyDecorator(verify, cfg);
}
