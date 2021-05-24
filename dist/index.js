'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
if (!global.hasOwnProperty('__debugFeignClient')) {
    Object.defineProperty(global, '__debugFeignClient', {
        get: function () {
            return !!global.__debugFeignClient;
        },
        set: function (isDebug) {
            global.__debugFeignClient = isDebug;
        }
    });
}
__exportStar(require("./libs/Service"), exports);
__exportStar(require("./libs/Autowired"), exports);
__exportStar(require("./libs/validator"), exports);
__exportStar(require("./libs/rest"), exports);
exports.urlUtils = require("./libs/utils/urlUtils");
//# sourceMappingURL=index.js.map