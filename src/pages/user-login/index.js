/*
 * @Author: guidetheorient 
 * @Date: 2018-04-01 18:24:44 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-10 12:34:55
 */

require('./index.scss');

require('../components/simple-footer/index.js');

const _util = require('tool/util/util.js');
const _user = require('tool/service/user.js');

let userLogin = {
  data: {
    redirect: _util.getUrlQuery('redirect')
  },
  init() {
    this.load();
    this.bind();
  },
  load() {

  },
  bind() {
    let _this = this;
    // 扫码登录/账户登录切换
    this.$loginHeader = $('.login-wrapper .header');
    this.$loginHeader.on('click', '.item', e => {
      this.$loginHeader.children().removeClass('active');
      $(e.target).addClass('active');
    })

    // input如有值，显示清空按钮
    // 点击清空按钮，清除input框
    this.$emptyInput = $('.empty');
    this.$inputWrapper = $('.input-wrapper');
    this.$inputWrapper.find('input').on('input', function(){
      if($(this).val().trim()) $(this).siblings('.empty').show();
    })
    this.$emptyInput.on('click', function(){
      $(this).hide().siblings('input').val('');
    })

    this.$loginBtn = $('.login-btn');
    this.$loginBtn.on('click', function(){
      let formData = {
        username: $('#user').val().trim(),
        password: $('#password').val().trim()
      }

      let result = _this.validate(formData);
      if(result.status) {
        _user.login(formData, function(res){
          location.href = _this.data.redirect;
          console.log(res)
        }, function(errMsg){
          _this.errorMsg(errMsg)
          console.log(errMsg)
        })
      } else {

      }
    })
  },
  // 判断账户，密码是否符合预期
  
  validate(formData){
    let result = {
      status: false,
      msg: ''
    }

    if(!_util.isRequired(formData.username) && !_util.isRequired(formData.password)){
      result.msg = '请输入账户名和密码';
      return result;
    } else if(!_util.isRequired(formData.username)) {
      result.msg = '请输入账户名';
      return result;
    } else if(!_util.isRequired(formData.password)) {
      result.msg = '请输入密码';
      return result;
    } else if(formData.password < 8) {
      result.msg = '密码不正确';
      return result;
    }

    result.status = true;
    return result;
  },
  errorMsg(msg){
    this.$msgWrapper = $('.msg-wrapper');
    this.$msgWrapper.removeClass('hide').find('.error-msg').text(msg)
  }
}

$(function () {
  userLogin.init();
})