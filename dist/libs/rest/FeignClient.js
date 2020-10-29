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
require("reflect-metadata");
const path = require("path");
const febs = require("febs-browser");
var qs = require('../utils/qs/dist');
const DefaultFeignClientCfg = Symbol('DefaultFeignClientCfg');
exports._FeignClientMetadataKey = Symbol('_FeignClientMetadataKey');
function setFeignClientDefaultCfg(cfg) {
    let c = global[DefaultFeignClientCfg];
    if (!c) {
        c = {};
        global[DefaultFeignClientCfg] = c;
    }
    c = c || {};
    if (cfg.hasOwnProperty('fetch')) {
        c.fetch = cfg.fetch;
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
    cfg.fetch = cfg.fetch || febs.net.fetch;
    cfg.maxAutoRetriesNextServer = cfg.maxAutoRetriesNextServer || 3;
    cfg.maxAutoRetries = cfg.maxAutoRetries || 2;
    return cfg;
}
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
function _FeignClientDo(target, requestMapping, restObject, dataType, args, fallback) {
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
        let request;
        let response;
        let responseMsg;
        let lastError;
        for (let i = 0; i < feignClientCfg.maxAutoRetriesNextServer; i++) {
            let host;
            try {
                host = yield feignClientCfg.findServiceCallback(meta.name, excludeHost);
                if (!host) {
                    continue;
                }
            }
            catch (e) {
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
            request = {
                method: requestMapping.method.toString(),
                mode: requestMapping.mode,
                headers: requestMapping.headers,
                timeout: requestMapping.timeout,
                credentials: requestMapping.credentials,
                body: requestMapping.body,
                url: uri,
            };
            for (let j = 0; j < feignClientCfg.maxAutoRetries; j++) {
                let r;
                try {
                    response = null;
                    responseMsg = null;
                    lastError = null;
                    let ret = yield feignClientCfg.fetch(uri, request);
                    response = ret;
                    let contentType = ret.headers.get('content-type') || null;
                    if (Array.isArray(contentType)) {
                        contentType = contentType[0];
                    }
                    contentType = contentType ? contentType.toLowerCase() : contentType;
                    if (febs.string.isEmpty(contentType) || contentType.indexOf('application/x-www-form-urlencoded') >= 0) {
                        let txt = yield ret.text();
                        r = qs.parse(txt);
                    }
                    else if (contentType.indexOf('application/json') >= 0) {
                        r = yield ret.json();
                    }
                    else {
                        r = yield ret.blob();
                    }
                    responseMsg = r;
                }
                catch (e) {
                    lastError = e;
                    console.error(e);
                    continue;
                }
                try {
                    if (!r) {
                        return r;
                    }
                    else if (!dataType) {
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
                        let o = new dataType();
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
                    if (restObject) {
                        if (args.length <= restObject.parameterIndex) {
                            args.length = args.length + 1;
                        }
                        args[restObject.parameterIndex] = {
                            request,
                            response,
                            responseMsg: responseMsg,
                            error: e,
                        };
                    }
                    return yield fallback();
                }
            }
        }
        if (restObject) {
            if (args.length <= restObject.parameterIndex) {
                args.length = args.length + 1;
            }
            args[restObject.parameterIndex] = {
                request,
                response,
                responseMsg: responseMsg,
                error: lastError,
            };
        }
        return yield fallback();
    });
}
exports._FeignClientDo = _FeignClientDo;
//# sourceMappingURL=FeignClient.js.map