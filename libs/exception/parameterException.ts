'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-13 15:52
* Desc: 
*/

import { exception } from 'febs-browser';

export default class ParameterException extends exception {
  constructor(msg: string, filename: string, line: number, column: number) {
    super(msg, exception.PARAM, filename, line, column);
  }
}