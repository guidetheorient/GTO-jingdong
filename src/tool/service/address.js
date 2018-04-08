/*
 * @Author: guidetheorient 
 * @Date: 2018-04-07 16:59:13 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-08 23:11:48
 */


const _util = require('tool/util/util.js');
const _user = require('tool/service/user.js');

let _address = {
  // 获取地址列表
  getAddressList(resolve, reject) {
    _util.request({
      url: _util.getUrl('/shipping/list.do'),
      data:{
        pageSize: 10
      },
      success: resolve,
      error: reject
    })
  },
  // 新增收货地址
  createAddress(para, resolve, reject) {
    _util.request({
      url: _util.getUrl('/shipping/add.do'),
      data: para,
      success: resolve,
      error: reject
    })
  },
  // 更新收货地址
  updateAddress(para, resolve, reject) {
    _util.request({
      url: _util.getUrl('/shipping/update.do'),
      data: para,
      success: resolve,
      error: reject
    })
  },
  // 删除收货地址
  updateAddress(para, resolve, reject) {
    _util.request({
      url: _util.getUrl('/shipping/del.do'),
      data: para,
      success: resolve,
      error: reject
    })
  },
  getSelectedAddress(para, resolve, reject){
    _util.request({
      para: para,
      url: _util.getUrl('/shipping/select.do'),
      success: resolve,
      error: reject
    })
  }
}

module.exports = _address;