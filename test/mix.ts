'use strict'
/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-16 10:33
 * Desc:
 */
import tap from 'tap'
import {
  NotNull,
  Type,
} from '..'
import { except_fail, except_success } from './lib'

class MixBean {
  @NotNull
  @NotNull.List
  @Type.Integer.List
  value_notnullList: any
}

let bean = new MixBean()

//--------------------------------------------------------
// notnull
//--------------------------------------------------------
except_success(() => {
  bean.value_notnullList = [1, 2, 3, '123123']
})
except_fail(
  () => {
    bean.value_notnullList = [122, 1, 123.123]
  },
  () => {
    bean.value_notnullList = null
  },
  () => {
    bean.value_notnullList = undefined
  },
  () => {
    bean.value_notnullList = [12, null]
  },
  () => {
    bean.value_notnullList = [12, undefined]
  },
)
