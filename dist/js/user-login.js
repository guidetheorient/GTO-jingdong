webpackJsonp([9],{28:function(i,t,n){i.exports=n(29)},29:function(i,t,n){"use strict";(function(i){n(30),n(2);var t=n(0),s=n(3),e={data:{redirect:t.getUrlQuery("redirect")},init:function(){this.load(),this.bind()},load:function(){},bind:function(){var t=this,n=this;this.$loginHeader=i(".login-wrapper .header"),this.$loginHeader.on("click",".item",function(n){t.$loginHeader.children().removeClass("active"),i(n.target).addClass("active")}),this.$emptyInput=i(".empty"),this.$inputWrapper=i(".input-wrapper"),this.$inputWrapper.find("input").on("input",function(){i(this).val().trim()&&i(this).siblings(".empty").show()}),this.$emptyInput.on("click",function(){i(this).hide().siblings("input").val("")}),this.$loginBtn=i(".login-btn"),this.$loginBtn.on("click",function(){var t={username:i("#user").val().trim(),password:i("#password").val().trim()};n.validate(t).status&&s.login(t,function(i){location.href=n.data.redirect,console.log(i)},function(i){n.errorMsg(i),console.log(i)})})},validate:function(i){var n={status:!1,msg:""};return t.isRequired(i.username)||t.isRequired(i.password)?t.isRequired(i.username)?t.isRequired(i.password)?i.password<8?(n.msg="密码不正确",n):(n.status=!0,n):(n.msg="请输入密码",n):(n.msg="请输入账户名",n):(n.msg="请输入账户名和密码",n)},errorMsg:function(t){this.$msgWrapper=i(".msg-wrapper"),this.$msgWrapper.removeClass("hide").find(".error-msg").text(t)}};i(function(){e.init()})}).call(t,n(1))},30:function(i,t){}},[28]);
//# sourceMappingURL=user-login.js.map