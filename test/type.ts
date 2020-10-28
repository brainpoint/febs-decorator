'use strict'
/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-16 10:33
 * Desc:
 */
import tap from 'tap'
import { Type } from '..'
import { except_fail, except_success } from './lib'
var qs = require('../libs/utils/qs/dist')

class TypeBean {
  @Type.BigInt
  value_bigInt: any
  @Type.BigInt.List({ listMaxLength: 2 })
  value_bigIntList: any

  @Type.Boolean
  value_boolean: any
  @Type.Boolean.List
  value_booleanList: any

  @Type.Integer
  value_integer: any
  @Type.Integer.List
  value_integerList: any

  @Type.Number
  value_number: any
  @Type.Number.List
  value_numberList: any

  @Type.String
  value_string: any
  @Type.String.List
  value_stringList: any

  @Type.Date
  value_date: any
  @Type.Date.List
  value_dateList: any

  @Type.Object
  value_object: any
  @Type.Object.List
  value_objectList: any

  @Type.Array({ checkCB(elem: any, index: number) {
    return typeof elem === 'string';
  }})
  value_arrayWithCheck: any
  @Type.Array
  value_array: any
  @Type.Array.List
  value_arrayList: any
}

let bean = new TypeBean()

//--------------------------------------------------------
// bigint
//--------------------------------------------------------
except_success(
  () => {
    bean.value_bigInt = 1
    bean.value_bigInt = -1
    bean.value_bigInt = -0
    bean.value_bigInt = null
    bean.value_bigInt = undefined
  },
  () => {
    bean.value_bigInt = 123456789012345
    tap.equal(bean.value_bigInt, 123456789012345)
  },
  () => {
    bean.value_bigInt = '123456789012345'
    tap.equal(bean.value_bigInt, '123456789012345')
  }
)
except_fail(
  () => {
    bean.value_bigInt = [1231, '23424', '121321723427834628']
  },
  () => {
    bean.value_bigInt = '123ddfsgsfg'
  }
)

except_success(() => {
    bean.value_bigIntList = null
    bean.value_bigIntList = undefined
  bean.value_bigIntList = [1231, '23424']
})
except_fail(
  () => {
    bean.value_bigIntList = [1231, '23424', '121321723427834628']
  },
  () => {
    bean.value_bigIntList = '121321723427834628'
  }
)

//--------------------------------------------------------
// boolean
//--------------------------------------------------------
except_success(
  () => {
    bean.value_boolean = 1
    bean.value_boolean = 0
    bean.value_boolean = null
    bean.value_boolean = undefined
    bean.value_boolean = true
    bean.value_boolean = false
  },
  () => {
    bean.value_boolean = 'true'
    tap.equal(bean.value_boolean, true)
  },
  () => {
    bean.value_boolean = 'false'
    tap.equal(bean.value_boolean, false)
  }
)
except_fail(
  () => {
    bean.value_boolean = 12
  },
  () => {
    bean.value_boolean = 'asd'
  },
  () => {
    bean.value_boolean = {}
  },
  () => {
    bean.value_boolean = [false, true]
  },
)

except_success(() => {
    bean.value_booleanList = null
    bean.value_booleanList = undefined
  bean.value_booleanList = [false, 1, 'true']
  tap.equal(bean.value_booleanList[1], true);
  tap.equal(bean.value_booleanList[2], true);
})
except_fail(
  () => {
    bean.value_booleanList = [1231, '23424', '121321723427834628']
  },
  () => {
    bean.value_booleanList = true
  }
)


//--------------------------------------------------------
// Integer
//--------------------------------------------------------
except_success(
  () => {
    bean.value_integer = 1
    bean.value_integer = 0
    bean.value_integer = null
    bean.value_integer = undefined
    bean.value_integer = -123123
    bean.value_integer = 23421324125321
  },
  () => {
    bean.value_integer = '123142345'
    tap.equal(bean.value_integer, 123142345)
  },
  () => {
    bean.value_integer = '-23415111243'
    tap.equal(bean.value_integer, -23415111243)
  }
)
except_fail(
  () => {
    bean.value_integer = 'ssd1'
  },
  () => {
    bean.value_integer = {}
  },
  () => {
    bean.value_integer = 12314.122123
  },
  () => {
    bean.value_integer = [12314]
  },
)

except_success(() => {
    bean.value_integerList = null
    bean.value_integerList = undefined
  bean.value_integerList = [12314, '1213']
  tap.equal(bean.value_integerList[0], 12314);
  tap.equal(bean.value_integerList[1], 1213);
})
except_fail(
  () => {
    bean.value_integerList = [1231, '23424', '121321723aa427834628']
  },
  () => {
    bean.value_integerList = 1231
  }
)


//--------------------------------------------------------
// number
//--------------------------------------------------------
except_success(
  () => {
    bean.value_number = 1
    bean.value_number = 0
    bean.value_number = null
    bean.value_number = undefined
    bean.value_number = -123123
    bean.value_number = 23421324125321
    bean.value_number = 225321.1212
    bean.value_number = 23421321.1212
    bean.value_number = -2324125321.1212
    bean.value_number = '23421321.1212'
    bean.value_number = '-2324125321.1212'
    bean.value_number = -23421321.1212
  },
  () => {
    bean.value_number = '123142345'
    tap.equal(bean.value_number, 123142345)
  },
  () => {
    bean.value_number = '-23415111243'
    tap.equal(bean.value_number, -23415111243)
  },
  () => {
    bean.value_number = '-23415111243.1'
    tap.equal(bean.value_number, -23415111243.1)
  },
  () => {
    bean.value_number = '3411243.11212'
    tap.equal(bean.value_number, 3411243.11212)
  },
)
except_fail(
  () => {
    bean.value_number = 'ssd1'
  },
  () => {
    bean.value_number = {}
  },
  () => {
    bean.value_number = [12314]
  },
)

except_success(() => {
    bean.value_numberList = null
    bean.value_numberList = undefined
  bean.value_numberList = [12314, '1213', '1212.1223']
  tap.equal(bean.value_numberList[1], 1213);
  tap.equal(bean.value_numberList[2], 1212.1223);
})
except_fail(
  () => {
    bean.value_numberList = [1231, '23424', '121321723aa427834628']
  },
  () => {
    bean.value_numberList = 1231
  }
)



//--------------------------------------------------------
// string
//--------------------------------------------------------
except_success(
  () => {
    bean.value_string = '123131'
    bean.value_string = null
    bean.value_string = undefined
  },
  () => {
    bean.value_string = '123142345'
    tap.equal(bean.value_string, '123142345')
  },
)
except_fail(
  () => {
    bean.value_string = 123
  },
  () => {
    bean.value_string = {}
  },
  () => {
    bean.value_string = ['123142345']
  },
)

except_success(() => {
  bean.value_stringList = ['1213', '1212.1223']
})
except_fail(
  () => {
    bean.value_stringList = [1231, '23424', '121321723aa427834628']
  },
  () => {
    bean.value_stringList = '23424'
  }
)

//--------------------------------------------------------
// Date
//--------------------------------------------------------
except_success(
  () => {
    bean.value_date = new Date();
    bean.value_date = '2009-06-15T08:00:00.000Z';
    bean.value_date = null
    bean.value_date = undefined
  },
  () => {
    bean.value_date = '2009-06-15T08:00:00.000Z'
    tap.equal(typeof bean.value_date, 'object');
    tap.equal(bean.value_date.getTime(), new Date('2009-06-15T08:00:00.000Z').getTime())
  },
)
except_fail(
  () => {
    bean.value_date = 123
  },
  () => {
    bean.value_date = {}
  },
  () => {
    bean.value_date = [new Date()]
  },
)

except_success(() => {
  bean.value_dateList = [new Date(), '2009-06-15T08:00:00.000Z']
})
except_fail(
  () => {
    bean.value_dateList = [1231, '23424', '121321723aa427834628']
  },
  () => {
    bean.value_dateList = new Date()
  }
)



//--------------------------------------------------------
// Object
//--------------------------------------------------------
except_success(
  () => {
    bean.value_object = {}
    bean.value_object = new Date();
    bean.value_object = null
    bean.value_object = undefined
  },
)
except_fail(
  () => {
    bean.value_object = 123
  },
  () => {
    bean.value_object = 'ssss'
  },
  () => {
    bean.value_object = []
  },
)

except_success(() => {
  bean.value_objectList = [{}, {}]
})
except_fail(
  () => {
    bean.value_objectList = [1231, '23424', '121321723aa427834628']
  },
  () => {
    bean.value_objectList = {}
  }
)


//--------------------------------------------------------
// Array
//--------------------------------------------------------
except_success(
  () => {
    bean.value_array = []
    bean.value_array = new Array(4);
    bean.value_array = [1,2,3]
    bean.value_array = null
    bean.value_array = undefined
  },
)
except_fail(
  () => {
    bean.value_array = 123
  },
  () => {
    bean.value_array = 'ssss'
  },
)
except_success(
  () => {
    bean.value_arrayWithCheck = ["121", "1212"]
  },
)
except_fail(
  () => {
    bean.value_arrayWithCheck = ["121", 1213]
  },
)
except_success(() => {
  bean.value_arrayList = [[], []]
})
except_fail(
  () => {
    bean.value_arrayList = 123
  },
  () => {
    bean.value_arrayList = {}
  }
)






