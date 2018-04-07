/*
 * @Author: guidetheorient 
 * @Date: 2018-04-07 10:38:19 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-07 12:31:37
 */


const _util = require('tool/util/util.js');

let tpl = require('./index.ejs');



class pagination {
  constructor(){

  }

  /**
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
  // container
  $container: $(".pagination>ul")
   */
  render(para){
    if(!para.pages){
      return;
    } else {
      let html = _util.renderHtml(tpl, {
        hasPreviousPage: para.hasPreviousPage,
        hasNextPage: para.hasNextPage,
        curPage: para.pageNum,
        pages: para.pages
      })
      para.$container.html(html)
    }
  }
}

module.exports = pagination;