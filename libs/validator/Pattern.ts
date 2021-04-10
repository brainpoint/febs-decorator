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
  if (febs.string.isEmpty(propertyValue)) {
    return { isValid: false }
  }

  if (!decoratorData.regexp.test(propertyValue)) {
    return { isValid: false }
  }

  return { propertyValue: propertyValue }
}


function verify_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, verify);
}



function DecoratorList(cfg: {
  listMaxLength?: number
  regexp: RegExp
  message?: string
}) {
  if (!cfg.regexp || typeof cfg.regexp.test !== 'function') {
    throw new febs.exception(
      'verify @Pattern regexp error',
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
Pattern.List = DecoratorList

/**
 * @desc 指定参数必须是email或指定的正则表达式.
 * @returns {PropertyDecorator}
 */
export function Pattern(cfg: { regexp: RegExp; message?: string }) {
  if (!cfg.regexp || typeof cfg.regexp.test !== 'function') {
    throw new febs.exception(
      'verify @Pattern regexp error',
      febs.exception.PARAM,
      __filename,
      __line,
      __column
    )
  }

  return getPropertyDecorator(verify, cfg);
}
