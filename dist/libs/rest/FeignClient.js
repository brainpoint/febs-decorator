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
exports._FeignClientDo = exports.FeignClient = exports.getFeignClientDefaultCfg = exports.setFeignClientDefaultCfg = exports._FeignClientMetadataKey = void 0;
require("reflect-metadata");
const febs = require("febs-browser");
const logger_1 = require("../logger");
const urlUtils_1 = require("../utils/urlUtils");
const objectUtils_1 = require("../utils/objectUtils");
var qs = require('../utils/qs/dist');
const DefaultFeignClientCfg = Symbol('DefaultFeignClientCfg');
exports._FeignClientMetadataKey = Symbol('_FeignClientMetadataKey');
function setFeignClientDefaultCfg(cfg) {
    if (cfg.hasOwnProperty('logLevel')) {
        logger_1.setFeignLoggerLevel(cfg.logLevel);
    }
    let c = global[DefaultFeignClientCfg];
    if (!c) {
        c = {};
        global[DefaultFeignClientCfg] = c;
    }
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
    if (cfg.hasOwnProperty('mode')) {
        c.mode = cfg.mode;
    }
    if (cfg.hasOwnProperty('headers')) {
        c.headers = febs.utils.mergeMap(cfg.headers);
    }
    if (cfg.hasOwnProperty('timeout')) {
        c.timeout = cfg.timeout;
    }
    if (cfg.hasOwnProperty('credentials')) {
        c.credentials = cfg.credentials;
    }
}
exports.setFeignClientDefaultCfg = setFeignClientDefaultCfg;
function getFeignClientDefaultCfg() {
    let cfg = global[DefaultFeignClientCfg];
    cfg = cfg || {};
    cfg.fetch = cfg.fetch || febs.net.fetch;
    cfg.maxAutoRetriesNextServer = cfg.maxAutoRetriesNextServer || 3;
    cfg.maxAutoRetries = cfg.maxAutoRetries || 2;
    cfg.timeout = cfg.timeout || 20000;
    return cfg;
}
exports.getFeignClientDefaultCfg = getFeignClientDefaultCfg;
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
function _FeignClientDo(target, requestMapping, restObject, castType, args, fallback) {
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
            url = urlUtils_1.default.join(meta.path, requestMapping.path[0]);
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
                lastError = e;
                logger_1.logError(e);
                continue;
            }
            excludeHost = `${host.ip}:${host.port}`;
            let uriPathname = febs.string.isEmpty(meta.url) ? urlUtils_1.default.join(meta.path, url) : meta.url;
            let uri = febs.string.isEmpty(meta.url) ? urlUtils_1.default.join(excludeHost, uriPathname) : uriPathname;
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
                headers: febs.utils.mergeMap(feignClientCfg.headers, requestMapping.headers),
                timeout: requestMapping.timeout,
                credentials: requestMapping.credentials,
                body: requestMapping.body,
                url: uri,
            };
            for (let j = 0; j < feignClientCfg.maxAutoRetries; j++) {
                let r;
                let interval = Date.now();
                try {
                    response = null;
                    responseMsg = null;
                    lastError = null;
                    let ret = yield feignClientCfg.fetch(uri, request);
                    response = ret;
                    interval = Date.now() - interval;
                    let contentType = ret.headers.get('content-type') || null;
                    if (Array.isArray(contentType)) {
                        contentType = contentType[0];
                    }
                    contentType = contentType ? contentType.toLowerCase() : contentType;
                    if (febs.string.isEmpty(contentType) || contentType.indexOf('application/x-www-form-urlencoded') >= 0) {
                        let txt = yield ret.text();
                        logger_1.logFeignClient(request, febs.utils.mergeMap(response, { body: txt }), interval);
                        r = qs.parse(txt);
                    }
                    else if (contentType.indexOf('application/json') >= 0) {
                        r = yield ret.json();
                        logger_1.logFeignClient(request, febs.utils.mergeMap(response, { body: r }), interval);
                    }
                    else {
                        r = yield ret.blob();
                        logger_1.logFeignClient(request, febs.utils.mergeMap(response, { body: r }), interval);
                    }
                    responseMsg = r;
                }
                catch (e) {
                    logger_1.logFeignClient(request, { err: e }, 0);
                    lastError = e;
                    logger_1.logError(e);
                    continue;
                }
                try {
                    if (!r) {
                        return r;
                    }
                    else if (!castType) {
                        if (feignClientCfg.filterMessageCallback) {
                            let rr = {};
                            feignClientCfg.filterMessageCallback(r, rr, meta.name, uriPathname);
                            return rr;
                        }
                        else {
                            return r;
                        }
                    }
                    else {
                        let o = new castType();
                        if (feignClientCfg.filterMessageCallback) {
                            feignClientCfg.filterMessageCallback(r, o, meta.name, uriPathname);
                            return o;
                        }
                        else {
                            let datar = objectUtils_1.default.castType(r, castType, false);
                            if (datar.e) {
                                throw datar.e;
                            }
                            o = datar.data;
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