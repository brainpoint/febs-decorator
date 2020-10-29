'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-22 18:15
 * Desc:
 */

import 'reflect-metadata'
import * as path from 'path'
import * as febs from 'febs-browser'
import { RestRequest, RestResponse } from '@/types/rest_request';
var qs = require('../utils/qs/dist')

const DefaultRestControllerCfg = Symbol('DefaultRestControllerCfg')
const RestControllerRouters = Symbol('RestControllerRouters')

const _RestControllerRouterMetadataKey = Symbol('_RestControllerRouterMetadataKey')
export const _RestControllerMetadataKey = Symbol('_RestControllerMetadataKey')

type _RestControllerRouterType = {
  target: any,
  functionPropertyKey: string | symbol,
  params: {
    name?: string;
    required?: boolean;
    parameterIndex?: number;
    defaultValue?: any;
    type: "pv" | "rb" | "rp" | "ro";
  }[],
  pathVars?: {[name:string]:number},
  reg?: RegExp,
  path?: string,
};

/**
* @desc 获得所有的路由.
*/
function getRestControllerRouters(): _RestControllerRouterType[] {
  let routers = (global as any)[RestControllerRouters];
  if (!routers) {
    routers = {};
    (global as any)[RestControllerRouters] = routers;
  }
  return routers;
}

/**
 * @desc: 设置默认的配置. 可用于全局response消息的处理等.
 */
export function setRestControllerDefaultCfg(cfg: {
  /** 处理controller处理方法返回的对象returnMessage, 并返回需要response到请求端的内容 */
  filterMessageCallback?: (returnMessage:any)=>any,
}) {
  let c = (global as any)[DefaultRestControllerCfg]
  if (!c) {
    c = {};
    (global as any)[DefaultRestControllerCfg] = c;
  }
  c = c || {}
  if (cfg.hasOwnProperty('filterMessageCallback')) {
    c.filterMessageCallback = cfg.filterMessageCallback
  }
}

function getRestControllerDefaultCfg(): {
  filterMessageCallback?: (returnMessage:any)=>any,
} {
  let cfg = (global as any)[DefaultRestControllerCfg]
  cfg = cfg || {}
  return cfg
}

/**
 * @desc 表明指定的类为RestController类.
 *
 * @returns {ClassDecorator}
 */
export function RestController(cfg?: {
  /** 定义RestController类中请求的统一前缀 */
  path?: string
}): ClassDecorator {
  cfg = cfg || {};
  cfg.path = cfg.path || ''

  return (target: Function): void => {

    // store routers.
    let routers: _RestControllerRouterType[] = Reflect.getOwnMetadata(_RestControllerRouterMetadataKey, target);
    if (routers) {
      let globalRouters = getRestControllerRouters();
      for (let p in routers) {
        let val = routers[p];
        let pp = path.join(cfg.path, p);
        let reg = getPathReg(pp);
        val.reg = reg.reg;
        val.pathVars = reg.pathVars;
        // delete val.path;
        globalRouters.push(val);
      }
    } // if.


    Reflect.defineMetadata(
      _RestControllerMetadataKey,
      {
      },
      target
    )
  }
}

/**
* @desc 处理请求; 
* @description 在web框架收到http请求时, 调用此接口后将会触发指定的RestController进行处理. 当匹配到一个处理后即中断后续匹配.
* @return 返回值表明是否匹配到适当的router.
*/
export async function CallRestControllerRoute(
  request: RestRequest,
  response: RestResponse,
): Promise<boolean> {
  
  let rotuers = getRestControllerRouters();
  if (!rotuers) {
    return Promise.resolve(false);
  }

  let pathname: string = request.url;
  
  // qs
  let querystring: any = null;
  let qsPos = pathname.indexOf('?');
  if (qsPos >= 0) {
    querystring = pathname.substr(qsPos + 1);
    if (!febs.string.isEmpty(querystring)) {
      querystring = qs.parse(querystring);
    }
    pathname = pathname.substr(0, qsPos);
  }

  for (let i = 0; i < rotuers.length; i++) {
    let router = rotuers[i];
    if (router.reg.test(pathname)) {

      let ret = await router.target[router.functionPropertyKey]({
        pathname: pathname,
        querystring,
        request,
        response,
        params: router.params,
        pathVars: router.pathVars,
      });

      let cfg = getRestControllerDefaultCfg();
      if (cfg.filterMessageCallback) {
        ret = cfg.filterMessageCallback(ret);
      }
      response.body = ret;
      return Promise.resolve(true);
    }
  } // for.

  return Promise.resolve(false);
}

/**
* @desc 返回值表明是否能够按照参数规则处理.
* @return 
*/
export function _RestControllerDo(
  target: Object,
  dataType: any,
  args: IArguments,
  pathname: string,
  querystring: any,
  request: RestRequest,
  response: RestResponse,
  params: {
    name?: string;
    required?: boolean;
    parameterIndex?: number;
    defaultValue?: any;
    type: "pv" | "rb" | "rp" | "ro";
  }[],
  pathVars?: {[name:string]:number},
): boolean {
  args.length = 0;
  if (params) {
    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      if (args.length <= param.parameterIndex) {
        args.length = param.parameterIndex + 1;
      }

      // pathVariable.
      if (param.type == 'pv') {
        let index = pathVars[param.name];
        if (!febs.utils.isNull(index)) {
          let data = pathname.split('/')[index];
          if (data) { decodeURIComponent(data); }
          else if (param.required) {
            return false;
          }
          args[param.parameterIndex] = data;
        }
      }
      // requestBody.
      else if (param.type == 'rb') {
        if (!request.body) {
          if (param.required) {
            return false;
          }
          args[param.parameterIndex] = null;
        }
        else if (!dataType) {
          args[param.parameterIndex] = request.body;
        }
        else {
          let data = new dataType();
          for (const key in request.body) {
            data[key] = request.body[key];
          }
          args[param.parameterIndex] = data;
        } 
      }
      // requestParam.
      else if (param.type == 'rp') {
        if (!querystring || !querystring[param.name]) {
          if (param.required && !param.defaultValue) {
            return false;
          }
          args[param.parameterIndex] = param.defaultValue;
        }
        else {
          args[param.parameterIndex] = querystring[param.name];
        } 
      }
      // restObject.
      else if (param.type == 'ro') {
        args[param.parameterIndex] = {
          request,
          response,
          responseMsg: null,
          error: null,
        };
      }
    } // for.
  } // if.

  return true;
}

/**
 * 获得path的正则表达式.
 * @param path 
 */
function getPathReg(p: string): { reg: RegExp, pathVars: {[name:string]:number} } {
  // reg.
  p = febs.string.replace(p, '\\', '\\\\');
  p = febs.string.replace(p, '[', '\\[');
  p = febs.string.replace(p, ']', '\\]');
  p = febs.string.replace(p, '(', '\\(');
  p = febs.string.replace(p, ')', '\\)');
  p = febs.string.replace(p, '{', '\\{');
  p = febs.string.replace(p, '}', '\\}');
  p = febs.string.replace(p, '|', '\\|');
  p = febs.string.replace(p, '^', '\\^');
  p = febs.string.replace(p, '?', '\\?');
  p = febs.string.replace(p, '.', '\\.');
  p = febs.string.replace(p, '+', '\\+');
  p = febs.string.replace(p, '*', '\\*');
  p = febs.string.replace(p, '$', '\\$');
  p = febs.string.replace(p, ':', '\\:');
  // p = febs.string.replace(p, '/', '\\/');
  p = febs.string.replace(p, '-', '\\-');

  // get {} vars.
  let pathVars: {[name:string]:number} = {};
  let segs = p.split('/');
  p = '';
  for (let i = 0; i < segs.length; i++) {
    if (/^\\\{[a-zA-Z\$_][a-zA-Z\d_]*\\\}$/.test(segs[i])) {
      p += '\\/[^/]+';
      pathVars[segs[i]] = i;
    }
    else {
      p += '\\/' + segs[i];
    }
  }

  return { reg: new RegExp(p), pathVars };
}


/**
 * @desc 将router信息存储到target.
 */
export function _RestControllerPushRouter(targetObject: Object, target: Function, cfg: {
  path: string | string[],
  functionPropertyKey: string | symbol,
  params: {
    name?: string;
    required?: boolean;
    parameterIndex?: number;
    defaultValue?: any;
    type: "pv" | "rb" | "rp" | "ro";
  }[]
}): void {

  let routers: _RestControllerRouterType[] = Reflect.getOwnMetadata(_RestControllerRouterMetadataKey, target) || [];
  if (Array.isArray(cfg.path)) {
    for (let i = 0; i < cfg.path.length; i++) {
      routers.push({
        target: targetObject,
        functionPropertyKey: cfg.functionPropertyKey,
        params: cfg.params,
        path: cfg.path[i],
      })
    }
  }
  else {
    routers.push({
      target: targetObject,
      functionPropertyKey: cfg.functionPropertyKey,
      params: cfg.params,
      path: cfg.path,
    });
  }

  Reflect.defineMetadata(
    _RestControllerRouterMetadataKey,
    routers,
    target
  )
}