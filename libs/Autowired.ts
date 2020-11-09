'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-22 18:15
 * Desc:
 */

import 'reflect-metadata'

import { AutowiredInstances, getServiceInstances } from './Service';

/**
 * @desc 表明指定的属性可以自动装载指定的Service实例.
 * 
 * @returns {PropertyDecorator}
 */

export function Autowired(type: Function): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {

    let ins = getServiceInstances(type);
    if (ins && ins.length > 0) {
      (target as any)[propertyKey] = ins[0];
    }
    else {
      (global as any)[AutowiredInstances] = (global as any)[AutowiredInstances] || [];
      (global as any)[AutowiredInstances].push({
        target,
        propertyKey,
        type
      });
    }
  }
}