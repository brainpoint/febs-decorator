'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._FeignClientDo = exports.FeignClient = exports.setFeignClientDefaultCfg = exports._FeignClientMetadataKey = void 0;
/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-22 18:15
 * Desc:
 */
require("reflect-metadata");
const path = require("path");
const febs = require("febs-browser");
const qs_1 = require("qs");
const DefaultFeignClientCfg = Symbol('DefaultFeignClientCfg');
exports._FeignClientMetadataKey = Symbol('_FeignClientMetadataKey');
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
function setFeignClientDefaultCfg(cfg) {
    let c = global[DefaultFeignClientCfg];
    if (!c) {
        c = {};
        global[DefaultFeignClientCfg] = c;
    }
    c = c || {};
    if (cfg.hasOwnProperty('fetchObj')) {
        c.fetchObj = cfg.fetchObj;
    }
    if (cfg.hasOwnProperty('maxAutoRetriesNextServer')) {
        c.maxAutoRetriesNextServer = cfg.maxAutoRetriesNextServer;
    }
    if (cfg.hasOwnProperty('maxAutoRetries')) {
        c.maxAutoRetries = cfg.maxAutoRetries;
    }
    if (cfg.hasOwnProperty('findServiceCallback')) {
        c.findServiceCallback = cfg.findServiceCallback;
    }
    if (cfg.hasOwnProperty('filterMessageCallback')) {
        c.filterMessageCallback = cfg.filterMessageCallback;
    }
}
exports.setFeignClientDefaultCfg = setFeignClientDefaultCfg;
function getFeignClientDefaultCfg() {
    let cfg = global[DefaultFeignClientCfg];
    cfg = cfg || {};
    cfg.fetchObj = cfg.fetchObj || febs.net.fetch;
    cfg.maxAutoRetriesNextServer = cfg.maxAutoRetriesNextServer || 3;
    cfg.maxAutoRetries = cfg.maxAutoRetries || 2;
    return cfg;
}
/**
 * @desc 表明指定的类为feignClient类.
 *
 *      仅支持service返回格式为 application/json或application/x-www-form-urlencoded.
 *
 * @returns {ClassDecorator}
 */
function FeignClient(cfg) {
    if (febs.string.isEmpty(cfg.name)) {
        throw new febs.exception("@FeignClient need 'name' parameter", febs.exception.ERROR, __filename, __line, __column);
    }
    cfg.path = cfg.path || '';
    return (target) => {
        Reflect.defineMetadata(exports._FeignClientMetadataKey, {
            name: cfg.name,
            url: cfg.url,
            path: cfg.path,
        }, target);
    };
}
exports.FeignClient = FeignClient;
function _FeignClientDo(target, requestMapping, responseBody, args, fallback) {
    return __awaiter(this, void 0, void 0, function* () {
        if (requestMapping.path.length > 1) {
            throw new febs.exception("@RequestMapping in FeignClient class, 'path' must container only one url", febs.exception.ERROR, __filename, __line, __column);
        }
        let meta = Reflect.getOwnMetadata(exports._FeignClientMetadataKey, target.constructor);
        let url;
        if (!febs.string.isEmpty(meta.url)) {
            url = meta.url;
        }
        else {
            url = path.join(meta.path, requestMapping.path[0]);
        }
        let feignClientCfg = getFeignClientDefaultCfg();
        if (typeof feignClientCfg.findServiceCallback !== 'function') {
            throw new febs.exception(`feignClient 'findServiceCallback' must not be null`, febs.exception.ERROR, __filename, __line, __column);
        }
        let excludeHost = null;
        // net request.
        for (let i = 0; i < feignClientCfg.maxAutoRetriesNextServer; i++) {
            let host = yield feignClientCfg.findServiceCallback(meta.name, excludeHost);
            if (!host) {
                continue;
            }
            excludeHost = `${host.ip}:${host.port}`;
            let uri = febs.string.isEmpty(meta.url) ? path.join(excludeHost, meta.path, url) : meta.url;
            if (host.port == 443) {
                if (uri[0] == '/')
                    uri = 'https:/' + uri;
                else
                    uri = 'https://' + uri;
            }
            else {
                if (uri[0] == '/')
                    uri = 'http:/' + uri;
                else
                    uri = 'http://' + uri;
            }
            for (let j = 0; j < feignClientCfg.maxAutoRetries; j++) {
                let r;
                try {
                    let ret = yield feignClientCfg.fetchObj(uri, {
                        method: requestMapping.method.toString(),
                        mode: requestMapping.mode,
                        headers: requestMapping.headers,
                        timeout: requestMapping.timeout,
                        credentials: requestMapping.credentials,
                        body: requestMapping.body,
                    });
                    // ok.
                    let contentType = ret.headers.get('content-type');
                    if (contentType) {
                        if (Array.isArray(contentType)) {
                            contentType = contentType[0];
                        }
                        contentType = contentType.toLowerCase();
                        if (contentType.indexOf('application/json') >= 0) {
                            r = yield ret.json();
                        }
                        else {
                            let txt = yield ret.text();
                            r = qs_1.default.parse(txt);
                        }
                    }
                }
                catch (e) {
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
                    }
                    else {
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
                }
                catch (e) {
                    if (responseBody) {
                        if (args.length <= responseBody.parameterIndex) {
                            args.length = args.length + 1;
                        }
                        args[responseBody.parameterIndex] = { sourceMessage: r, error: e };
                    }
                    return yield fallback();
                }
            } // for.
        } // for.
        return yield fallback();
    });
}
exports._FeignClientDo = _FeignClientDo;
//# sourceMappingURL=FeignClient.js.map