
Some typescript decorators, like spring-validation and so on.

- [Setup](#setup)
- [Example](#example)
- [Reference](#reference)
  - [Validator Decorator](#validator-decorator)
  - [Rest Decorator](#rest-decorator)

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

Service Example:

```js
import {Service} from 'febs-decorator';

@Service()
class BeanDemo {
}

// get service instances.
@Autowired(BeanDemo)
let objArray:any[];
```

Bean Example:

```js
import {Service, Bean} from 'febs-decorator';

@Service()
class BeanDemo {
  @Bean()
  foo(): Object {
    return {};
  }
}

// get bean instances.
@Autowired('foo')
let obj:Object;
```

FeignClient Example:

```js
import { RestController, RequestMapping, RequestMethod } from "febs-decorator";

@FeignClient({name:'serviceName'})
export class BaseService {
  @RequestMapping({ path: '/api', method: RequestMethod.GET, feignCastType: BeanDemo })
  async request(): Promise<BeanDemo> {
    // fallback.
    throw new Error('Message Error');
  }
}

// request
let result:BeanDemo = new BaseService().request();
```

## Reference

### Validator Decorator

see [readme](./libs/validator/readme.md)

A set of validator decorators, e.g. `@NotNull`, `@Max`, `@Min`, `@Range` ..

### Rest Decorator

see [readme](./libs/rest/readme.md)

A set of restful api decorators, e.g. `@RestController`, `@FeignClient`, `@RequestMapping`, `@RequestBody`, `@PathVariable` ..

