/*
 * @Author: guidetheorient 
 * @Date: 2018-03-31 22:00:47 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-10 12:55:18
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

// 1.新增地址 2.修改地址 modal
const modal = require('./modal.js');

var orderConfirm = {
  data: {
    shippingId: ''
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

    // 新增收货地址
    $(document).on('click', '.add-address', function (e) {
      e.preventDefault();
      modal.init({
        type: 'add',
        success: _this.loadAddressList
      });
    })
    // 修改地址
    $(document).on('click', '.edit', function (e) {
      let $this = $(this);
      
      e.preventDefault();
      modal.init({
        type: 'edit',
        $ele: $this.parents('li'),
        success: _this.loadAddressList
      });
    })

    //删除
    $(document).on('click', '.del', function(){
      let $ele = $(this).parents('li');
      let id = $ele.data('id');
      _address.deleteAddress({
        shippingId: id
      },function (res) {
        _util.successTips('地址删除成功');
        _this.loadAddressList();
      },function (errMsg) {
        _util.errorTips(errMsg)
        console.log(errMsg)
      })
    })

    // 提交订单
    $(document).on('click', '.submit-order', function(){
      if(_this.data.shippingId) {
        _order.createOrder({
          shippingId: _this.data.shippingId
        },function (res) {
          console.log(res)
          location.href = `./pay.html?orderNo=${res.data.orderNo}`
        },function (errMsg) {
          _util.errorTips('提交订单失败')
        })
      } else {
        _util.errorTips('还没有选择收货地址')
      }
    })


    // 选中特定收件人
    $(document).on('click', '.address-name', function(){
      let $ele = $(this).parents('li');
      _this.data.shippingId = $ele.data('id');

      $ele.addClass('active').siblings().removeClass('active');

    })
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
      // console.log(res)
      $('.tpl-wrapper').html(_util.renderHtml(productTpl, res.data))
    }, function (errMsg) {
      _util.errorTips(errMsg);
    })
  }
}

$(function () {
  orderConfirm.init();
})