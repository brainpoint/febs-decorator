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
var qs = require('../utils/qs/dist')

const DefaultFeignClientCfg = Symbol('DefaultFeignClientCfg')

export const _FeignClientMetadataKey = Symbol('_FeignClientMetadataKey')
type _FeignClientMetadataType = {
  name: string
  url: string
  path: string
}

/**
 * @desc: 设置默认的请求配置. 可用于设置fetch对象, 重试信息等.
 *
 *     负载均衡策略由 findServiceCallback 提供.
 *
 * @example
 *   import * as fetch from 'node-fetch'
 *   setFeignClientDefaultCfg({
 *      fetchObj:fetch,
 *      findServiceCallback(serviceName, excludeHost):Promise<ip:string, port:number>=> {
 *        return Promise.resolve({ip, port}); 
 *      }
 *   });
 */
export function setFeignClientDefaultCfg(cfg: {
  /** 网络请求对象, 当在back-end使用时需设置; 可使用 node-fetch等兼容api */
  fetchObj?: any
  /** 最大更换实例次数; (默认3) */
  maxAutoRetriesNextServer?: number
  /** 同一实例的重试次数; (默认2) */
  maxAutoRetries?: number
  /** 获取指定service的回调. */
  findServiceCallback: (
    serviceName: string,
    excludeHost: string
  ) => Promise<{
    ip: string
    port: number
  }>,
  /** 处理收到的对象receiveMessage, 将正确的结果存储至retureMessage中 */
  filterMessageCallback?: (receiveMessage:any, retureMessage:any)=>void,
}) {
  let c = (global as any)[DefaultFeignClientCfg]
  if (!c) {
    c = {};
    (global as any)[DefaultFeignClientCfg] = c;
  }
  c = c || {}
  if (cfg.hasOwnProperty('fetchObj')) {
    c.fetchObj = cfg.fetchObj
  }
  if (cfg.hasOwnProperty('maxAutoRetriesNextServer')) {
    c.maxAutoRetriesNextServer = cfg.maxAutoRetriesNextServer;
  }
  if (cfg.hasOwnProperty('maxAutoRetries')) {
    c.maxAutoRetries = cfg.maxAutoRetries;
  }
  if (cfg.hasOwnProperty('findServiceCallback')) {
    c.findServiceCallback = cfg.findServiceCallback
  }
  if (cfg.hasOwnProperty('filterMessageCallback')) {
    c.filterMessageCallback = cfg.filterMessageCallback
  }
  
}

function getFeignClientDefaultCfg(): {
  fetchObj?: any
  maxAutoRetriesNextServer?: number
  maxAutoRetries?: number,
  findServiceCallback: (
    serviceName: string,
    excludeHost: string
  ) => Promise<{
    ip: string
    port: number
  }>,
  filterMessageCallback?: (receiveMessage:any, retureMessage:any)=>void,
} {
  let cfg = (global as any)[DefaultFeignClientCfg]
  cfg = cfg || {}
  cfg.fetchObj = cfg.fetchObj || febs.net.fetch
  cfg.maxAutoRetriesNextServer = cfg.maxAutoRetriesNextServer || 3
  cfg.maxAutoRetries = cfg.maxAutoRetries || 2
  return cfg
}

/**
 * @desc 表明指定的类为feignClient类.
 *
 *      仅支持service返回格式为 application/json或application/x-www-form-urlencoded.
 *
 * @returns {ClassDecorator}
 */
export function FeignClient(cfg: {
  /** 指定微服务的名称 */
  name: string
  /** 用于调试, 指定调用的地址, 使用此地址通信, 忽略RequestMapping中的地址. */
  url?: string
  /** 定义FeignClient类中请求的统一前缀 */
  path?: string
}): ClassDecorator {
  if (febs.string.isEmpty(cfg.name)) {
    throw new febs.exception(
      "@FeignClient need 'name' parameter",
      febs.exception.ERROR,
      __filename,
      __line,
      __column
    )
  }
  cfg.path = cfg.path || ''

  return (target: Function): void => {
    Reflect.defineMetadata(
      _FeignClientMetadataKey,
      {
        name: cfg.name,
        url: cfg.url,
        path: cfg.path,
      },
      target
    )
  }
}

export async function _FeignClientDo(
  target: Object,
  requestMapping: any,
  responseBody: { parameterIndex: number, type: any },
  args: IArguments,
  fallback: () => Promise<any>
):Promise<any> {
  if (requestMapping.path.length > 1) {
    throw new febs.exception(
      "@RequestMapping in FeignClient class, 'path' must container only one url",
      febs.exception.ERROR,
      __filename,
      __line,
      __column
    )
  }

  let meta: _FeignClientMetadataType = Reflect.getOwnMetadata(
    _FeignClientMetadataKey,
    target.constructor
  )

  let url
  if (!febs.string.isEmpty(meta.url)) {
    url = meta.url
  } else {
    url = path.join(meta.path, requestMapping.path[0])
  }

  let feignClientCfg = getFeignClientDefaultCfg();
  if (typeof feignClientCfg.findServiceCallback !== 'function') {
    throw new febs.exception(`feignClient 'findServiceCallback' must not be null`, febs.exception.ERROR, __filename, __line, __column);
  }

  let excludeHost:string = null;
  // net request.
  for (let i = 0; i < feignClientCfg.maxAutoRetriesNextServer; i++) {
    let host:{
        ip: string;
        port: number;
    } = await feignClientCfg.findServiceCallback(meta.name, excludeHost);
    if (!host) {
      continue;
    }
    
    excludeHost = `${host.ip}:${host.port}`;
    let uri = febs.string.isEmpty(meta.url) ? path.join(excludeHost, meta.path, url) : meta.url;
    if (host.port == 443) {
      if (uri[0] == '/') uri = 'https:/' + uri;
      else uri = 'https://' + uri;
    } else {
      if (uri[0] == '/') uri = 'http:/' + uri;
      else uri = 'http://' + uri;
    }
    
    for (let j = 0; j < feignClientCfg.maxAutoRetries; j++) {
      let r:any;
      try {
        let ret = await feignClientCfg.fetchObj(uri, {
          method: requestMapping.method.toString(),
          mode: requestMapping.mode,
          headers: requestMapping.headers,
          timeout: requestMapping.timeout,
          credentials: requestMapping.credentials,
          body: requestMapping.body,
        });

        // ok.
        let contentType = ret.headers.get('content-type')
        if (contentType) {
          if (Array.isArray(contentType)) { contentType = contentType[0]; }
          contentType = contentType.toLowerCase()
          if (contentType.indexOf('application/json') >= 0) {
            r = await ret.json();
          } else {
            let txt = await ret.text();
            r = qs.parse(txt)
          }
        }
      } catch (e) {
        console.error(e);
        continue;
      }

      // 返回对象.
      try {
        if (!r) {
          return r;
        }
        else if (!responseBody || !responseBody.type) {
          if (feignClientCfg.filterMessageCallback) {
            let rr = {};
            feignClientCfg.filterMessageCallback(r, rr);
            return rr;
          }
          else {
            return r;
          }
        } else {
          let o = new responseBody.type();
          if (feignClientCfg.filterMessageCallback) {
            feignClientCfg.filterMessageCallback(r, o);
            return o;
          }
          else {
            for (const key in r) {
              const element = r[key];
              o[key] = element;
            }
          }
          return o;
        }
      } catch (e) {
        if (responseBody) {
          if (args.length <= responseBody.parameterIndex) {
            args.length = args.length + 1;
          }
          args[responseBody.parameterIndex] = { sourceMessage: r, error: e };
        }
        return await fallback();
      }
    } // for.
  } // for.

  return await fallback();
}
