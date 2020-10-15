'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-15 11:02
* Desc: 
*/

import { AssertFalse, AssertTrue, NotNull, Type } from "./libs";
import ParameterException from "./libs/exception/parameterException";


class BeanA {
  
  @Type.Boolean.List
  // @AssertFalse()
  cc: any = false;
}


// class A {
//   @Validated
//   test(@AssertTrue() a:boolean, @AssertTrue() b:boolean) {
//   }
// }


try {
  // new A().test(false, false)
  let b: BeanA = new BeanA();
  // b.aa = true;
  // b.bb = true;
  // b.cc = [1231, '23424', '121321723427834628']
  b.cc = true
  // b.dd = null;
  console.log(b.cc)
} catch (e) {
  console.log(e);
}