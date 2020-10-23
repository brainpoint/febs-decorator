'use strict'
import { basename } from 'path';
/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-16 10:33
 * Desc:
 */
import tap from 'tap'
// import * as febs from 'febs';
import { FeignClient, RequestMapping, RequestMethod, setFeignClientDefaultCfg } from '..'
import { except_fail, except_success } from './lib'


/**
 * 定义feignClient对象.
 */
@FeignClient({name: 'base'})
class TestController {
  @RequestMapping({path:'/api/xxx', method: RequestMethod.GET})
  async test() {
    // fallback.
    return 'fail';
  }
}

async function test() {
  // initial feignClient.
  setFeignClientDefaultCfg({
    // fetchObj: febs.net.fetch,
    findServiceCallback,
  })

  // call request.
  let bean = new TestController();
  console.log(await bean.test());
}
test().then(() => { });

/**
* @desc:返回指定服务地址.
*/
function findServiceCallback(
  serviceName: string,
  excludeHost: string
): Promise<{
  ip: string
  port: number
}> {
  // use nacos or eureka api to get a host.
  return Promise.resolve({
    ip: '127.0.0.1',
    port: 8080
  });
}