// Type definitions for febs-decorator

/// <reference types="node" />

/**
* @desc 获得指定类型的service.
*/
export function getServiceInstances(key: any): any[];

/**
 * @desc 表明指定的类为Service类.
 * 
 * 定义为Service的类, 在源文件被引用后, 将会自动在全局创建一个实例.
 * 
 * @param singletonKey 表明此类service只能有一个实例.
 *
 * @returns {ClassDecorator}
 */
export function Service(singletonKey?: boolean): ClassDecorator;

/**
 * @desc 表明指定的属性可以自动装载指定的Service实例.
 * 
 * @returns {PropertyDecorator}
 */
export function Autowired(type: Function): PropertyDecorator;