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

class SpringBean {
  @Null
  value_null: any
  @Null.List({ listMaxLength: 2 })
  value_nullList: any

  @NotNull
  value_notnull: any
  @NotNull.List
  value_notnullList: any

  @NotBlank
  value_notblank: any
  @NotBlank.List
  value_notblankList: any

  @NotEmpty
  value_notempty: any
  @NotEmpty.List
  value_notemptyList: any

  @Size({ min:2, max: 10 })
  value_size2_10: any
  @Size.List({ max: 10 })
  value_size2_10List: any

  @AssertFalse
  value_false: any
  @AssertFalse.List
  value_falseList: any

  @AssertTrue
  value_true: any
  @AssertTrue.List
  value_trueList: any

  @DecimalMax({value: 100000000000})
  value_decimalMax: any
  @DecimalMax.List({value: 100000000000})
  value_decimalMaxList: any

  @DecimalMin({value: 0})
  value_decimalMin: any
  @DecimalMin.List({value: 0})
  value_decimalMinList: any

  @Max({value: 0})
  value_max: any
  @Max.List({value: 0})
  value_maxList: any

  @Min({value: 0})
  value_min: any
  @Min.List({value: 0})
  value_minList: any

  @Negative
  value_negative: any
  @Negative.List
  value_negativeList: any

  @NegativeOrZero
  value_negativeOrZero: any
  @NegativeOrZero.List
  value_negativeOrZeroList: any

  @Positive
  value_positive: any
  @Positive.List
  value_positiveList: any

  @PositiveOrZero
  value_positiveOrZero: any
  @PositiveOrZero.List
  value_positiveOrZeroList: any

  @Range({min: 0, max: 100})
  value_range: any
  @Range.List({min: 0, max: 100})
  value_rangeList: any

  @Email
  value_email: any
  @Email.List
  value_emailList: any

  @Pattern({regexp: /^\d*$/})
  value_pattern: any
  @Pattern.List({regexp: /^\d*$/})
  value_patternList: any

  @Future
  value_future: any
  @Future.List
  value_futureList: any

  @FutureOrPresent
  value_futureOrPresent: any
  @FutureOrPresent.List
  value_futureOrPresentList: any

  @Past
  value_past: any
  @Past.List
  value_pastList: any

  @PastOrPresent
  value_pastOrPresent: any
  @PastOrPresent.List
  value_pastOrPresentList: any
}

let bean = new SpringBean()

//--------------------------------------------------------
// null
//--------------------------------------------------------
except_success(() => {
  bean.value_null = null
  bean.value_null = undefined
})
except_fail(
  () => {
    bean.value_null = [1231, '23424', '121321723427834628']
  },
  () => {
    bean.value_null = '123ddfsgsfg'
  }
)

except_success(() => {
  bean.value_nullList = null
  bean.value_nullList = undefined
  bean.value_nullList = [null, null]
})
except_fail(
  () => {
    bean.value_nullList = [1231, '23424', '121321723427834628']
  },
  () => {
    bean.value_nullList = '121321723427834628'
  }
)

//--------------------------------------------------------
// notnull
//--------------------------------------------------------
except_success(() => {
  bean.value_notnull = 1
  bean.value_notnull = 0
  bean.value_notnull = '1212'
  bean.value_notnull = {}
})
except_fail(
  () => {
    bean.value_notnull = null
  },
  () => {
    bean.value_notnull = undefined
  }
)

except_success(() => {
  bean.value_notnullList = [122, 1, 'true']
  bean.value_notnullList = null
  bean.value_notnullList = undefined
})
except_fail(
  () => {
    bean.value_notnullList = [12, null]
  },
  () => {
    bean.value_notnullList = [12, undefined]
  }
)

//--------------------------------------------------------
// notblank
//--------------------------------------------------------
except_success(() => {
  bean.value_notblank = ' 1 '
  bean.value_notblank = '12212'
})
except_fail(
  () => {
    bean.value_notblank = ''
  },
  () => {
    bean.value_notblank = '    '
  },
  () => {
    bean.value_notblank = null
  },
  () => {
    bean.value_notblank = undefined
  },
  () => {
    bean.value_notblank = 324
  }
)

except_success(() => {
  bean.value_notblankList = null
  bean.value_notblankList = undefined
  bean.value_notblankList = [' 1   ', '1213']
})
except_fail(
  () => {
    bean.value_notblankList = ['', '23424', '121321723aa427834628']
  },
  () => {
    bean.value_notblankList = 1231
  }
)

//--------------------------------------------------------
// notempty
//--------------------------------------------------------
except_success(() => {
  bean.value_notempty = {
    size() {
      return 1
    },
  }
  bean.value_notempty = '22'
  bean.value_notempty = '-2324125321.1212'
  bean.value_notempty = [1]
})
except_fail(
  () => {
    bean.value_notempty = null
  },
  () => {
    bean.value_notempty = undefined
  },
  () => {
    bean.value_notempty = {}
  },
  () => {
    bean.value_notempty = []
  },
  () => {
    bean.value_notempty = 1
  },
  () => {
    bean.value_notempty = 0
  },
  () => {
    bean.value_notempty = ''
  }
)

except_success(() => {
  bean.value_notemptyList = null
  bean.value_notemptyList = undefined
  bean.value_notemptyList = [[1], '1213', '1212.1223']
})
except_fail(
  () => {
    bean.value_notemptyList = [1, '23424', '121321723aa427834628']
  },
  () => {
    bean.value_notemptyList = ['', '23424', '121321723aa427834628']
  },
  () => {
    bean.value_notemptyList = [null, '23424', '121321723aa427834628']
  },
  () => {
    bean.value_notemptyList = 1231
  }
)

//--------------------------------------------------------
// size
//--------------------------------------------------------
except_success(
  () => {
    bean.value_size2_10 = '123131'
    bean.value_size2_10 = '12'
    bean.value_size2_10 = '1234567890'
    bean.value_size2_10 = [1,2,3,4,5,6,7,8,9,0,]
    bean.value_size2_10 = [1,2]
    bean.value_size2_10 = [1,2,4]
    bean.value_size2_10 = undefined
    bean.value_size2_10 = null
  },
)
except_fail(
  () => {
    bean.value_size2_10 = '12345678901'
  },
  () => {
    bean.value_size2_10 = '1'
  },
  () => {
    bean.value_size2_10 = [1]
  },
  () => {
    bean.value_size2_10 = [1,2,3,4,5,6,7,8,9,0,1]
  },
)

except_success(() => {
  bean.value_size2_10List = ['1213', '1234567890']
  bean.value_size2_10List = [[1,2], '1234567890']
  bean.value_size2_10List = ['1213', [1,2,3,4,5,6,7,8,9,0,]]
  bean.value_size2_10List = ['1213', [1,2,3,4,5,6,7,8,9,0,], null]
})
except_fail(
  () => {
  bean.value_size2_10List = ['1', [1,2,3,4,5,6,7,8,9,0,]]
  bean.value_size2_10List = ['12', [1,2,3,4,5,6,7,8,9,0,1,]]
  },
  () => {
    bean.value_size2_10List = '23424'
  }
)

//--------------------------------------------------------
// false
//--------------------------------------------------------
except_success(
  () => {
    bean.value_false = false
    bean.value_false = 0
    bean.value_false = 'false'
    bean.value_false = null
    bean.value_false = undefined
  },
  () => {
    bean.value_false = 'false'
    tap.equal(bean.value_false, false)
    bean.value_false = 0
    tap.equal(bean.value_false, false)
  }
)
except_fail(
  () => {
    bean.value_false = 1
  },
  () => {
    bean.value_false = true
  },
  () => {
    bean.value_false = 'true'
  },
  () => {
    bean.value_false = 'asdfs'
  },
  () => {
    bean.value_false = {}
  },
)

except_success(() => {
  bean.value_falseList = [null, 0, 'false', false];
  tap.equal(bean.value_falseList[1], false)
})
except_fail(
  () => {
    bean.value_falseList = [1, true]
  },
)


//--------------------------------------------------------
// true
//--------------------------------------------------------
except_success(
  () => {
    bean.value_true = true
    bean.value_true = 1
    bean.value_true = 'true'
    bean.value_true = null
    bean.value_true = undefined
  },
  () => {
    bean.value_true = 'true'
    tap.equal(bean.value_true, true)
    bean.value_true = 1
    tap.equal(bean.value_true, true)
  }
)
except_fail(
  () => {
    bean.value_true = 0
  },
  () => {
    bean.value_true = false
  },
  () => {
    bean.value_true = 'false'
  },
  () => {
    bean.value_true = 'asdfs'
  },
  () => {
    bean.value_true = {}
  },
)

except_success(() => {
  bean.value_trueList = [null, 1, 'true', true];
  tap.equal(bean.value_trueList[1], true)
})
except_fail(
  () => {
    bean.value_trueList = [1, false]
  },
)

//--------------------------------------------------------
// decimalMax
//--------------------------------------------------------
except_success(() => {
  bean.value_decimalMax = 100000000000
  bean.value_decimalMax = 0
  bean.value_decimalMax = -111
  bean.value_decimalMax = '100000000000'
  bean.value_decimalMax = '1212'
})
except_fail(
  () => {
    bean.value_decimalMax = 100000000001
  },
  () => {
    bean.value_decimalMax = 'ssss'
  }
)
except_success(() => {
  bean.value_decimalMaxList = [100000000000, 0, '-1212']
})
except_fail(
  () => {
    bean.value_decimalMaxList = 123
  },
  () => {
    bean.value_decimalMinList = [100000000001, 'sdd']
  },
  () => {
    bean.value_decimalMaxList = {}
  }
)


//--------------------------------------------------------
// decimalMin
//--------------------------------------------------------
except_success(() => {
  bean.value_decimalMin = 0
  bean.value_decimalMin = 111
  bean.value_decimalMin = '1000000'
  bean.value_decimalMin = '0'
})
except_fail(
  () => {
    bean.value_decimalMin = -1
  },
  () => {
    bean.value_decimalMin = 1.212
  },
  () => {
    bean.value_decimalMin = 'ssss'
  }
)
except_success(() => {
  bean.value_decimalMinList = [1121, 0, '1212']
})
except_fail(
  () => {
    bean.value_decimalMinList = 123
  },
  () => {
    bean.value_decimalMinList = [-11212, '1212']
  },
  () => {
    bean.value_decimalMinList = {}
  }
)



//--------------------------------------------------------
// Max
//--------------------------------------------------------
except_success(() => {
  bean.value_max= 0
  bean.value_max = -111
  bean.value_max = '-1000000'
  bean.value_max = '0'
})
except_fail(
  () => {
    bean.value_max = 1
  },
  () => {
    bean.value_max = -0.12
  },
  () => {
    bean.value_max = '-0.12'
  },
  () => {
    bean.value_max = 'ssss'
  }
)
except_success(() => {
  bean.value_maxList = [-1121, 0, '-1212']
})
except_fail(
  () => {
    bean.value_maxList = 123
  },
  () => {
    bean.value_maxList = [1212, '1212']
  },
  () => {
    bean.value_maxList = {}
  }
)

//--------------------------------------------------------
// Min
//--------------------------------------------------------
except_success(() => {
  bean.value_min= 0
  bean.value_min = 111
  bean.value_min = '1000000'
  bean.value_min = '0'
})
except_fail(
  () => {
    bean.value_min = -1
  },
  () => {
    bean.value_min = 0.12
  },
  () => {
    bean.value_min = '0.12'
  },
  () => {
    bean.value_min = 'ssss'
  }
)
except_success(() => {
  bean.value_minList = [1121, 0, '1212']
})
except_fail(
  () => {
    bean.value_minList = -123
  },
  () => {
    bean.value_minList = [-1212, '1212']
  },
  () => {
    bean.value_minList = {}
  }
)


//--------------------------------------------------------
// Negative
//--------------------------------------------------------
except_success(() => {
  bean.value_negative= null
  bean.value_negative= undefined
  bean.value_negative = -1
  bean.value_negative = '-1000000'
})
except_fail(
  () => {
    bean.value_negative = 1
  },
  () => {
    bean.value_negative = 0.12
  },
  () => {
    bean.value_negative = '0.12'
  },
  () => {
    bean.value_negative = 'ssss'
  },
  () => {
    bean.value_negative = {}
  }
)
except_success(() => {
  bean.value_negativeList = [null, -1, '-1212']
})
except_fail(
  () => {
    bean.value_negativeList = -123
  },
  () => {
    bean.value_negativeList = [-1212, '1212']
  },
  () => {
    bean.value_negativeList = {}
  }
)

//--------------------------------------------------------
// NegativeOrZero
//--------------------------------------------------------
except_success(() => {
  bean.value_negativeOrZero= null
  bean.value_negativeOrZero= undefined
  bean.value_negativeOrZero = -1
  bean.value_negativeOrZero = '-1000000'
  bean.value_negativeOrZero = '0'
  bean.value_negativeOrZero = 0
})
except_fail(
  () => {
    bean.value_negativeOrZero = 1
  },
  () => {
    bean.value_negativeOrZero = 0.12
  },
  () => {
    bean.value_negativeOrZero = '0.12'
  },
  () => {
    bean.value_negativeOrZero = 'ssss'
  },
  () => {
    bean.value_negativeOrZero = {}
  }
)
except_success(() => {
  bean.value_negativeOrZeroList = [null, 0, '0', -1, '-1212']
})
except_fail(
  () => {
    bean.value_negativeOrZeroList = -123
  },
  () => {
    bean.value_negativeOrZeroList = [-1212, '1212']
  },
  () => {
    bean.value_negativeOrZeroList = {}
  }
)



//--------------------------------------------------------
// positive
//--------------------------------------------------------
except_success(() => {
  bean.value_positive= null
  bean.value_positive= undefined
  bean.value_positive = 1
  bean.value_positive = '1000000'
})
except_fail(
  () => {
    bean.value_positive = -1
  },
  () => {
    bean.value_positive = 0
  },
  () => {
    bean.value_positive = '-0.12'
  },
  () => {
    bean.value_positive = 'ssss'
  },
  () => {
    bean.value_positive = {}
  }
)
except_success(() => {
  bean.value_positiveList = [null, 1, '1212']
})
except_fail(
  () => {
    bean.value_positiveList = -123
  },
  () => {
    bean.value_positiveList = [-1212, '1212']
  },
  () => {
    bean.value_positiveList = {}
  }
)

//--------------------------------------------------------
// positiveOrZero
//--------------------------------------------------------
except_success(() => {
  bean.value_positiveOrZero= null
  bean.value_positiveOrZero= undefined
  bean.value_positiveOrZero = 1
  bean.value_positiveOrZero = '1000000'
  bean.value_positiveOrZero = '0'
  bean.value_positiveOrZero = 0
})
except_fail(
  () => {
    bean.value_positiveOrZero = -1
  },
  () => {
    bean.value_positiveOrZero = -0.12
  },
  () => {
    bean.value_positiveOrZero = '-0.12'
  },
  () => {
    bean.value_positiveOrZero = 'ssss'
  },
  () => {
    bean.value_positiveOrZero = {}
  }
)
except_success(() => {
  bean.value_positiveOrZeroList = [null, 0, '0', 1, '1212']
})
except_fail(
  () => {
    bean.value_positiveOrZeroList = -123
  },
  () => {
    bean.value_positiveOrZeroList = [-1212, '1212']
  },
  () => {
    bean.value_positiveOrZeroList = {}
  }
)


//--------------------------------------------------------
// range
//--------------------------------------------------------
except_success(() => {
  bean.value_range= null
  bean.value_range= undefined
  bean.value_range = 0
  bean.value_range = 100
  bean.value_range = 59
  bean.value_range = '30.12'
})
except_fail(
  () => {
    bean.value_range = -1
  },
  () => {
    bean.value_range = -0.12
  },
  () => {
    bean.value_range = '100.12'
  },
  () => {
    bean.value_range = 'ssss'
  },
  () => {
    bean.value_range = {}
  }
)
except_success(() => {
  bean.value_rangeList = [null, 0, '0', 1, '50']
})
except_fail(
  () => {
    bean.value_rangeList = -123
  },
  () => {
    bean.value_rangeList = [-1212, '1212']
  },
  () => {
    bean.value_rangeList = {}
  }
)



//--------------------------------------------------------
// email
//--------------------------------------------------------
except_success(() => {
  bean.value_email= null
  bean.value_email= undefined
  bean.value_email = 'xxx@cx.com'
  bean.value_email = 'sdf1@sdsdg.net'
  bean.value_email = '1212rf.sge@sdgs.cn'
  bean.value_email = 'zzz.xx@xx.cn'
})
except_fail(
  () => {
    bean.value_email = -1
  },
  () => {
    bean.value_email = -0.12
  },
  () => {
    bean.value_email = 'sdf1'
  },
  () => {
    bean.value_email = 'ssss@ddf'
  },
  () => {
    bean.value_email = {}
  }
)

except_success(() => {
  bean.value_emailList = [null, 'xxx@cx.com', 'zzz.xx@xx.cn']
})
except_fail(
  () => {
    bean.value_emailList = -123
  },
  () => {
    bean.value_emailList = ['ssss@ddf', 'zzz.xx@xx.cn']
  },
  () => {
    bean.value_emailList = {}
  }
)



//--------------------------------------------------------
// pattern
//--------------------------------------------------------
except_success(() => {
  bean.value_pattern= null
  bean.value_pattern= undefined
  bean.value_pattern = '123143'
  bean.value_pattern = '0127432'
})
except_fail(
  () => {
    bean.value_pattern = -1
  },
  () => {
    bean.value_pattern = -0.12
  },
  () => {
  bean.value_pattern = 'sdf123'
  },
  () => {
    bean.value_pattern = {}
  }
)
except_success(() => {
  bean.value_patternList = [null, '0127432']
})
except_fail(
  () => {
    bean.value_patternList = -123
  },
  () => {
    bean.value_patternList = ['ssss@ddf', '你好.xx@中国.cn']
  },
  () => {
    bean.value_patternList = {}
  }
)



//--------------------------------------------------------
// future
//--------------------------------------------------------
except_success(() => {
  bean.value_future= null
  bean.value_future = undefined
  let now = new Date();
  now.setDate(now.getDate()+1)
  bean.value_future = now;
})
except_fail(
  () => {
    let now = new Date();
    now.setDate(now.getDate()-1)
    bean.value_future = now
  },
)
except_success(() => {
  let now = new Date();
  now.setDate(now.getDate()+1)
  bean.value_futureList = [now]
})
except_fail(
  () => {
    let now = new Date();
    now.setDate(now.getDate()-1)
    bean.value_futureList = [now]
  },
  () => {
    bean.value_futureList = ['n']
  },
  () => {
    bean.value_futureList = {}
  }
)



//--------------------------------------------------------
// futureOrPresent
//--------------------------------------------------------
except_success(() => {
  bean.value_futureOrPresent= null
  bean.value_futureOrPresent = undefined
  let now = new Date();
  now.setDate(now.getDate())
  bean.value_futureOrPresent = now;
})
except_fail(
  () => {
    let now = new Date();
    now.setDate(now.getDate()-1)
    bean.value_futureOrPresent = now
  },
)
except_success(() => {
  let now = new Date();
  now.setDate(now.getDate())
  bean.value_futureOrPresentList = [now]
})
except_fail(
  () => {
    let now = new Date();
    now.setDate(now.getDate()-1)
    bean.value_futureOrPresentList = [now]
  },
  () => {
    bean.value_futureOrPresentList = ['n']
  },
  () => {
    bean.value_futureOrPresentList = {}
  }
)



//--------------------------------------------------------
// past
//--------------------------------------------------------
except_success(() => {
  bean.value_past= null
  bean.value_past = undefined
  let now = new Date();
  now.setDate(now.getDate()-1)
  bean.value_past = now;
})
except_fail(
  () => {
    let now = new Date();
    now.setDate(now.getDate()+1)
    bean.value_past = now
  },
)
except_success(() => {
  let now = new Date();
  now.setDate(now.getDate()-1)
  bean.value_pastList = [now]
})
except_fail(
  () => {
    let now = new Date();
    now.setDate(now.getDate()+1)
    bean.value_pastList = [now]
  },
  () => {
    bean.value_pastList = ['n']
  },
  () => {
    bean.value_pastList = {}
  }
)



//--------------------------------------------------------
// pastOrPresent
//--------------------------------------------------------
except_success(() => {
  bean.value_pastOrPresent= null
  bean.value_pastOrPresent = undefined
  let now = new Date();
  now.setDate(now.getDate())
  bean.value_pastOrPresent = now;
})
except_fail(
  () => {
    let now = new Date();
    now.setDate(now.getDate()+1)
    bean.value_pastOrPresent = now
  },
)
except_success(() => {
  let now = new Date();
  now.setDate(now.getDate())
  bean.value_pastOrPresentList = [now]
})
except_fail(
  () => {
    let now = new Date();
    now.setDate(now.getDate()+1)
    bean.value_pastOrPresentList = [now]
  },
  () => {
    bean.value_pastOrPresentList = ['n']
  },
  () => {
    bean.value_pastOrPresentList = {}
  }
)

