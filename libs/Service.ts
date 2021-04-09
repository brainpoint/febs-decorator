'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-22 18:15
 * Desc:
 */

import 'reflect-metadata'
import * as febs from 'febs-browser';

const ServiceInstance = Symbol('ServiceInstance')
const AutowiredInstances = Symbol('AutowiredInstances')


function getGlobalServices() {
  let instances = (global as any)[ServiceInstance];
  if (!instances) {
    instances = {};
    (global as any)[ServiceInstance] = instances;
  }
  return instances;
}

export function getGlobalAutowireds():{
      target: any,
      propertyKey:string|symbol,
      type: Function|string
  }[] {
  let instances = (global as any)[AutowiredInstances] = (global as any)[AutowiredInstances] || [];
  return instances;
}

/**
* @desc 获得指定类型的service.
*/
export function getServiceInstances(key: any): any[] {
  let instances = getGlobalServices();
  return instances[key] ? instances[key].concat() : [];
}

/**
 * @desc 表明指定的类为Service类.
 * 
 * 定义为Service的类, 在源文件被引用后, 单例bean将会自动在全局创建一个实例.
 * 
 * @param cfg.singleton 是否为单例; (默认单例)
 * @param cfg.name      使用名称注入; 如不使用名称,则使用类型注入.
 *
 * @returns {ClassDecorator}
 */
export function Service(name: string): ClassDecorator;
export function Service(cfg?: { singleton?: boolean, name?: string }): ClassDecorator;
export function Service(...args: any[]): ClassDecorator {
  
  let cfg: any;
  if (args.length == 0 || typeof args[0] !== 'string') {
    cfg = args[0] || {};
  }
  else {
    cfg = { name: args[0] };
  }

  cfg.singleton = cfg.hasOwnProperty('singleton') ? cfg.singleton : true;
  
  let { singleton, name } = cfg;
  
  return (target: Function): void => {
    let instances = getGlobalServices();

    let key = febs.string.isEmpty(name) ? target : name;

    if (instances[key]) {
      throw new Error(`@Bean '${key}': It's already declared`)
    }

    instances[key] = [];
    if (singleton) {
      let instance = new (target as any)();
      instances[key].push(instance);
      finishAutowired(key, target, singleton, instance);
    }
    else {
      let callback = async (): Promise<any> => {
        return new (target as any)();
      }
      finishAutowired(key, target, singleton, callback);
    }
  }
}

/**
 * @desc 表明指定的属性为Bean.
 * 
 * <Bean修饰的方法不允许带参数, 并且返回的类型作为注入对象的类型.>
 * 定义为Bean, 在源文件被引用后, 单例bean将会自动在全局创建一个实例.
 * 
 * @param cfg.singleton 是否为单例; (默认单例)
 * @param cfg.name      使用名称注入; 如不使用名称,则使用方法名注入.

 * @example
 * 
 * ﹫Service()
 * class {
 *       ﹫Bean() 
 *       foo(): Object { 
 *           return {};
 *       }
 * 
 *       ﹫Autowired('foo')
 *       private obj: Object;
 * }
 * 
 * @returns {PropertyDecorator}
 */
export function Bean(name: string): MethodDecorator;
export function Bean(cfg?: { singleton?: boolean, name?: string }): MethodDecorator;
export function Bean(...args:any[]): MethodDecorator {

  let cfg: any;
  if (args.length == 0 || typeof args[0] !== 'string') {
    cfg = args[0] || {};
  }
  else {
    cfg = { name: args[0] };
  }

  cfg.singleton = cfg.hasOwnProperty('singleton') ? cfg.singleton : true;
  
  let { singleton, name } = cfg;
  
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    let instances = getGlobalServices();

    let key = febs.string.isEmpty(name) ? propertyKey : name;

    if (instances[key]) {
      throw new Error(`@Bean '${key}': It's already declared`)
    }

    let callback = async ():Promise<any> => {
      let f = descriptor.value.apply(target)
      if (f instanceof Promise) {
        return await f;
      } else {
        return f;
      }
    }
    
    instances[key] = [];
    if (singleton) {
      callback().then(res => {
        let instance = res;
        instances[key].push(instance);
        finishAutowired(key, target, singleton, instance).then();
      });
    }
    else {
      finishAutowired(key, target, singleton, callback).then();
    }
  }
}


/**
* @desc: 完成装配.
*/
async function finishAutowired(key: any, target: Object, singleton: boolean, instance:any) {
  let autos = getGlobalAutowireds();
  
  for (let i = 0; i < autos.length; i++) {
    const element = autos[i];
    if (element && element.type === key) {
      if (singleton) {
        element.target[element.propertyKey] = instance;
      }
      else {
        element.target[element.propertyKey] = await instance();
      }
      autos.splice(i, 1);
      i--;
    }
  }
}