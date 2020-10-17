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
  if (!febs.utils.bigint_check(propertyValue)) {
    return { isValid: false }
  }

  if (febs.utils.bigint_less_than(decoratorData.value, propertyValue)) {
    return { isValid: false }
  }

  if (typeof propertyValue === 'string') {
    if (propertyValue.length > 15) {
      return { propertyValue: febs.utils.bigint(propertyValue) }
    } else {
      return { propertyValue: Number(propertyValue) }
    }
  } else {
    return { propertyValue: propertyValue }
  }
}

function verify_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, verify);
}



function DecoratorList(cfg: {
  listMaxLength?: number
  value: number | febs.BigNumber | string
  message?: string
}) {
  cfg.value = cfg.value || 0;
  return getPropertyDecorator(verify_list, cfg);
}

/**
 * 验证是否是数组.
 */
DecimalMax.List = DecoratorList

/**
 * @desc 指定参数值必须小于等于指定的值.
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
export function DecimalMax(cfg: {
  value: number | febs.BigNumber | string
  message?: string
}) {
  cfg.value = cfg.value || 0;
  return getPropertyDecorator(verify, cfg);
}
