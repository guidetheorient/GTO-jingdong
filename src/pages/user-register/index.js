/*
 * @Author: guidetheorient 
 * @Date: 2018-04-03 05:38:46 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-06 13:44:43
 */

require('./index.scss');

require('../components/simple-footer/index.js');


const _util = require('tool/util/util.js');
const _user = require('tool/service/user.js');


let register = {
  data: {
    formData: {
      username: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      question: '',
      answer: ''
    },
    usernameErrorInfo: {
      numberError: '用户名不能为纯数字，请重新输入',
      lengthError: '长度只能在4-20个字符之间'
    },
    passwordInfo: {
      lengthError: '长度只能在6-20个字符之间',
      securityWaring: '密码强度低，有被盗风险',
      securityInfo: '你的密码很安全'
    },
    passwordConfirmErrorInfo: {
      notSameError: '两次输入的密码不一致'
    },
    phoneErrorInfo: {
      error: '不是有效的手机号'
    },
    emailErrorInfo: {
      error: '不是正确的邮箱地址'
    },
    questionErrorInfo: {
      error: '忘记填密保问题了'
    },
    questionErrorInfo: {
      error: '忘记填密保答案了'
    }
  },
  init() {
    this.load();
    this.bind();
  },
  load() {

  },
  bind() {
    let _this = this;

    this.$form = $('.form');
    this.$formItem = this.$form.find('.form-item');
    this.$tipWrapper = this.$form.find('.tip-wrapper');

    // 每个input框focus时显示提示信息，blur时取消显示
    this.$form.find('.ipt')
      .on('focus', function () {
        let $tipWrapper = $(this).parent().next('.tip-wrapper')

        if ($tipWrapper.hasClass('show')) {

        } else {
          $tipWrapper.addClass('show').find('.tip').text($tipWrapper.find('.tip').data('default'));
        }
        $(this).siblings('.status-icon').hide();
      })
      .on('blur', function () {
        $(this).parent().next('.tip-wrapper').removeClass('show');
      })

    this.checkUsername($('#username'));
    this.checkPassword($('#password'));
    this.checkPasswordConfirm($('#password-confirm'));
    this.checkPhoneNum($('#phone'));
    this.checkEmail($('#email'));
    this.checkQuestion($('#question'));
    this.checkAnswer($('#answer'));

    this.$submitBtn = $('.submit-btn');
    let timer;
    this.$submitBtn.on('click', function(e){
      e.preventDefault();
      timer = setTimeout(() => {
        let data = {
          username: $('#username').val().trim(),
          password: $('#password').val().trim(),
          passwordConfirm: $('#password-confirm').val().trim(),
          phone: $('#phone').val().trim(),
          email: $('#email').val().trim(),
          question: $('#question').val().trim(),
          answer: $('#answer').val().trim()
        }; 
        if(_this.isValidUsername(data.username) &&
           _this.isValidPassword(data.password) &&
           _this.isSamePassword(data.password, data.passwordConfirm) &&
           _this.isValidPhone(data.phone) &&
           _this.isValidEmail(data.email) &&
           _this.isValidQuestion(data.question) &&
           _this.isValidAnswer(data.answer)
        ){
          _user.register(data,
          function (res) {
            alert(res.msg);
            location.href = './index.html';
          },function(errMsg){
            alert(errMsg);
          })
        }
      })  
    })
  },
  // 用户名验证
  checkUsername($ele) {
    let _this = this;

    // input完成包围框
    let $formItem = $ele.parent();
    // 信息提示icon
    let $statusIcon = $formItem.find('.status-icon');
    // 显示信息的tip-wrapper
    let $tipWrapper = $ele.parent().next('.tip-wrapper');
    // tip
    let $tip = $tipWrapper.find('.tip');

    $ele.on('blur', function () {
      let username = $ele.val().trim();

      // 本地验证用户名是否合法
      let result = _this.isValidUsername(username);
      /**
       * ————当输入框为空时，重置样式
       * 1. 本地验证出错导致form-item border变色
       * 2. 本地验证出错导致tip文字变色
       * 3. 远程验证成功或出错导致status-icon显示
       * 4. 远程验证出错导致tip显示出来
       * 5. tip验证信息跟随错误显示不同信息
       */
      if (!username) {
        $formItem.removeClass('danger');
        $statusIcon.hide();
        $tip.text($tip.data('default'));
        $tipWrapper.removeClass('danger').removeClass('show');
        return;
      }
      /**
       * ————当输入框本地弱验证失败时
       * 1. 本地验证出错导致form-item border变色
       * 2. 本地验证出错导致tip文字变色并显示不同信息
       */
      else if (!result.status) {
        $formItem.addClass('danger')
        $tipWrapper.addClass('danger show').find('.tip').text(result.msg);
        return false;
      }
      /**
       * ————本地验证OK，进行远程验证
       */
      else if (result.status) {
        _user.checkUsername({
          str: username,
        }, function (res) {
          // 用户名合法
          // 重置样式，添加正确样式，并显示
          $formItem.removeClass('danger');
          $statusIcon.removeClass('wrong').addClass('ok').show();
          $tipWrapper.removeClass('show danger');
        }, function (errMsg) {
          // 用户名不合法
          // 重置样式，添加错误样式，并显示
          $formItem.removeClass('danger');
          $statusIcon.removeClass('ok').addClass('wrong').show();
          $tipWrapper.removeClass('danger').addClass('show').find('.tip').text(errMsg);
        })
      }
    })
  },
  checkPassword($ele) {
    let _this = this;
    // input完成包围框
    let $formItem = $ele.parent();
    // 信息提示icon
    let $statusIcon = $formItem.find('.status-icon');
    // 显示信息的tip-wrapper
    let $tipWrapper = $ele.parent().next('.tip-wrapper');
    // tip
    let $tip = $tipWrapper.find('.tip');

    /**
     * 密码框blur判定两种情况
     * 1. 若为空，去掉所有提示
     * 2. 若有输入值，进行校验
     *        2.1 result.status失败，form-item border及tip color变色
     *        2.2 result.status成功，显示status-icon及密码强度信息
     */
    $ele.on('blur', function () {
      let password = $ele.val().trim();
      // 本地验证密码是否合法
      let result = _this.isValidPassword(password);
      /**
       * ————当输入框为空时，重置样式
       * 1. 本地验证出错导致form-item border变色
       * 2. 本地验证出错导致tip文字变色
       * 3. 远程验证成功或出错导致status-icon显示
       * 4. 远程验证出错导致tip显示出来
       * 5. tip验证信息跟随错误显示不同信息
       */
      if (!password) {
        $formItem.removeClass('danger');
        $statusIcon.hide();
        $tip.text($tip.data('default'));
        $tipWrapper.removeClass('danger').removeClass('show');
        return;
      }
      /**
       * ————当输入框本地弱验证失败时
       * 1. 本地验证出错导致form-item border变色
       * 2. 本地验证出错导致tip文字变色并显示不同信息
       */
      else if (!result.status) {
        $formItem.addClass('danger')
        $tipWrapper.addClass('danger show').find('.tip').text(result.msg);
        return false;
      } else if (result.status) {
        $tip.text(result.msg);
        $formItem.removeClass('danger');
        $statusIcon.removeClass('wrong').addClass('ok').show();
        $tipWrapper.removeClass('danger').addClass('show');
      }
    }).on('input', function () {
      let password = $ele.val().trim();
      // 本地验证密码是否合法
      let result = _this.isValidPassword(password);

      let $passwordConfirm = $('#password-confirm');
      let $passwordConfirmStatusIcon = $passwordConfirm.siblings('.status-icon');
      let password2 = $passwordConfirm.val().trim();
      if (password2) $passwordConfirm.trigger('blur')

      /**
       * ————当输入框为空时，重置样式
       * 1. 本地验证出错导致form-item border变色
       * 2. 本地验证出错导致tip文字变色
       * 3. 远程验证成功或出错导致status-icon显示
       * 4. 远程验证出错导致tip显示出来
       * 5. tip验证信息跟随错误显示不同信息
       */
      if (!password) {
        $formItem.removeClass('danger');
        $statusIcon.hide();
        $tip.text($tip.data('default'));
        $tipWrapper.removeClass('danger').removeClass('show');
        return;
      }
      /**
       * ————本地验证OK
       */
      else if (result.status) {
        // 重置样式，添加正确样式，并显示
        // 密码强度不够
        $tip.text(result.msg);
        $formItem.removeClass('danger');
        $statusIcon.removeClass('wrong').addClass('ok').show();
        $tipWrapper.removeClass('danger').addClass('show');
        return
      } else {
        $tip.text($tip.data('default'));
        $formItem.removeClass('danger');
        $statusIcon.removeClass('ok').addClass('wrong').show();
        $tipWrapper.removeClass('danger').addClass('show');
      }
    })
  },
  checkPasswordConfirm($ele) {
    let _this = this;
    let $formItem = $ele.parent();
    let $statusIcon = $formItem.find('.status-icon');
    // 显示信息的tip-wrapper
    let $tipWrapper = $ele.parent().next('.tip-wrapper');
    // tip
    let $tip = $tipWrapper.find('.tip');
    $ele.on('blur', function () {
      let password1 = $('#password').val().trim();
      let password2 = $ele.val().trim();

      if (!password2) {
        $formItem.removeClass('danger');
        $statusIcon.hide();
        $tip.text($tip.data('default'));
        $tipWrapper.removeClass('danger').removeClass('show');
        return;
      }
      if (password1 === password2) {
        $formItem.removeClass('danger');
        $statusIcon.addClass('ok').show();
        $tipWrapper.removeClass('danger show')
      } else {
        $formItem.addClass('danger');
        $statusIcon.removeClass('ok').hide();
        $tip.text(_this.data.passwordConfirmErrorInfo.notSameError);
        $tipWrapper.addClass('danger show')
      }
    })
  },
  checkPhoneNum($ele) {
    let _this = this;

    // input完成包围框
    let $formItem = $ele.parent();
    // 信息提示icon
    let $statusIcon = $formItem.find('.status-icon');
    // 显示信息的tip-wrapper
    let $tipWrapper = $ele.parent().next('.tip-wrapper');
    // tip
    let $tip = $tipWrapper.find('.tip');

    $ele.on('blur', function () {
      let phone = $ele.val().trim()
      if (!phone) {
        $formItem.removeClass('danger');
        $tipWrapper.removeClass('danger show');
        $statusIcon.removeClass('ok').hide();
        $tip.text($tip.data('default'));
        return;
      }
      let result = _this.isValidPhone(phone);
      if (result.status) {
        $formItem.removeClass('danger');
        $statusIcon.addClass('ok').show();
        $tipWrapper.removeClass('danger show');
      } else if (!result.status) {
        $formItem.addClass('danger');
        $statusIcon.removeClass('ok').hide();
        $tip.text(result.msg);
        $tipWrapper.addClass('danger show')
      }
    })
  },
  checkEmail($ele) {
    let _this = this;

    // input完成包围框
    let $formItem = $ele.parent();
    // 信息提示icon
    let $statusIcon = $formItem.find('.status-icon');
    // 显示信息的tip-wrapper
    let $tipWrapper = $ele.parent().next('.tip-wrapper');
    // tip
    let $tip = $tipWrapper.find('.tip');

    $ele.on('blur', function () {
      let email = $ele.val().trim()
      if (!email) {
        $formItem.removeClass('danger');
        $tipWrapper.removeClass('danger show');
        $statusIcon.removeClass('ok').hide();
        $tip.text($tip.data('default'));
        return;
      }
      let result = _this.isValidEmail(email);
      if (result.status) {
        $formItem.removeClass('danger');
        $statusIcon.addClass('ok').show();
        $tipWrapper.removeClass('danger show');
      } else if (!result.status) {
        $formItem.addClass('danger');
        $statusIcon.removeClass('ok').hide();
        $tip.text(result.msg);
        $tipWrapper.addClass('danger show')
      }
    })
  },
  checkQuestion($ele) {
    let _this = this;

    // input完成包围框
    let $formItem = $ele.parent();
    // 信息提示icon
    let $statusIcon = $formItem.find('.status-icon');
    // 显示信息的tip-wrapper
    let $tipWrapper = $ele.parent().next('.tip-wrapper');
    // tip
    let $tip = $tipWrapper.find('.tip');

    $ele.on('blur', function () {
      let question = $ele.val().trim()
      if (!question) {
        $formItem.removeClass('danger');
        $tipWrapper.removeClass('danger show');
        $statusIcon.removeClass('ok').hide();
        $tip.text($tip.data('default'));
        return;
      }
      let result = _this.isValidQuestion(question);
      if (result.status) {
        $formItem.removeClass('danger');
        $statusIcon.addClass('ok').show();
        $tipWrapper.removeClass('danger show');
      } else if (!result.status) {
        $formItem.addClass('danger');
        $statusIcon.removeClass('ok').hide();
        $tip.text(result.msg);
        $tipWrapper.addClass('danger show')
      }
    })
  },
  checkAnswer($ele) {
    let _this = this;

    // input完成包围框
    let $formItem = $ele.parent();
    // 信息提示icon
    let $statusIcon = $formItem.find('.status-icon');
    // 显示信息的tip-wrapper
    let $tipWrapper = $ele.parent().next('.tip-wrapper');
    // tip
    let $tip = $tipWrapper.find('.tip');

    $ele.on('blur', function () {
      let answer = $ele.val().trim()
      if (!answer) {
        $formItem.removeClass('danger');
        $tipWrapper.removeClass('danger show');
        $statusIcon.removeClass('ok').hide();
        $tip.text($tip.data('default'));
        return;
      }
      let result = _this.isValidAnswer(answer);
      if (result.status) {
        $formItem.removeClass('danger');
        $statusIcon.addClass('ok').show();
        $tipWrapper.removeClass('danger show');
      } else if (!result.status) {
        $formItem.addClass('danger');
        $statusIcon.removeClass('ok').hide();
        $tip.text(result.msg);
        $tipWrapper.addClass('danger show')
      }
    })
  },
  isValidUsername(name) {
    let result = {
      status: false,
      msg: ''
    }
    name = name.trim() || '';
    let reg = /^\d+$/
    if (name.length < 4 || name.length > 20) {
      result.msg = this.data.usernameErrorInfo.lengthError;
      return result;
    } else if (reg.test(name)) {
      result.msg = this.data.usernameErrorInfo.numberError;
      return result;
    }
    result.status = true;
    return result;
  },
  isValidPassword(password) {
    let result = {
      status: false,
      msg: ''
    }

    let reg = /^(\d+|[a-z]+|[A-Z]+|_+)$/

    // ERROR
    // 密码长度不够
    if (password.length < 6 || password.length > 20) {
      result.msg = this.data.passwordInfo.lengthError;
      return result;
    }
    // Waring
    // 密码只包括小写字母，数字，大写字母，下划线中的一种
    else if (reg.test(password)) {
      result.status = true;
      result.msg = this.data.passwordInfo.securityWaring;
      return result;
    }
    // 密码长度符合要求
    result.status = true;
    result.msg = this.data.passwordInfo.securityInfo;
    return result;
  },
  isSamePassword(password1, password2) {
    let result = {
      status: false,
      msg: ''
    }

    if (password1 !== password2) {
      return result;
    }
    result.status = true;
    return result;
  },
  isValidPhone(phone) {
    let result = {
      status: false,
      msg: ''
    }
    if (_util.isPhoneNumber(phone)) {
      result.status = true;
      return result;
    }
    result.msg = this.data.phoneErrorInfo.error;
    return result;
  },
  isValidEmail(email) {
    let result = {
      status: false,
      msg: ''
    }
    if (_util.isEmail(email)) {
      result.status = true;
      return result;
    }
    result.msg = this.data.emailErrorInfo.error;
    return result;
  },
  isValidQuestion(question) {
    let result = {
      status: false,
      msg: ''
    }
    if (_util.isRequired(question)) {
      result.status = true;
      return result;
    }
    result.msg = this.data.questionErrorInfo.error;
    return result;
  },
  isValidAnswer(answer) {
    let result = {
      status: false,
      msg: ''
    }
    if (_util.isRequired(answer)) {
      result.status = true;
      return result;
    }
    result.msg = this.data.answerErrorInfo.error;
    return result;
  }
}


$(function () {
  register.init();
})