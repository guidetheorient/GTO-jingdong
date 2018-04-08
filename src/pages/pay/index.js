/*
 * @Author: guidetheorient 
 * @Date: 2018-03-31 22:00:47 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-08 21:22:39
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
const _user = require('tool/service/user.js');

var cart = {
  data: {
    
  },
  init(){
    this.load();
    this.bind();
  },
  load(){
   
  },
  bind(){
    let _this = this;

  },
  // 重新渲染购物车列表
  render(res){
    
  },
 
}

$(function () {
  cart.init();
})