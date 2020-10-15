'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-16 11:12
* Desc: 
*/

import tap from 'tap';

/**
* @desc: 期望执行失败.
*/
export function except_fail(...foo: (() => void)[]) {
  for (let i = 0; i < foo.length; i++) {
    let success = true;
    try {
      foo[i]();
    } catch (e) {
      success = false;
    } finally {
      tap.equal(success, false);
    }
  }
}

/**
* @desc: 期望执行成功.
*/
export function except_success(...foo: (() => void)[]) {
  for (let i = 0; i < foo.length; i++) {
    let success = true;
    try {
      foo[i]();
    } catch (e) {
      success = false;
    } finally {
      tap.equal(success, true);
    }
  }
}
