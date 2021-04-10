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

  for (let i = 0; i < decoratorData.allows.length; i++) {
    if (propertyValue === decoratorData.allows[i]) {
      return { propertyValue: propertyValue };
    }
  }

  return { isValid: false };
}


function verify_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, verify);
}



function DecoratorList(cfg: {
  listMaxLength?: number,
  allows: any[],
  message?: string
}) {
  if (!Array.isArray(cfg.allows)) {
    throw new febs.exception(
      'verify @Enum allows error',
      febs.exception.PARAM,
      __filename,
      __line,
      __column
    )
  }
  return getPropertyDecorator(verify_list, cfg);
}

/**
 * 验证是否是数组.
 */
Enum.List = DecoratorList

/**
 * @desc 验证参数是否配置允许的值之一.
 * @returns {PropertyDecorator}
 */
export function Enum(cfg: { allows: any[]; message?: string }) {
  if (!Array.isArray(cfg.allows)) {
    throw new febs.exception(
      'verify @Enum allows error',
      febs.exception.PARAM,
      __filename,
      __line,
      __column
    )
  }
  return getPropertyDecorator(verify, cfg);
}
