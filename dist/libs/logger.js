'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFeignClient = exports.logRest = exports.logError = exports.setRestLoggerLevel = exports.setFeignLoggerLevel = exports.setLogger = exports.RestLogLevel = exports.LOG_TAG = void 0;
const febs = require("febs-browser");
const FEBS_DECORATOR_LOGGER_INSTANCE = Symbol('FEBS_DECORATOR_LOGGER_INSTANCE');
const FEBS_DECORATOR_LOG_LEVEL = Symbol('FEBS_DECORATOR_LOG_LEVEL');
const FEBS_DECORATOR_LOG_LEVEL_FEIGN = Symbol('FEBS_DECORATOR_LOG_LEVEL_FEIGN');
exports.LOG_TAG = '[febs-decorator] ';
var RestLogLevel;
(function (RestLogLevel) {
    RestLogLevel["NONE"] = "NONE";
    RestLogLevel["BASIC"] = "BASIC";
    RestLogLevel["HEADERS"] = "HEADERS";
    RestLogLevel["FULL"] = "FULL";
})(RestLogLevel = exports.RestLogLevel || (exports.RestLogLevel = {}));
const DefaultLogger = {
    info(...msg) {
        console.log(...msg);
    },
};
function setLogger(logger) {
    global[FEBS_DECORATOR_LOGGER_INSTANCE] = logger;
}
exports.setLogger = setLogger;
function setFeignLoggerLevel(level) {
    global[FEBS_DECORATOR_LOG_LEVEL_FEIGN] = (level || RestLogLevel.BASIC).toUpperCase();
}
exports.setFeignLoggerLevel = setFeignLoggerLevel;
function setRestLoggerLevel(level) {
    global[FEBS_DECORATOR_LOG_LEVEL] = (level || RestLogLevel.BASIC).toUpperCase();
}
exports.setRestLoggerLevel = setRestLoggerLevel;
function getErrorMessage(e) {
    if (e instanceof Error) {
        e = `${e.message}\n${e.stack}`;
    }
    else if (typeof e === 'object') {
        try {
            e = JSON.stringify(e);
        }
        catch (err) {
            e = 'LOG catch in JSON.stringify';
        }
    }
    else {
        e = (e ? e.toString() : '');
    }
    return e;
}
function logError(e) {
    const logger = global[FEBS_DECORATOR_LOGGER_INSTANCE] || DefaultLogger;
    logger.info('[Error] ' + getErrorMessage(e));
}
exports.logError = logError;
function logRest(request, response, interval) {
    const logger = global[FEBS_DECORATOR_LOGGER_INSTANCE] || DefaultLogger;
    const logLevel = global[FEBS_DECORATOR_LOG_LEVEL] || RestLogLevel.BASIC;
    if (logLevel == RestLogLevel.NONE) {
        return;
    }
    else if (logLevel == RestLogLevel.BASIC) {
        logger.info(logBasic('[RestController]', request.ip, request, response, interval, null));
    }
    else if (logLevel == RestLogLevel.HEADERS) {
        logger.info(logHeaders('[RestController]', request.ip, request, response, interval, null));
    }
    if (logLevel == RestLogLevel.FULL) {
        if (response && response.body) {
            response = febs.utils.mergeMap(response, { body: getErrorMessage(response.body) });
        }
        logger.info(logFull('[RestController]', request.ip, request, response, interval));
    }
}
exports.logRest = logRest;
function logFeignClient(request, response, interval) {
    const logger = global[FEBS_DECORATOR_LOGGER_INSTANCE] || DefaultLogger;
    const logLevel = global[FEBS_DECORATOR_LOG_LEVEL_FEIGN] || RestLogLevel.BASIC;
    if (logLevel == RestLogLevel.NONE) {
        return;
    }
    else if (logLevel == RestLogLevel.BASIC) {
        logger.info(logBasic('[FeignClient]', '0.0.0.0', request, response, interval, null));
    }
    else if (logLevel == RestLogLevel.HEADERS) {
        logger.info(logHeaders('[FeignClient]', '0.0.0.0', request, response, interval, null));
    }
    else if (logLevel == RestLogLevel.FULL) {
        logger.info(logFull('[FeignClient]', '0.0.0.0', request, response, interval));
    }
}
exports.logFeignClient = logFeignClient;
function logBasic(prefix, ip, request, response, interval, cb) {
    let msg = prefix + '\n' + `[${ip}] ---> ${request.method} ${request.url} HTTP/1.1\n`;
    if (cb) {
        msg = cb(msg);
    }
    if (!response.err) {
        msg += `[${ip}] <--- HTTP/1.1 ${response.status} (${interval}ms)`;
    }
    else {
        msg += getErrorMessage(response.err);
    }
    return msg;
}
function logHeaders(prefix, ip, request, response, interval, cb) {
    let msg = logBasic(prefix, ip, request, response, interval, (msg1) => {
        if (request.headers) {
            for (const key in request.headers) {
                let val = request.headers[key];
                if (!Array.isArray(val))
                    val = [val];
                for (let i = 0; i < val.length; i++) {
                    msg1 += ` ${key}: ${val[i]}\n`;
                }
            }
        }
        msg1 += `[${ip}] ---> END HTTP\n`;
        return msg1;
    });
    if (response.err) {
        return msg;
    }
    if (response.headers) {
        for (const key in response.headers) {
            let val = response.headers[key];
            if (!Array.isArray(val))
                val = [val];
            for (let i = 0; i < val.length; i++) {
                msg += (` ${key}: ${val[i]}\n`);
            }
        }
    }
    if (cb) {
        msg = cb(msg);
    }
    msg += `[${ip}] <--- END HTTP\n`;
    return msg;
}
function logFull(prefix, ip, request, response, interval) {
    return logHeaders(prefix, ip, request, response, interval, (msg) => {
        if (response.err) {
            return msg;
        }
        msg += (`[content]\n`);
        if (response.body) {
            if (typeof response.body === 'object') {
                msg += (` blob...\n`);
            }
            else {
                msg += (response.body) + '\n';
            }
        }
        return msg;
    });
}
//# sourceMappingURL=logger.js.map