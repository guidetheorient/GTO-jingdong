/*
 * @Author: guidetheorient 
 * @Date: 2018-03-31 22:00:47 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-09 18:09:20
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
const _pay = require('tool/service/pay.js');

var pay = {
  data: {
    
  },
  init(){
    this.$orderNo = $('.order-no');
    this.$qrImg = $('.qr-code');
    
    this.load();
  },
  load(){
    let _this = this;
    this.data.orderNo = _util.getUrlQuery('orderNo');
   _pay.getPayQr({
     orderNo: this.data.orderNo
   },function (res) {
     console.log(res)
      _this.$orderNo.text(res.data.orderNo);
      console.log(res.data.qrUrl)
      _this.$qrImg.attr('src', res.data.qrUrl);
    },function (errMsg) {
     _util.errorTips(errMsg)
   })
  },
}

$(function () {
  pay.init();
})