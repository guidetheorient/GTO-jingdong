/*
 * @Author: guidetheorient 
 * @Date: 2018-04-06 17:37:46 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-07 13:04:29
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

const _pagination = require('tool/util/pagination/index.js');

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
    let _this = this;
    this.data.keyword = this.data.para.keyword;
    if(this.data.keyword){
      this.data.para.categoryId ? delete this.data.para.keyword : delete this.data.para.categoryId;
      
      _product.getList(this.data.para ,function(res){
        console.log(res)
        // 渲染商品列表
        $('.list>ul').html(_util.renderHtml(tpl, res.data.list));
        _this.bindDetail();

        // 搜索关键词
        $('.crumb-wrapper .keyword').text(_this.data.keyword);
        // 搜索结果数量
        $('.filter .count').text(res.data.total);
        _this.loadPagination({
          // 是否有前一页
          hasPreviousPage: res.data.hasPreviousPage,
          // 是否有后一页
          hasNextPage: res.data.hasNextPage,
          // 共有几页
          pages: res.data.pages,
          // 当前是第几页
          pageNum: res.data.pageNum,
          // 
          isFirstPage: res.data.isFirstPage,
          //
          isLastPage: res.data.isLastPage
        })
      },function(errMsg){
        
      })
    }
  },
  bind(){
    
  },
  // 加载分页插件
  loadPagination(para){
    if(!this.pagination) {
      this.pagination = new _pagination()
      this.bindEventAfterPagination()
    }
    this.pagination.render($.extend({}, para, {
      $container: $('.pagination>ul'),
    }))
  },
  bindEventAfterPagination(){
    let _this = this;
    let $defaultBtn = $('#default');
    let $priceBtn = $('#price');
    
    $defaultBtn.on('click', function(e){
      let $this = $(this);
      
      if($this.hasClass('active')){
        return
      } else {
        _this.data.para.orderBy = '';
        _this.load();
        $this.addClass('active').siblings().removeClass('active')
      }
    })
    $priceBtn.on('click', function(e){
      let $this = $(this);
      
      // 如果没有active
      if(!$this.hasClass('active')) {
        _this.data.para.orderBy = 'price_asc';
        _this.load();
        $this.addClass('active asc').siblings().removeClass('active')
      }
      // 如果是是升序 asc
      else if($this.hasClass('asc')){
        _this.data.para.orderBy = 'price_desc';
        _this.load();
        $this.removeClass('asc').addClass('desc').siblings().removeClass('active');
      } else if($this.hasClass('desc')) {
        _this.data.para.orderBy = 'price_asc';
        _this.load();
        $this.removeClass('desc').addClass('asc').siblings().removeClass('active');
      }
      
    })

    let $pagination = $('.pagination>ul');
    $pagination.on('click', 'li', function(e){
      let $this = $(this);
      // 如果点击的是当前页，return
      if($this.hasClass('active')){
        return;
      } 
      // 点击前一页，并且前一页没有disable
      else if($this.hasClass('pre-page') && !$this.hasClass('disable')){
        _this.data.para.pageNum  -= 1;
        _this.load();
      } 
      // 点击下一页，并且下一页没有disable
      else if($this.hasClass('next-page') && !$this.hasClass('disable')){
        _this.data.para.pageNum += 1;
        _this.load();
      } 
      // 点击的是页码按钮
      else {
        _this.data.para.pageNum = $this.index();
        _this.load();
        $(this).addClass('active').siblings('.item').removeClass('active');
      }
    })
  },
  bindDetail(){
    let _this = this;
    let $list = $('.list>ul');
    $list.on('click', 'li', function(e){
      let id = $(this).data('id');
      if(id) {
        location.href = `./product-detail.html?productId=${id}`;
      }
    })
  }
}

$(function(){
  productSearch.init();
})