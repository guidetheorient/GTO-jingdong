/*
 * @Author: guidetheorient 
 * @Date: 2018-04-07 16:59:13 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-07 17:49:36
 */


const _util = require('tool/util/util.js');

let _cart = {
  addToCart(para, resolve, reject){
    console.log(para)
    _util.request({
      data: para,
      method: 'POST',
      url: _util.getUrl('/cart/add.do'),
      success: resolve,
      error: reject
    })
  }
}

module.exports = _cart;