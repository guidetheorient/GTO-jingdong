/*
 * @Author: guidetheorient 
 * @Date: 2018-04-06 22:04:56 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-06 22:07:03
 */

const _util = require('tool/util/util.js');

let _product = {
  getList(para, resolve, reject){
    _util.request({
      data: para,
      method: 'POST',
      url: _util.getUrl('/product/list.do'),
      success: resolve,
      error: reject
    })
  }
}

module.exports = _product;