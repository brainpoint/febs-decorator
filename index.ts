'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-15 10:24
* Desc: 
*/

const debugFeignClientValue = Symbol('debugFeignClientValue');

//
// define the __debugFeignClient.
if (!global.hasOwnProperty('__debugFeignClient')) {
  Object.defineProperty(global, '__debugFeignClient', {
   get: function() {
      return !!(<any>global)[debugFeignClientValue];
   },
   set: function(isDebug) {
     (<any>global)[debugFeignClientValue] = isDebug;
   }
  });
}


export * from './libs/Service';
export * from './libs/Autowired';
export * from './libs/validator';
export * from './libs/rest';
export * as urlUtils from './libs/utils/urlUtils';