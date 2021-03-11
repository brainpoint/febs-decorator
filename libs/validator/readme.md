
- [Example](#example)
- [模拟 java spring validation](#模拟-java-spring-validation)
  - [空值判断](#空值判断)
  - [boolean判断](#boolean判断)
  - [数值判断(可以验证数值字符串)](#数值判断可以验证数值字符串)
  - [字符串判断](#字符串判断)
  - [时间判断](#时间判断)
- [值枚举](#值枚举)
- [类型限定](#类型限定)
- [任意判断](#任意判断)

## Example

可使用如下装饰器进行参数类型检测:

```js
import {NotNull, Type} from 'febs-decorator';

class BeanA {
  @NotNull
  @Type.Boolean
  a: boolean = null;
}
let obj = new BeanA();  // 抛出参数非法异常.
```

如上的实例, 在创建对象 var o = new BeanA() 或对属性 o.a = null 设置值时, 将检测属性的合法性, 错误时抛出异常;

*注意: 如下不会触发合法性检测 *

```js
class BeanA {
  @NotNull
  a: boolean;
}
let obj = new BeanA();  // 不会抛出参数非法异常
obj.a = null;           // 抛出参数非法异常 (需要触发setter进行检测)
```

> **<font color=#ff0000>所有的validate装饰器都存在数组验证方式, 例如: `@Max.List`用来验证数组,且验证数组的每个元素的max值<p>所有的`.List`都可以带一个`listMaxLength`参数来验证数组元素的最大个数</font>**

## 模拟 java spring validation

### 空值判断

| 名称                              | 作用                                                                         | 例子                                   |
| --------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------- |
| `@Null`                           | 指定参数必须为 null 或 undefined.                                            | @Null({message: "必须为空"})           |
| `@NotNull`                        | 指定参数不能为 null 或 undefined.                                            | @NotNull({message: "不能为空"})        |
| `@NotBlank`                       | 指定参数必须至少包含一个非空字符串; trim操作后长度>0                         | @NotBlank({message: "非法"})           |
| `@NotEmpty`                       | 指定参数不能为 null、undefined且长度大于0<br> (o.size() > 0 或 o.length > 0) | @NotEmpty({message: "不能为空字符串"}) |
| `@Size`({max:number, min:number}) | 指定参数(字符串,array)的长度的最大最小值<br> (o.size() 或 o.length)          | &nbsp;                                 |

### boolean判断

| 名称           | 作用              | 例子                                   |
| -------------- | ----------------- | -------------------------------------- |
| `@AssertFalse` | 指定参数必须false | @AssertFalse({message: "必须为false"}) |
| `@AssertTrue`  | 指定参数必须true  | @AssertTrue({message: "必须为true"})   |

### 数值判断(可以验证数值字符串)

| 名称                                                         | 作用                             | 例子                                             |
| ------------------------------------------------------------ | -------------------------------- | ------------------------------------------------ |
| `@DecimalMax`({value:number &brvbar; string})                | 指定参数值必须小于等于指定的值   | @DecimalMax({value:1000, message: "值超出范围"}) |
| `@DecimalMin`({value:number &brvbar; string})                | 指定参数值必须大于等于指定的值   | @DecimalMin({value:0, message: "值超出范围"})    |
| `@Max`({value:number &brvbar; string})                       | 指定整数数值类型的最大值.        | @Max({value:1000, message: "值超出范围"})        |
| `@Min`({value:number &brvbar; string})                       | 指定整数数值类型的最小值.        | @Min({value:1000, message: "值超出范围"})        |
| [unsupported] ~~@Digits({integer:number, fraction:number})~~ | 判断数值是否是小于等于指定的范围 | @Digits({integer:5, fraction:1})                 |
| `@Negative`                                                  | 判断数值是否是负数               | &nbsp;                                           |
| `@NegativeOrZero`                                            | 判断数值是否是负数或0            | &nbsp;                                           |
| `@Positive`                                                  | 判断数值是否是正数               | &nbsp;                                           |
| `@PositiveOrZero`                                            | 判断数值是否是正数或0            | &nbsp;                                           |
| `@Range`({min:number=0, max:number})                         | 判断数值的范围                   | &nbsp;                                           |


### 字符串判断

| 名称                        | 作用                                  | 例子                    |
| --------------------------- | ------------------------------------- | ----------------------- |
| `@Email`({regexp:RegExp})   | 指定参数是否是email, 可以另外指定正则 | @Email({regexp:/.*/})   |
| `@Pattern`({regexp:RegExp}) | 指定参数是否匹配正则                  | @Pattern({regexp:/.*/}) |


### 时间判断

| 名称               | 作用                         | 例子   |
| ------------------ | ---------------------------- | ------ |
| `@Future`          | Date参数是否是将来时间       | &nbsp; |
| `@FutureOrPresent` | Date参数是否是现在或将来时间 | &nbsp; |
| `@Past`            | Date参数是否是过去时间       | &nbsp; |
| `@PastOrPresent`   | Date参数是否是现在或过去时间 | &nbsp; |

## 值枚举

| 名称                                 | 作用                          |
| ------------------------------------ | ----------------------------- |
| `@Enum`({allows: [v1, v2, v3, ...]}) | 验证参数是否配置允许的值之一. |
| `@Type.Enum`({enumType: EnumName}) | 验证参数是否指定的枚举类型的值. |


`@Type.Enum` 示例:

```js
import {Type} from 'febs-decorator';

enum Enum1 {
  a = '2323',
  b = 'xxxx'
}

class BeanA {
  @Type.Enum({enumType: Enum1 })
  a: any = null;
}
let obj = new BeanA();

obj.a = Enum1.a;
obj.a = Enum1.b;
obj.a = 1;  // 抛出参数非法异常.
```

## 类型限定

如下装饰器用于动态运行时对属性值进行验证.

| 名称            | 作用                     |
| --------------- | ------------------------ |
| `@Type.Boolean` | 验证参数是否为boolean值. |
| `@Type.Number`  | 验证参数是否为数值.      |
| `@Type.Integer` | 验证参数是否为整型值.    |
| `@Type.BigInt`  | 验证参数是否为整型值.    |
| `@Type.String`  | 验证参数是否为字符串.    |
| `@Type.Date`    | 验证参数是否为时间.      |
| `@Type.Object`  | 验证参数是否为object.    |
| `@Type.Array`   | 验证参数是否为数组.      |

## 任意判断

| 名称            | 作用                     |
| --------------- | ------------------------ |
| `@Type.Validator` | 验证任意参数. |


```js
// 验证value为1
@Type.Validator({
  checkCB(value:any) {
    if (value !== 1) return false;
  }
})
value: number;
```