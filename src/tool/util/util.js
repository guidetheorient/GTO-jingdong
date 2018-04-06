/*
 * @Author: guidetheorient 
 * @Date: 2018-03-31 16:22:05 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-06 16:55:51
 */

const ejs = require('node_modules/ejs/ejs.min.js');

// http://www.xxx.com
const host = '';

let _tool = {
  request(para){
    $.ajax({
      method: para.method || 'GET',
      url: para.url || '',
      dataType: para.dataType || 'json',
      data: para.data || '',
      success: (res)=>{
        // console.log(res);
        // 请求成功
        if(res.status === 0){
          typeof para.success === 'function' && para.success(res);
        }
        // 未登录
        else if(res.status === 10) {
          this.login();
        } 
        // 请求信息错误
        else if(res.status === 1){
          typeof para.error === 'function' && para.error(res.msg);
        } else {
          return res
        }
      },
      error(err){
        typeof para.error === 'function' && para.error(err.statusText);
      }
    })
  },
  getUrl(path){
    return host + path;
  },
  // 跳转至登录页
  login(){
    location = `./user-login.html?redirect=${encodeURIComponent(location.href)}`;
  },
  goHome(){
    location = './index.html';
  },
  getUrlQuery(key){
    let url = location.search.substr(1);
    let reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);

    return url.match(reg) ? decodeURIComponent(url.match(reg)[2]) : null;
  },
  isPhoneNumber(value){
    let reg = /^1[34578]\d{9}$/;

    return reg.test(value);
  },
  isEmail(value){
    let reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
 
    return reg.test(value);
  },
  isRequired(value){
    if(value.trim()) return true
    return false
  },
  successTips(msg){
    alert(msg || '操作成功')
  },
  errorTips(msg){
    alert(msg || '操作失败')
  },
  renderHtml(tpl, data){
    return ejs.render(tpl, {data: data});
  }
}
module.exports = _tool;