'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-22 18:15
 * Desc:
 */

import 'reflect-metadata'

const ServiceInstance = Symbol('ServiceInstance')
export const AutowiredInstances = Symbol('AutowiredInstances')


/**
* @desc 获得指定类型的service.
*/
export function getServiceInstances(key: any): any[] {
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
export function Service(singletonKey?: boolean): ClassDecorator {

  return (target: Function): void => {
    let instances = (global as any)[ServiceInstance];
    if (!instances) {
      instances = {};
      (global as any)[ServiceInstance] = instances;
    }
    instances[target as any] = instances[target as any] || [];
    if (singletonKey && instances[target as any].length > 0) {
      throw new Error(`@Service '${target}': There can only be one instance`)
    }

    let instance = new (target as any)();
    instances[target as any].push(instance);

    finishAutowired(target);
  }
}

/**
* @desc: 完成装配.
*/
function finishAutowired(target:any) {
  (global as any)[AutowiredInstances] = (global as any)[AutowiredInstances] || [];
  let autos:{
      target: any,
      propertyKey:string,
      type: Function
  }[] = (global as any)[AutowiredInstances];
  
  for (const key in autos) {
    const element = autos[key];
    if (element && element.type === target) {
      let ins = getServiceInstances(element.type);
      element.target[element.propertyKey] = ins ? ins[ins.length - 1] : null;
      autos[key] = null;
    }
  }
}