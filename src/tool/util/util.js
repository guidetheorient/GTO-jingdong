/*
 * @Author: guidetheorient 
 * @Date: 2018-03-31 16:22:05 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-09 16:31:18
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
  },
  /***
   * localData要存的数据 
   * keyName存储为localStorage键名
   */
  saveToLocal(localData, keyName) {
    var oldData = localStorage.getItem(keyName);
    if(!oldData && typeof localData === 'string') {
      oldData = [];
      oldData.push(localData);
    } else if(oldData && typeof localData === 'string') {
      oldData = JSON.parse(oldData);
      if(oldData.indexOf(localData) === -1){
        oldData.push(localData);
      }
    } else {
      console.log(localData,keyName)
      oldData = {};
      for(let key in localData) {
        oldData[key] = localData[key];
      }
    }

    localStorage.setItem(keyName, JSON.stringify(oldData));
    // console.log(localStorage.getItem(keyName))
  },
    /***
   * keyName要取的localStorage键名
   */
  loadFromLocal(keyName){
    var localData = localStorage.getItem(keyName);
    if(localData) {
      return JSON.parse(localData);
    }
    return false;
  },

  removeFromLocal(localData, keyName){
    var oldData = localStorage.getItem(keyName);
    if(oldData && typeof localData === 'string') {
      oldData = JSON.parse(oldData);
      if(Array.isArray(oldData)) {
        oldData = oldData.filter(value => value !== localData);
        localStorage.setItem(keyName,JSON.stringify(oldData));
      }
    }    
  },
}
module.exports = _tool;