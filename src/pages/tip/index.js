/*
 * @Author: guidetheorient 
 * @Date: 2018-04-07 13:03:11 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-08 12:30:24
 */


// header js&css
require('pages/components/header/index.js');

// header-search js&css
require('pages/components/header-search-simple/index.js');

// simple-footer js&css
require('pages/components/simple-footer/index.js');

// css
require('./index.scss')

// util工具类
const _util = require('tool/util/util.js');
// const _needDelay = require('tool/util/menu-need-delay.js');


const _product = require('tool/service/product.js');

let productDetail = {
  data: {
    type: _util.getUrlQuery('type') || ''
  },
  init() {
    this.load();
    this.bind();
  },
  load(){
    if(this.data.type === 'add-to-cart'){
      let productData = _util.loadFromLocal('order-info');
      let $addToCartSuccess = $('.add-to-cart-success');
      $addToCartSuccess.find('.product img').attr('src', productData.imgPath);
      $addToCartSuccess.find('.product-info .name').text(productData.name);
      $addToCartSuccess.find('.product-info .count').text(productData.count);
      $addToCartSuccess.show().siblings().hide();
    }
  },
  bind() {
  }
}

$(function () {
  productDetail.init();
})