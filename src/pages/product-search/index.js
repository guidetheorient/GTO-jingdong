/*
 * @Author: guidetheorient 
 * @Date: 2018-04-06 17:37:46 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-06 22:54:43
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

let productSearch = {
  data:{
    para: {
      categoryId: _util.getUrlQuery('categoryId') || '',
      keyword: _util.getUrlQuery('keyword') || '',
      pageNum: _util.getUrlQuery('pageNum') || 1,
      pageSize: _util.getUrlQuery('pageSize') || 10,
      orderBy: _util.getUrlQuery('keyword') || ''
    }
  },
  init(){
    this.load();
    this.bind();
  },
  load(){
    this.data.keyword = this.data.para.keyword;
    if(this.data.keyword){
      this.data.para.categoryId ? delete this.data.para.keyword : delete this.data.para.categoryId;
      
      _product.getList(this.data.para ,function(res){
        console.log(res)
        $('.list>ul').html(_util.renderHtml(tpl, res.data.list));

      },function(errMsg){
        
      })
    }
  },
  bind(){
    
  }
}

$(function(){
  productSearch.init();
})