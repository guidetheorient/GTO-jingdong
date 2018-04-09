/*
 * @Author: guidetheorient 
 * @Date: 2018-04-09 17:31:38 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-09 17:32:51
 */

const _util = require('tool/util/util.js');

let _pay = {
  // 获取支付qr
  getPayQr: function (para, resolve, reject) {
    _util.request({
      url: _util.getUrl('/order/pay.do'),
      data: para,
      success: resolve,
      error: reject
    })
  },
}

module.exports = _pay;