'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autowired = void 0;
require("reflect-metadata");
const Service_1 = require("./Service");
function Autowired(type) {
    return (target, propertyKey) => {
        let ins = Service_1.getServiceInstances(type);
        if (ins && ins.length > 0) {
            target[propertyKey] = ins[0];
        }
        else {
            global[Service_1.AutowiredInstances] = global[Service_1.AutowiredInstances] || [];
            global[Service_1.AutowiredInstances].push({
                target,
                propertyKey,
                type
            });
        }
    };
}
exports.Autowired = Autowired;
//# sourceMappingURL=Autowired.js.map