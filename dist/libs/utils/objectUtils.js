'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getClassName,
    getParameterName,
};
function getClassName(obj) {
    if (obj && obj.constructor && obj.constructor.toString()) {
        if (obj.constructor.name) {
            return obj.constructor.name;
        }
        var str = obj.constructor.toString();
        if (str.charAt(0) == '[') {
            var arr = str.match(/\[\w+\s*(\w+)\]/);
        }
        else {
            var arr = str.match(/function\s*(\w+)/);
        }
        if (arr && arr.length == 2) {
            return arr[1];
        }
    }
    return undefined;
}
;
function getParameterName(fn) {
    try {
        if (typeof fn !== 'object' && typeof fn !== 'function')
            return;
        const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const DEFAULT_PARAMS = /=[^,)]+/mg;
        const FAT_ARROWS = /=>.*$/mg;
        let code = fn.prototype ? fn.prototype.constructor.toString() : fn.toString();
        code = code
            .replace(COMMENTS, '')
            .replace(FAT_ARROWS, '')
            .replace(DEFAULT_PARAMS, '');
        let result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g);
        return result === null ? [] : result;
    }
    catch (e) {
        return [];
    }
}
//# sourceMappingURL=objectUtils.js.map