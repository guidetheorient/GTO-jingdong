/*
 * @Author: guidetheorient 
 * @Date: 2018-03-31 22:00:47 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-10 12:52:20
 */

// header js&css
require('pages/components/header/index.js');

// header-search-simple js&css
require('pages/components/header-search-simple/index.js');

// simple-footer js&css
require('pages/components/simple-footer/index.js');

// css
require('./index.scss')

// util工具类
const _util = require('tool/util/util.js');
const _user = require('tool/service/user.js');
const _cart = require('tool/service/cart.js');

// 购物车商品列表
//    没有商品，显示空空如也
//    有商品则显示
const tpl = require('./index.ejs');

var cart = {
  data: {
    res: null
  },
  init(){
    this.load();
    this.bind();
  },
  load(){
    let _this = this;
    _cart.getCartList(function(res){
      console.log(res)
      _this.data.res = res;
      $('.cart-wrapper .w').html(_util.renderHtml(tpl, res.data));
      _this.countEqual1($('.minus-plus'))
    },function (errMsg) {
      _util.errorTips(errMsg);
    })
  },
  bind(){
    let _this = this;
    /**
     * 以下和其他页面效果一样，不过都是代理到document上面的，
     * 其他页面是请求回来之后再调用bind 
     */

    // 加减数量
    $(document).on('click', '.count-btn', function (e) {
      let $this = $(this),
          $countEle = $this.siblings('.count'),
          curCount = Number($countEle.text()) || 1,
          maxCount = Number($countEle.data('productStock')),
          minCount = 1,
          newCount = 0,
          productId  = $countEle.data('productid'),
          type = $this.hasClass('minus') ? 'minus' : 'plus';
          
      if(type === 'minus') {
        if(curCount <= minCount) {
          return;
        }
        newCount = curCount - 1;
      } else if(type === 'plus') {
        if(curCount >=200 || curCount >= maxCount) {
          _util.errorTips('数量已达购买上限');
          return
        }
        newCount = curCount + 1;
      }
      _cart.update({
        productId: productId,
        count: newCount
      }, function (res) {
        _this.render(res);
      },
      function (errMsg) {
        console.log(errMsg)
      })
    })
    
    //删除选中的
    $(document).on('click', '.del-selected', function () {
      if(window.confirm('确认要删除选中的商品吗？')) {
        let productIdList = [],
            $productSelected = $('.product-select:checked');
            console.log($productSelected);
        for(let i = 0; i < $productSelected.length; i++) {
          productIdList.push($($productSelected[i]).parents('tr').find('.count').data('productid'))
        }
        if(productIdList.length){
          // 多个商品id，用逗号隔开
          _cart.deleteProduct({
            productIds: productIdList.join(',')
          },function (res) {
            _this.render(res);
          }, function (errMsg) {
            console.log(errMsg)
          })
        } else {
          console.log('没有选中的商品')
        }
      }
    })

    // 选择和取消选中
    $(document).on('click','.product-select-wrapper',function () {
      let $this = $(this),
          $checkbox = $(this).find('input'),
          productId = $(this).parents('tr').find('.count').data('productid');
      if($checkbox.is(':checked')) {
        _cart.selectProduct({
          productId: productId
        },function(res){
          _this.render(res)
        },function (errMsg) {
          _util.errorTips(errMsg)
        })
      } else {
        _cart.unselectProduct({
          productId: productId
        },function (res) {
          _this.render(res)
        },function (errMsg) {
          _util.errorTips(errMsg)
        })
      }
    })

    // 选中全部和取消选中全部
    $(document).on('click', '.select-all', function(){
      let $this = $(this),
          $checkbox = $this.find('input');

      if($checkbox.is(':checked')) {
        _cart.selectAll(function (res) {
          _this.render(res)
        },function(errMsg){
          _util.errorTips(errMsg)
        })
      } else {
        _cart.unselectAll(function (res) {
          _this.render(res)
        },function(errMsg){
          _util.errorTips(errMsg)
        })
      }
    })
    
    // 删除某个商品
    $(document).on('click', '.delete', function(){
      if(window.confirm('确认要删除该商品吗？')){
        let productId = $(this).parents('tr').find('.count').data('productid')
        _cart.deleteProduct({
          productIds: productId
        }, function(res){
          _this.render(res);
        },function (errMsg) {
          _util.errorTips(errMsg);
        })
      }
    });

    // 提交订单
    $(document).on('click', '.checkout', function () {
      if(_this.data.res.data.cartTotalPrice > 0) {
        location.href = './order-confirm.html';
      } else {
        _util.errorTips('还没选商品呢~');
      }
    })
  },
  // 重新渲染购物车列表
  render(res){
    console.log(res)
    this.data.res = res;
    if(res.data.cartProductVoList && res.data.cartProductVoList.length) {
      $('.cart-wrapper .w').html(_util.renderHtml(tpl, res.data))
      this.countEqual1($('.minus-plus'))
    }
  },
  countEqual1($ele){
    let count = Number($ele.find('.count').text());
    if(count === 1) {
      $ele.find('.minus').addClass('disable')
    } else {
      $ele.find('.minus').removeClass('disable')
    }
  }
}

$(function () {
  cart.init();
})