/*
 * @Author: guidetheorient 
 * @Date: 2018-04-07 16:59:13 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-09 17:29:32
 */


const _util = require('tool/util/util.js');
const _user = require('tool/service/user.js');


let _order = {
  // 获取提交的订单商品
  getProductList(resolve, reject) {
    _util.request({
      url: _util.getUrl('/order/get_order_cart_product.do'),
      success: resolve,
      error: reject
    })
  },
  // 提交订单
  createOrder: function (para, resolve, reject) {
    _util.request({
      url: _util.getUrl('/order/create.do'),
      data: para,
      success: resolve,
      error: reject
    })
  },
  // 获取订单列表
  getOrderList: function (para, resolve, reject) {
    _util.request({
      url: _util.getUrl('/order/list.do'),
      data: para,
      success: resolve,
      error: reject
    })
  },
}

module.exports = _order;