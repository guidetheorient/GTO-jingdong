/*
 * @Author: guidetheorient 
 * @Date: 2018-03-31 22:00:47 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-04 20:48:44
 */

// header js&css
require('pages/components/header/index.js');

// header-search js&css
require('pages/components/header-search/index.js');

// css
require('./index.scss')

// util工具类
const _util = require('tool/util/util.js');
const _needDelay = require('tool/util/menu-need-delay.js');

class Menu {
  constructor($ele) {
    this.$ele = $ele;
    this.$menu = $ele.find('.menu');
    this.$sub = $ele.find('.sub');

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

    //  鼠标移动触发事件
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
          _this.activeSub = null;
          _this.$sub.hide().children().hide();
        }

        $(document).off('mousemove', handler);
      })
      .on('mouseenter', function () {
        // 移动到menu时，全局加上mousemove监听
        $(document).on('mousemove', handler)
      })
      .on('mouseenter', '.item', function (e) {
        if (!_this.activeSub) {
          _this.$sub.show().find(`#${$(this).data('id')}`).show();
          _this.activeSub = true;
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
  new Menu($('.col1').eq(0))
})