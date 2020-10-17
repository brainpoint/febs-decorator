
Some typescript decorators, like spring-validation and so on.

## Setup

```
npm i febs-decorator
```

## Example

```js
import {NotNull, Type} from 'febs-decorator';

class BeanDemo {
    @NotNull
    @Type.Boolean
    a: boolean = null
}

let obj = new BeanA();  // will throw a exception.
```

## Reference

### [Validator Decorator](./libs/validator/readme.md)

A set validator decorator, e.g. `@NotNull`, `@Max`, `@Min`, `@Range` ..

