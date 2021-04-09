'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-22 18:15
 * Desc:
 */

import 'reflect-metadata'

import { getGlobalAutowireds, getServiceInstances } from './Service';

/**
 * @desc 表明指定的属性可以自动装载指定的Service实例.
 * 
 * @example
 *  ﹫Autowired(ClassA)
 *  obj: ClassA;  // will to auto create object.
 * 
 * @returns {PropertyDecorator}
 */

export function Autowired(type: Function|string): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {

    let ins = getServiceInstances(type);
    if (ins && ins.length > 0) {
      (target as any)[propertyKey] = ins[0];
    }
    else {
      getGlobalAutowireds().push({
        target,
        propertyKey,
        type
      });
    }
  }
}