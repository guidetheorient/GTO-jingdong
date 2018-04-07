/*
 * @Author: guidetheorient 
 * @Date: 2018-03-31 22:03:20 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-07 17:49:06
 */

require('./index.scss');

const _util = require('tool/util/util.js');
const _user = require('tool/service/user.js');

let tpl = require('./index.ejs');



let header = {
  data: {
    provinceList: ['北京','上海','天津','重庆','河北','山西','河南','辽宁','吉林','黑龙江','内蒙古','江苏','山东','安徽','浙江','福建','湖北','湖南','广东','广西','江西','四川','海南','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆','港澳','台湾','钓鱼岛','海外'],
    province: ''
  },
  // 初始化组件
  init(){
    this.load();
    this.bind();
  },
  // 初始化组件数据
  load(){
    this.$locationWrapper = $('.location-wrapper');
    this.$locationWrapper.find('.location-list').html(_util.renderHtml(tpl, this.data.provinceList));

    _user.getUserInfo(function(res){
      let name = res.data.username,
          $headerUserWrapper = $('#header-user-wrapper'),
          $welWrapper = $('#welcome-wrapper');
      $headerUserWrapper.html(`<a href="./user-center.html" class="link">${name}</a>`);

      if($welWrapper.length){
        let $logoutBtn = $('<a href="#" class="btn" id="logout">退出</aa>');
        $logoutBtn.on('click', function(e){
          e.preventDefault();
          _user.logout(function(res){
            location.reload();
          },function(){
          })
        })
        $welWrapper.html(`<p class="wel-text">Hi, <a href="#">${name}</a></p>`).append($logoutBtn);
      }
      
    },function(errMsg){
      // nothing  
    })
  },
  // 绑定事件
  bind(){
    // 获取url省份
    let province = _util.getUrlQuery('location');
    // 如果有省份，就跳转到指定省份首页
    if(province) {
      this.renderLocation(province);
    } 
    // 如果没有，就IP定位省份
    else {
      let getLocation = _user.getLocation();
      getLocation.then(province => {
        this.renderLocation(province);
      })
    }
    
    // 选中省份，跳转到省份定制首页
    this.$locationWrapper.find('.location-list').on('click', '.text', function(e){
      e.preventDefault();
      let province = $(this).text().trim();
      location.href = `./index.html?location=${province}`
    })
  },
  // 传入省份，更改头部省份信息
  renderLocation(province){
    this.data.province = province;
    let index = this.data.provinceList.indexOf(this.data.province);
    if( index !== -1){
      this.$locationWrapper.find('.cur-location').text(this.data.province);
      this.$locationWrapper.find('.location-list .item').eq(index).addClass('active');
    }
  }
}

$(function(){
  header.init();
})