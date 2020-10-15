
Some decorators, like spring-validation and so on.

## Example

```js
import {NotNull} from 'febs-decorator';

class BeanDemo {
    @NotNull
    a: boolean = null
}

let obj = new BeanA();  // will throw a exception.
```

## Reference

### [Validator Decorator](./libs/validator/readme.md)

A set validator decorator, e.g. `@NotNull`, `@Max`, `@Min`, `@Range` ..

