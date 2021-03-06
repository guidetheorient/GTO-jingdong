/*
 * @Author: guidetheorient 
 * @Date: 2018-03-31 22:00:47 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-10 13:09:46
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
const _needDelay = require('tool/util/menu-need-delay.js');


const _user = require('tool/service/user.js');
// // 引入unslider插件
// require('tool/util/unslider/index.js');

var index = {
  data: {

  },
  init(){
    this.load();
    this.bind();
  },
  load(){

  },
  bind(){
    // fs col4 tab组件
    this.$tab = $('.news .tab');
    this.$tabHead = this.$tab.find('.tab-head');
    this.$tabCon = this.$tab.find('.tab-con');
    this.$underline = this.$tab.find('.underline');
    let _this = this;
    this.$tabHead.on('mouseenter', 'span', function(){
      let index = $(this).index();
      _this.$tabCon.children().eq(index).addClass('active').siblings().removeClass('active')
      _this.$underline.css({transform: `translateX(${$(this).outerWidth(true) * index + 'px'})`})
    })
  }
}



// 无延迟菜单
class Menu {
  constructor($ele) {
    this.$ele = $ele;
    this.$menu = $ele.find('.menu');
    this.$sub = $ele.find('.sub');
    // 重置下this.$sub
    this.$sub.children().hide();
    this.$sub.hide();

    this.posList = [];

    this.activeSub = null;

    this.mouseInSub = false;

    this.bind();
  }
  /**1.
   * $ele leave事件
   * 如果有sub显示，就隐藏掉
   * 
   * 2.
   * 2.1
   * $ele item enter事件
   * 如果有activeSub  替换一下  
   *    => debounce 
   *          2.1.1 如果上下移动，快速切换；
   *          2.1.2 如果向sub移动，300ms延迟之后看是否在sub内，在的话就return
   * 2.2
   * 如果之前没有activeMenu 显示对应sub
   */
  bind() {
    let _this = this,
        timer = null;

    //  鼠标移动触发的事件
    let handler = function (e) {
      _this.posList.push({
        x: e.pageX,
        y: e.pageY
      })
      if (_this.posList.length > 3) {
        _this.posList.shift();
      }
    };

    this.$ele
      .on('mouseleave', function () {
        if (_this.activeSub) {
          _this.$sub.children().hide();
        }
        _this.$sub.hide();
        _this.activeSub = null;
        $(document).off('mousemove', handler);
      })
      .on('mouseenter', function () {
        // 移动到menu时，全局加上mousemove监听
        $(document).on('mousemove', handler)
      })
      .on('mouseenter', '.item', function (e) {
        if (!_this.activeSub) {
          _this.activeSub = true;
          _this.$sub.show().find(`#${$(this).data('id')}`).show();
          return;
        }

        let prevPos = _this.posList[_this.posList.length - 2];
        let curPos = _this.posList[_this.posList.length - 1];

        // 是否需要延迟执行
        let delay = _needDelay(curPos, prevPos, _this.$sub);

        // 如果需要延迟执行，首先看timer是否存在，存在就砸掉，重新计时
        if (delay) {
          if (timer) clearTimeout(timer)

          timer = setTimeout(() => {
            // 计时完成后看鼠标是否在sub内，在的话，就不要切换sub的内容了
            if (_this.mouseInSub) {
              return;
            }

            _this.$sub.find(`#${$(this).data('id')}`).show().siblings().hide();
            timer = null;
          }, 300);
        }
        // 不延迟，立即执行
        else {
          _this.$sub.find(`#${$(this).data('id')}`).show().siblings().hide();
        }
      })

    // 监听鼠标是否在sub内
    this.$sub.on('mouseenter', function () {
      _this.mouseInSub = true;
    }).on('mouseleave', function () {
      _this.mouseInSub = false;
    })
  }
}


$(function () {
  // menu组件
  new Menu($('.col1').eq(0));

  // index.html其他load和bind
  index.init();

  // 轮播组件
  $('.col2').eq(0).unslider({
    autoplay: true,
    // animation: 'fade',
    speed: 500,
    delay: 3000,
    dots: true,
    arrows: {
      prev: '<a class="unslider-arrow prev"><i class="fa fa-angle-left"></i></a>',
      next: '<a class="unslider-arrow next"><i class="fa fa-angle-right"></i></a>'
    },
  });
})