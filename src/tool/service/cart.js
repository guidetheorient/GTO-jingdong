/*
 * @Author: guidetheorient 
 * @Date: 2018-04-07 16:59:13 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-08 16:30:20
 */


const _util = require('tool/util/util.js');
const _user = require('tool/service/user.js');


let _cart = {
  addToCart(para, resolve, reject){
    _util.request({
      data: para,
      url: _util.getUrl('/cart/add.do'),
      success: resolve,
      error: reject
    })
  },
  getCartList(resolve, reject){
    _util.request({
      url: _util.getUrl('/cart/list.do'),
      success: resolve,
      error: reject
    })
  },
  update(para, resolve, reject){
    _util.request({
      data: para,
      url: _util.getUrl('/cart/update.do'),
      success: resolve,
      error: reject
    })
  },
  deleteProduct(para, resolve, reject){
    _util.request({
      data: para,
      url: _util.getUrl('/cart/delete_product.do'),
      success: resolve,
      error: reject
    })
  },
  // 选中某个
  selectProduct(para, resolve, reject){
    _util.request({
      data: para,
      url: _util.getUrl('/cart/select.do'),
      success: resolve,
      error: reject
    })
  },
  // 取消选中某个
  unselectProduct(para, resolve, reject){
    _util.request({
      data: para,
      url: _util.getUrl('/cart/un_select.do'),
      success: resolve,
      error: reject
    })
  },
  // 选中所有
  selectAll(resolve, reject){
    _util.request({
      url: _util.getUrl('/cart/select_all.do'),
      success: resolve,
      error: reject
    })
  },
  // 取消选中所有
  unselectAll(resolve, reject){
    _util.request({
      url: _util.getUrl('/cart/un_select_all.do'),
      success: resolve,
      error: reject
    })
  },
}

module.exports = _cart;

