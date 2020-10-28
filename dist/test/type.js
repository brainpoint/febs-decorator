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
const tap_1 = require("tap");
const __1 = require("..");
const lib_1 = require("./lib");
var qs = require('../libs/utils/qs/dist');
class TypeBean {
}
__decorate([
    __1.Type.BigInt,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_bigInt", void 0);
__decorate([
    __1.Type.BigInt.List({ listMaxLength: 2 }),
    __metadata("design:type", Object)
], TypeBean.prototype, "value_bigIntList", void 0);
__decorate([
    __1.Type.Boolean,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_boolean", void 0);
__decorate([
    __1.Type.Boolean.List,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_booleanList", void 0);
__decorate([
    __1.Type.Integer,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_integer", void 0);
__decorate([
    __1.Type.Integer.List,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_integerList", void 0);
__decorate([
    __1.Type.Number,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_number", void 0);
__decorate([
    __1.Type.Number.List,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_numberList", void 0);
__decorate([
    __1.Type.String,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_string", void 0);
__decorate([
    __1.Type.String.List,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_stringList", void 0);
__decorate([
    __1.Type.Date,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_date", void 0);
__decorate([
    __1.Type.Date.List,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_dateList", void 0);
__decorate([
    __1.Type.Object,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_object", void 0);
__decorate([
    __1.Type.Object.List,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_objectList", void 0);
__decorate([
    __1.Type.Array({ checkCB(elem, index) {
            return typeof elem === 'string';
        } }),
    __metadata("design:type", Object)
], TypeBean.prototype, "value_arrayWithCheck", void 0);
__decorate([
    __1.Type.Array,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_array", void 0);
__decorate([
    __1.Type.Array.List,
    __metadata("design:type", Object)
], TypeBean.prototype, "value_arrayList", void 0);
let bean = new TypeBean();
lib_1.except_success(() => {
    bean.value_bigInt = 1;
    bean.value_bigInt = -1;
    bean.value_bigInt = -0;
    bean.value_bigInt = null;
    bean.value_bigInt = undefined;
}, () => {
    bean.value_bigInt = 123456789012345;
    tap_1.default.equal(bean.value_bigInt, 123456789012345);
}, () => {
    bean.value_bigInt = '123456789012345';
    tap_1.default.equal(bean.value_bigInt, '123456789012345');
});
lib_1.except_fail(() => {
    bean.value_bigInt = [1231, '23424', '121321723427834628'];
}, () => {
    bean.value_bigInt = '123ddfsgsfg';
});
lib_1.except_success(() => {
    bean.value_bigIntList = null;
    bean.value_bigIntList = undefined;
    bean.value_bigIntList = [1231, '23424'];
});
lib_1.except_fail(() => {
    bean.value_bigIntList = [1231, '23424', '121321723427834628'];
}, () => {
    bean.value_bigIntList = '121321723427834628';
});
lib_1.except_success(() => {
    bean.value_boolean = 1;
    bean.value_boolean = 0;
    bean.value_boolean = null;
    bean.value_boolean = undefined;
    bean.value_boolean = true;
    bean.value_boolean = false;
}, () => {
    bean.value_boolean = 'true';
    tap_1.default.equal(bean.value_boolean, true);
}, () => {
    bean.value_boolean = 'false';
    tap_1.default.equal(bean.value_boolean, false);
});
lib_1.except_fail(() => {
    bean.value_boolean = 12;
}, () => {
    bean.value_boolean = 'asd';
}, () => {
    bean.value_boolean = {};
}, () => {
    bean.value_boolean = [false, true];
});
lib_1.except_success(() => {
    bean.value_booleanList = null;
    bean.value_booleanList = undefined;
    bean.value_booleanList = [false, 1, 'true'];
    tap_1.default.equal(bean.value_booleanList[1], true);
    tap_1.default.equal(bean.value_booleanList[2], true);
});
lib_1.except_fail(() => {
    bean.value_booleanList = [1231, '23424', '121321723427834628'];
}, () => {
    bean.value_booleanList = true;
});
lib_1.except_success(() => {
    bean.value_integer = 1;
    bean.value_integer = 0;
    bean.value_integer = null;
    bean.value_integer = undefined;
    bean.value_integer = -123123;
    bean.value_integer = 23421324125321;
}, () => {
    bean.value_integer = '123142345';
    tap_1.default.equal(bean.value_integer, 123142345);
}, () => {
    bean.value_integer = '-23415111243';
    tap_1.default.equal(bean.value_integer, -23415111243);
});
lib_1.except_fail(() => {
    bean.value_integer = 'ssd1';
}, () => {
    bean.value_integer = {};
}, () => {
    bean.value_integer = 12314.122123;
}, () => {
    bean.value_integer = [12314];
});
lib_1.except_success(() => {
    bean.value_integerList = null;
    bean.value_integerList = undefined;
    bean.value_integerList = [12314, '1213'];
    tap_1.default.equal(bean.value_integerList[0], 12314);
    tap_1.default.equal(bean.value_integerList[1], 1213);
});
lib_1.except_fail(() => {
    bean.value_integerList = [1231, '23424', '121321723aa427834628'];
}, () => {
    bean.value_integerList = 1231;
});
lib_1.except_success(() => {
    bean.value_number = 1;
    bean.value_number = 0;
    bean.value_number = null;
    bean.value_number = undefined;
    bean.value_number = -123123;
    bean.value_number = 23421324125321;
    bean.value_number = 225321.1212;
    bean.value_number = 23421321.1212;
    bean.value_number = -2324125321.1212;
    bean.value_number = '23421321.1212';
    bean.value_number = '-2324125321.1212';
    bean.value_number = -23421321.1212;
}, () => {
    bean.value_number = '123142345';
    tap_1.default.equal(bean.value_number, 123142345);
}, () => {
    bean.value_number = '-23415111243';
    tap_1.default.equal(bean.value_number, -23415111243);
}, () => {
    bean.value_number = '-23415111243.1';
    tap_1.default.equal(bean.value_number, -23415111243.1);
}, () => {
    bean.value_number = '3411243.11212';
    tap_1.default.equal(bean.value_number, 3411243.11212);
});
lib_1.except_fail(() => {
    bean.value_number = 'ssd1';
}, () => {
    bean.value_number = {};
}, () => {
    bean.value_number = [12314];
});
lib_1.except_success(() => {
    bean.value_numberList = null;
    bean.value_numberList = undefined;
    bean.value_numberList = [12314, '1213', '1212.1223'];
    tap_1.default.equal(bean.value_numberList[1], 1213);
    tap_1.default.equal(bean.value_numberList[2], 1212.1223);
});
lib_1.except_fail(() => {
    bean.value_numberList = [1231, '23424', '121321723aa427834628'];
}, () => {
    bean.value_numberList = 1231;
});
lib_1.except_success(() => {
    bean.value_string = '123131';
    bean.value_string = null;
    bean.value_string = undefined;
}, () => {
    bean.value_string = '123142345';
    tap_1.default.equal(bean.value_string, '123142345');
});
lib_1.except_fail(() => {
    bean.value_string = 123;
}, () => {
    bean.value_string = {};
}, () => {
    bean.value_string = ['123142345'];
});
lib_1.except_success(() => {
    bean.value_stringList = ['1213', '1212.1223'];
});
lib_1.except_fail(() => {
    bean.value_stringList = [1231, '23424', '121321723aa427834628'];
}, () => {
    bean.value_stringList = '23424';
});
bean.value_date = '2009-06-15T08:00:00.000Z';
console.log(qs.stringify({ a: bean.value_date }));
lib_1.except_success(() => {
    bean.value_date = new Date();
    bean.value_date = '2009-06-15T08:00:00.000Z';
    bean.value_date = null;
    bean.value_date = undefined;
}, () => {
    bean.value_date = '2009-06-15T08:00:00.000Z';
    tap_1.default.equal(typeof bean.value_date, 'object');
    tap_1.default.equal(bean.value_date.getTime(), new Date('2009-06-15T08:00:00.000Z').getTime());
});
lib_1.except_fail(() => {
    bean.value_date = 123;
}, () => {
    bean.value_date = {};
}, () => {
    bean.value_date = [new Date()];
});
lib_1.except_success(() => {
    bean.value_dateList = [new Date(), '2009-06-15T08:00:00.000Z'];
});
lib_1.except_fail(() => {
    bean.value_dateList = [1231, '23424', '121321723aa427834628'];
}, () => {
    bean.value_dateList = new Date();
});
lib_1.except_success(() => {
    bean.value_object = {};
    bean.value_object = new Date();
    bean.value_object = null;
    bean.value_object = undefined;
});
lib_1.except_fail(() => {
    bean.value_object = 123;
}, () => {
    bean.value_object = 'ssss';
}, () => {
    bean.value_object = [];
});
lib_1.except_success(() => {
    bean.value_objectList = [{}, {}];
});
lib_1.except_fail(() => {
    bean.value_objectList = [1231, '23424', '121321723aa427834628'];
}, () => {
    bean.value_objectList = {};
});
lib_1.except_success(() => {
    bean.value_array = [];
    bean.value_array = new Array(4);
    bean.value_array = [1, 2, 3];
    bean.value_array = null;
    bean.value_array = undefined;
});
lib_1.except_fail(() => {
    bean.value_array = 123;
}, () => {
    bean.value_array = 'ssss';
});
lib_1.except_success(() => {
    bean.value_arrayWithCheck = ["121", "1212"];
});
lib_1.except_fail(() => {
    bean.value_arrayWithCheck = ["121", 1213];
});
lib_1.except_success(() => {
    bean.value_arrayList = [[], []];
});
lib_1.except_fail(() => {
    bean.value_arrayList = 123;
}, () => {
    bean.value_arrayList = {};
});
//# sourceMappingURL=type.js.map