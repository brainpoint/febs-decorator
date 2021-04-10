'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const __1 = require("..");
const __2 = require("..");
let TestService = class TestService {
    test() { }
};
TestService = __decorate([
    __1.Service()
], TestService);
let TestController = class TestController {
    constructor() {
        console.log('constructor');
    }
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'fail';
        });
    }
};
__decorate([
    __2.RequestMapping({ path: '/api/xxx', method: __2.RequestMethod.GET }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "test", null);
TestController = __decorate([
    __2.FeignClient({ name: 'base' }),
    __metadata("design:paramtypes", [])
], TestController);
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        __2.setFeignClientDefaultCfg({
            findServiceCallback,
        });
        let bean = new TestController();
        console.log(yield bean.test());
    });
}
test().then(() => { });
function findServiceCallback(serviceName, excludeHost) {
    return Promise.resolve({
        ip: '127.0.0.1',
        port: 8080,
        serviceName
    });
}
//# sourceMappingURL=rest.js.map