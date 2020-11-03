'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-22 18:15
 * Desc:
 */

import 'reflect-metadata'

const ServiceInstance = Symbol('ServiceInstance')

/**
* @desc 获得指定类型的service.
*/
export function getServiceInstances(key: string): any[] {
  let instances = (global as any)[ServiceInstance];
  if (!instances) {
    instances = {};
    (global as any)[ServiceInstance] = instances;
  }
  return instances[key] ? instances[key].concat() : [];
}

/**
 * @desc 表明指定的类为Service类.
 * 
 * 定义为Service的类, 在源文件被引用后, 将会自动在全局创建一个实例.
 *
 * @returns {ClassDecorator}
 */
export function Service(target: Function, key?: string, singletonKey?: boolean): void {
  key = key || '';
  let instances = (global as any)[ServiceInstance];
  if (!instances) {
    instances = {};
    (global as any)[ServiceInstance] = instances;
  }
  instances[key] = instances[key] || [];
  if (singletonKey && instances[key].length > 0) {
    throw new Error(`@Service '${key}': There can only be one instance`)
  }

  let instance = new (target as any)();
  instances[key].push(instance);
}
