/*
 * @Author: guidetheorient 
 * @Date: 2018-04-07 13:03:11 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-08 14:35:43
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

const tpl = require('./index.ejs');

const _cart = require('tool/service/cart.js');

let productDetail = {
  data: {
    para: {
      productId: 0,
      orderNum: 1
    }
  },
  init() {
    this.load();
  },
  load() {
    let _this = this;
    this.data.para.productId = _util.getUrlQuery('productId');
    this.$keyword = $('.crumb-wrapper .keyword');
    this.$productInfo = $('.product-intro');


    _product.getDetail({
      productId: this.data.para.productId
    }, function (res) {
      console.log(res)
      $('.product-detail').html(_util.renderHtml(tpl, res.data));

      _this.bind(res);
    }, function (errMsg) {
      $('.product-detail').html(errMsg)
    })
  },
  bind(res) {
    this.data.stock = res.stock;

    let _this = this;
    // hover小图改变预览图
    let $imgList = $('.img-list');
    let $mainImg = $('.main-img img');
    $imgList.on('mouseenter', 'li', function () {
      $(this).addClass('active').siblings().removeClass('active');
      $mainImg.prop('src', $(this).find('img').prop('src'));
    })

    // 加减数量
    let $order = $('.order-wrapper .order');
    let $orderNum = $order.find('.order-num');
    let $plusBtn = $order.find('.plus');
    let $minusBtn = $order.find('.minus');
    this.data.para.orderNum = Number($orderNum.text().trim());
    // 如果数量为1,减的按钮失效
    if (this.data.para.orderNum === 1) {
      $minusBtn.addClass('disable')
    }
    $minusBtn.on('click', function () {
      _this.data.para.orderNum -= 1;
      if (_this.data.para.orderNum < 1) {
        return;
      }
      if (_this.data.para.orderNum === 1) {
        $minusBtn.addClass('disable')
      }
      $orderNum.text(_this.data.para.orderNum);

    })
    $plusBtn.on('click', function () {
      _this.data.para.orderNum += 1;
      if (_this.data.para.orderNum > 1) {
        $minusBtn.removeClass('disable')
      }
      if (_this.data.para.orderNum > 20) {
        console.log('此商品每账号最多购买20件')
        return;
      }
      if (_this.data.para.orderNum > _this.data.stock) {
        console.log('超过库存量')
        return;
      }
      $orderNum.text(_this.data.para.orderNum);
    })
    console.log(res)
    // 加入购物车
    let $addToCartBtn = $('.add-to-cart');
    $addToCartBtn.on('click', function () {
      _cart.addToCart({
        productId: _this.data.para.productId,
        count: _this.data.para.orderNum
      },function (res) {
        alert(res)
        _util.saveToLocal({
          imgPath: res.data.imageHost + res.data.mainImage,
          name: res.data.name,
          count: _this.data.para.orderNum
        }, 'order-info')
        console.log(res)
        location.href = './tip.html?type=add-to-cart';
      },function(errMsg){
        alert(1)
        // 接口坏了，暂时模拟下成功的样式，跳转到tip.html提示页，提示成功加入购物车
        _util.saveToLocal({
          imgPath: res.data.imageHost + res.data.mainImage,
          name: res.data.name,
          count: _this.data.para.orderNum
        }, 'order-info')
        location.href = './tip.html?type=add-to-cart';
        // _util.errorTips(errMsg);
      })
    })
  },

}

$(function () {
  productDetail.init();
})