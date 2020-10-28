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
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const lib_1 = require("./lib");
class MixBean {
}
__decorate([
    __1.NotNull,
    __1.NotNull.List,
    __1.Type.Integer.List,
    __metadata("design:type", Object)
], MixBean.prototype, "value_notnullList", void 0);
let bean = new MixBean();
lib_1.except_success(() => {
    bean.value_notnullList = [1, 2, 3, '123123'];
});
lib_1.except_fail(() => {
    bean.value_notnullList = [122, 1, 123.123];
}, () => {
    bean.value_notnullList = null;
}, () => {
    bean.value_notnullList = undefined;
}, () => {
    bean.value_notnullList = [12, null];
}, () => {
    bean.value_notnullList = [12, undefined];
});
//# sourceMappingURL=mix.js.map