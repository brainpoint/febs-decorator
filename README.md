
Some typescript decorators, like spring-validation and so on.

## Setup

```
npm i febs-decorator
```

set config in tsconfig.json

```
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

## Example


Validation Example:

```js
import {NotNull, Type} from 'febs-decorator';

class BeanDemo {
    @NotNull
    @Type.Boolean
    a: boolean = null
}

let obj = new BeanA();  // will throw a exception.
```

Rest Example:

```js
import { RestController, RequestMapping, RequestMethod } from "febs-decorator";

@RestController()
export class BaseService {
  @RequestMapping({ path: '/api', method: RequestMethod.GET, dataType: BeanDemo })
  async request(): Promise<BeanDemo> {
    // fallback.
    throw new Error('Message Error');
  }
}

// request
let result:BeanDemo = new BaseService().request(); 
```

## Reference

### [Validator Decorator](./libs/validator/readme.md)

A set of validator decorators, e.g. `@NotNull`, `@Max`, `@Min`, `@Range` ..

### [Rest Decorator](./libs/rest/readme.md)

A set of restful api decorators, e.g. `@FeignClient`, `@RequestMapping`, `@RequestBody`, `@PathVariable` ..

