'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-15 10:24
* Desc: 
*/


//
// define the __debugFeignClient.
if (!global.hasOwnProperty('__debugFeignClient')) {
  Object.defineProperty(global, '__debugFeignClient', {
   get: function() {
      return !!(<any>global).__debugFeignClient;
   },
   set: function(isDebug) {
     (<any>global).__debugFeignClient = isDebug;
   }
  });
}


export * from './libs/Service';
export * from './libs/Autowired';
export * from './libs/validator';
export * from './libs/rest';
export * as urlUtils from './libs/utils/urlUtils';