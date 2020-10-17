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

  propertyValue = Number(propertyValue)
  if (!Number.isNaN(propertyValue)) {
    if (propertyValue > decoratorData.max || propertyValue < decoratorData.min) {
      return { isValid: false }
    }
    return { propertyValue: propertyValue }
  }

  return { isValid: false }
}


function verify_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, verify);
}



function DecoratorList(cfg: {
  listMaxLength?: number
  min?: number /*=0*/
  max: number
  message?: string
}) {
  cfg.min = Number(cfg.min) || 0
  cfg.max = Number(cfg.max) || 0
  return getPropertyDecorator(verify_list, cfg);
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
  return getPropertyDecorator(verify, cfg);
}
