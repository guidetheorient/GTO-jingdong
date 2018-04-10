/*
 * @Author: guidetheorient 
 * @Date: 2018-04-04 10:37:32 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-10 12:04:00
 */

require('./index.scss');

const _util = require('tool/util/util.js');
const _cart = require('tool/service/cart.js');

let headerSearchSimple = {
  data:{
    
  },
  init(){
    this.load();
    this.bind();
  },
  load(){
    let _this = this;
    _cart.getCartList(function (res) {
      _this.renderCart(res.data);
    },function (errMsg) {
      _util.errorTips('header-search-simple 获取不到购物车商品数量')
    })
  },
  bind(){
    this.$search = $('.search');
    this.$ipt = this.$search.find('.ipt');
    this.$searchBtn = this.$search.find('#search-btn');
    let _this = this;
    this.$searchBtn.on('click', function(){
      _this.search();
    })
    this.$ipt.on('keyup',function(e){
      if(e.keyCode === 13) {
        _this.search();
      }
    })
  },
  search(){
    let keyword = this.$ipt.val().trim();
    if(keyword){
      location.href = `./product-search.html?keyword=${keyword}`;
    }
  },
  renderCart(data){
    let $cartLink = $('.cart-link')
    
    if(data.cartProductVoList.length) {
      let count = 0;
      data.cartProductVoList.map(value => {
        count += value.quantity;
      })
      $cartLink.find('.count').text(count)
    } else {
      $cartLink.find('.count').text(0)
    }
  }
}

$(function(){
  headerSearchSimple.init();
})