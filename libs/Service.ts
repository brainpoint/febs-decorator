'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-22 18:15
 * Desc:
 */

import 'reflect-metadata'
import * as febs from 'febs-browser';

const FinishDelay = Symbol('FinishDelay');

const ServiceWaitAutowiredInstance = Symbol('ServiceWaitAutowiredInstance')
const BeanWaitAutowiredInstance = Symbol('BeanWaitAutowiredInstance')
const ServiceInstance = Symbol('ServiceInstance')
const AutowiredInstances = Symbol('AutowiredInstances')

function getGlobalWaitAutowiredServices(): {key: any, target: Object, singleton: boolean,}[] {
  let instances = (global as any)[ServiceWaitAutowiredInstance];
  if (!instances) {
    instances = [];
    (global as any)[ServiceWaitAutowiredInstance] = instances;
  }
  return instances;
}
function getGlobalWaitAutowiredBeans(): { key: any, callback: () => Promise<any>, singleton: boolean, }[] {
  let instances = (global as any)[BeanWaitAutowiredInstance];
  if (!instances) {
    instances = [];
    (global as any)[BeanWaitAutowiredInstance] = instances;
  }
  return instances;
}

function getGlobalServices(): any {
  let instances = (global as any)[ServiceInstance];
  if (!instances) {
    instances = {};
    (global as any)[ServiceInstance] = instances;
  }
  return instances;
}

/**
 * 加载所有的bean, 并进行实例化等操作.
 */
export async function setupBeans(): Promise<void> {
  if ((global as any)[FinishDelay]) {
    return;
  }

  let instances = getGlobalServices();

  let waitServices = getGlobalWaitAutowiredServices();
  for (let i = 0; i < waitServices.length; i++) {
    let { key, target, singleton } = waitServices[i];
    
    if (singleton) {
      let instance = new (target as any)();
      instances[key] = {singleton, instance};
      await finishAutowired(key);
    }
    else {
      let callback = async (): Promise<any> => {
        return new (target as any)();
      }
      instances[key] = {
        singleton, callback
      };
      await finishAutowired(key);
    }
  }
  waitServices.length = 0;

  let waitBeans = getGlobalWaitAutowiredBeans();
  for (let i = 0; i < waitBeans.length; i++) {
    let { key, callback, singleton } = waitBeans[i];

    if (singleton) {
      let res = await callback();
      instances[key] = { singleton, instance: res };
      await finishAutowired(key);
    }
    else {
      instances[key] = {
        singleton, callback
      };
      await finishAutowired(key);
    }
  }
  waitBeans.length = 0;

  (global as any)[FinishDelay] = true;
}

export function getGlobalWaitAutowireds():{
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
type ServiceInstanceType = { singleton: boolean, instance: any, callback: () => Promise<any> };
export function getServiceInstances(key: any): ServiceInstanceType {
  let instances = getGlobalServices();
  return instances[key];
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

    let key = febs.string.isEmpty(name) ? target : name;

    if ((target as any).__isServiced) {
      throw new Error(`@Bean '${key}': It's already declared`)
    }
    (target as any).__isServiced = true;

    let instances = getGlobalServices();
    if (instances.hasOwnProperty(key)) {
      throw new Error(`@Bean '${key}': It's already declared`)
    }
    instances[key] = null;

    if ((global as any)[FinishDelay]) {
      if (singleton) {
        let instance = new (target as any)();
        instances[key] = { singleton, instance };
        finishAutowired(key);
      }
      else {
        let callback = async (): Promise<any> => {
          return new (target as any)();
        }
        instances[key] = {
          singleton, callback
        };
        finishAutowired(key);
      }
    }
    else {
      let waitInstances = getGlobalWaitAutowiredServices();
      waitInstances.push({
        key,
        target,
        singleton,
      });
    } // if..else.
  }
}


export function ImmediatelyService(name: string): ClassDecorator;
export function ImmediatelyService(cfg?: { singleton?: boolean, name?: string }): ClassDecorator;
export function ImmediatelyService(...args: any[]): ClassDecorator {
  
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
    let key = febs.string.isEmpty(name) ? target : name;

    if ((target as any).__isServiced) {
      throw new Error(`@Bean '${key}': It's already declared`)
    }
    (target as any).__isServiced = true;

    let instances = getGlobalServices();
    if (instances.hasOwnProperty(key)) {
      throw new Error(`@Bean '${key}': It's already declared`)
    }
    instances[key] = null;

    if (singleton) {
      let instance = new (target as any)();
      instances[key] = {singleton, instance};
      finishAutowired(key);
    }
    else {
      let callback = async (): Promise<any> => {
        return new (target as any)();
      }
      instances[key] = {
        singleton, callback
      };
      finishAutowired(key);
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
    
    let key = febs.string.isEmpty(name) ? propertyKey : name;

    let instances = getGlobalServices();
    if (instances.hasOwnProperty(key)) {
      throw new Error(`@Bean '${key}': It's already declared`)
    }
    instances[key] = null;

    let callback = async (): Promise<any> => {
      let f = descriptor.value.apply(target)
      if (f instanceof Promise) {
        return await f;
      } else {
        return f;
      }
    }

    if ((global as any)[FinishDelay]) {
      if (singleton) {
        callback().then(res => {
          instances[key] = { singleton, instance: res };
          finishAutowired(key);
        });
      }
      else {
        instances[key] = {
          singleton, callback
        };
        finishAutowired(key);
      }
    }
    else {
      let waitInstances = getGlobalWaitAutowiredBeans();
      waitInstances.push({
        key,
        singleton,
        callback,
      });
    } // if..else.
  }
}


/**
* @desc: 完成装配.
*/
async function finishAutowired(key: any) {
  let autos = getGlobalWaitAutowireds();
  let instance = getServiceInstances(key);
  if (!instance) {
    return;
  }

  for (let i = 0; i < autos.length; i++) {
    const element = autos[i];
    if (element && element.type === key) {
      if (instance.singleton) {
        element.target[element.propertyKey] = instance.instance;
      }
      else {
        element.target[element.propertyKey] = await instance.callback();
      }
      autos.splice(i, 1);
      i--;
    }
  }
}