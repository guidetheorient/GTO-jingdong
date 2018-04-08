/*
 * @Author: guidetheorient 
 * @Date: 2018-03-31 22:00:47 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-08 23:22:33
 */

// header js&css
require('pages/components/header/index.js');

// header-search js&css
require('pages/components/header-search/index.js');

// simple-footer js&css
require('pages/components/simple-footer/index.js');

// css
require('./index.scss')

// util工具类
const _util = require('tool/util/util.js');
const _order = require('tool/service/order.js');
const _address = require('tool/service/address.js');

const addressTpl = require('./address-list.ejs');
const productTpl = require('./product-list.ejs');

var orderConfirm = {
  data: {

  },
  init() {
    this.load();
    this.bind();
  },
  load() {
    this.loadAddressList();
    this.loadProductList()
  },
  bind() {
    let _this = this;

  },

  // 加载地址列表
  loadAddressList() {
    _address.getAddressList(function (res) {
      console.log(res)
      $('.address-list').html(_util.renderHtml(addressTpl, res.data))
    }, function (errMsg) {
      _util.errorTips(errMsg);
    })
  },
  // 加载订单商品列表
  loadProductList() {
    _order.getProductList(function (res) {
      console.log(res)
      $('.tpl-wrapper').html(_util.renderHtml(productTpl, res.data))
    }, function (errMsg) {
      _util.errorTips(errMsg);
    })
  }
}

$(function () {
  orderConfirm.init();
})