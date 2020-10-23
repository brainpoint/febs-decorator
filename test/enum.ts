'use strict'
/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-16 10:33
 * Desc:
 */
import tap from 'tap'
import {
  AssertFalse,
  AssertTrue,
  DecimalMax,
  DecimalMin,
  Email,
  Enum,
  Future,
  FutureOrPresent,
  Max,
  Min,
  Negative,
  NegativeOrZero,
  NotBlank,
  NotEmpty,
  NotNull,
  Null,
  Past,
  PastOrPresent,
  Pattern,
  Positive,
  PositiveOrZero,
  Range,
  Size,
  Type,
} from '..'
import { except_fail, except_success } from './lib'

enum Enum1 {
  a = '2323',
  b = 'xxxx'
}

class EnumBean {
  @Enum({allows: [1,2,3,'a','b','c']})
  value_enum: any
  @Enum.List({allows: [1,2,3,'a','b','c']})
  value_enumList: any

  @Type.Enum({enumType: Enum1})
  value_enumType: any
  @Type.Enum.List({enumType: Enum1})
  value_enumTypeList: any
}

let bean = new EnumBean()

//--------------------------------------------------------
// enum
//--------------------------------------------------------
except_success(() => {
  bean.value_enum = null
  bean.value_enum = undefined
  bean.value_enum = 1
  bean.value_enum = 2
  bean.value_enum = 3
  bean.value_enum = 'a'
  bean.value_enum = 'b'
  bean.value_enum = 'c'
})
except_fail(
  () => {
    bean.value_enum = [1231]
  },
  () => {
    bean.value_enum = '123ddfsgsfg'
  },
  () => {
    bean.value_enum = 4
  }
)

except_success(() => {
  bean.value_enumList = null
  bean.value_enumList = undefined
  bean.value_enumList = [1, 2, 'a', 'c']
})
except_fail(
  () => {
    bean.value_enumList = [1231]
  },
  () => {
    bean.value_enumList = 1
  }
)


//--------------------------------------------------------
// enumList
//--------------------------------------------------------
except_success(() => {
  bean.value_enumType = null
  bean.value_enumType = undefined
  bean.value_enumType = Enum1.a
  bean.value_enumType = Enum1.b
})
except_fail(
  () => {
    bean.value_enumType = [1231]
  },
  () => {
    bean.value_enumType = 2
  },
  () => {
    bean.value_enumType = 4
  }
)

except_success(() => {
  bean.value_enumTypeList = null
  bean.value_enumTypeList = undefined
  bean.value_enumTypeList = [Enum1.a, Enum1.b]
})
except_fail(
  () => {
    bean.value_enumTypeList = ['232s3']
  },
  () => {
    bean.value_enumTypeList = 1
  }
)
