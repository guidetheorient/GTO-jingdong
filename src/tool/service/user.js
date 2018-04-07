/*
 * @Author: guidetheorient 
 * @Date: 2018-04-01 15:12:27 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-07 17:33:46
 */

const _util = require('tool/util/util.js');

let _user = {
  // 返回所在省份
  getLocation(){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '//api.map.baidu.com/location/ip',
        data:{
          ak: 'qhWvmiK2mMqkB88onRbGCfsc4n1oo4iO'
        },
        dataType: 'jsonp',
        success(res){
          if(res.status === 0) {
            resolve(res.content.address_detail.province.slice(0,-1));
          } else {
            reject(new Error('获取不到当前位置'))
          }
        },
        error(msg){
          reject(new Error('获取不到当前位置'))
        }
      })
    })
  },
  login(para, resolve, reject){
    _util.request({
      data: para,
      method: 'POST',
      url: _util.getUrl('/user/login.do'),
      success: resolve,
      error: reject
    })
  },
  checkUsername(para, resolve, reject){
    _util.request({
      data: $.extend(para, {type: 'username'}),
      url: '/user/check_valid.do',
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  register(para, resolve, reject){
    _util.request({
      data: para,
      url: '/user/register.do',
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  getUserInfo(resolve, reject){
    _util.request({
      url: '/user/get_user_info.do',
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  logout(resolve, reject){
    _util.request({
      url: '/user/logout.do',
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
}

module.exports = _user;