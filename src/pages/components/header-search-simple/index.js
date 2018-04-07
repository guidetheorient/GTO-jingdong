/*
 * @Author: guidetheorient 
 * @Date: 2018-04-04 10:37:32 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-07 12:20:37
 */

require('./index.scss');

const _util = require('tool/util/util.js');

let headerSearchSimple = {
  data:{
    
  },
  init(){
    this.load();
    this.bind();
  },
  load(){
    
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
  }
}

$(function(){
  headerSearchSimple.init();
})