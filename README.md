
Some typescript decorators, like spring-validation and so on.

## Setup

```
npm i febs-decorator
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
import { FeignClient, RequestMapping, RequestMethod, ResponseBody } from "febs-decorator";

@FeignClient({ name: 'base' })
export class BaseService {

  @RequestMapping({ path: '/api', method: RequestMethod.GET })
  async request(@ResponseBody(BeanDemo) resp ?: ResponseBodyType): Promise<BeanDemo> {
    // fallback.
    console.log(resp.sourceMessage) // sourceMessage.
    console.log(resp.error) // error.
    throw new Error('Message Error');
  }
}
```

## Reference

### [Validator Decorator](./libs/validator/readme.md)

A set of validator decorators, e.g. `@NotNull`, `@Max`, `@Min`, `@Range` ..

### [Rest Decorator](./libs/rest/readme.md)

A set of restful api decorators, e.g. `@FeignClient`, `@RequestMapping`, `@RequestBody`, `@PathVariable` ..

