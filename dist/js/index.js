webpackJsonp([6],{19:function(n,t,i){n.exports=i(20)},20:function(n,t,i){"use strict";(function(n){function t(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var e=function(){function n(n,t){for(var i=0;i<t.length;i++){var e=t[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}return function(t,i,e){return i&&n(t.prototype,i),e&&n(t,e),t}}();i(4),i(5),i(2),i(26);var s=(i(0),i(27)),u=(i(3),{data:{},init:function(){this.load(),this.bind()},load:function(){},bind:function(){this.$tab=n(".news .tab"),this.$tabHead=this.$tab.find(".tab-head"),this.$tabCon=this.$tab.find(".tab-con"),this.$underline=this.$tab.find(".underline");var t=this;this.$tabHead.on("mouseenter","span",function(){var i=n(this).index();t.$tabCon.children().eq(i).addClass("active").siblings().removeClass("active"),t.$underline.css({transform:"translateX("+n(this).outerWidth(!0)*i+"px)"})})}}),o=function(){function i(n){t(this,i),this.$ele=n,this.$menu=n.find(".menu"),this.$sub=n.find(".sub"),this.$sub.children().hide(),this.$sub.hide(),this.posList=[],this.activeSub=null,this.mouseInSub=!1,this.bind()}return e(i,[{key:"bind",value:function(){var t=this,i=null,e=function(n){t.posList.push({x:n.pageX,y:n.pageY}),t.posList.length>3&&t.posList.shift()};this.$ele.on("mouseleave",function(){t.activeSub&&(t.$sub.hide(),t.$sub.children().hide(),t.activeSub=null),t.$sub.hide(),t.activeSub=null,n(document).off("mousemove",e)}).on("mouseenter",function(){n(document).on("mousemove",e)}).on("mouseenter",".item",function(e){var u=this;if(!t.activeSub)return t.$sub.show().find("#"+n(this).data("id")).show(),void(t.activeSub=!0);var o=t.posList[t.posList.length-2],a=t.posList[t.posList.length-1];s(a,o,t.$sub)?(i&&clearTimeout(i),i=setTimeout(function(){t.mouseInSub||(t.$sub.find("#"+n(u).data("id")).show().siblings().hide(),i=null)},300)):t.$sub.find("#"+n(this).data("id")).show().siblings().hide()}),this.$sub.on("mouseenter",function(){t.mouseInSub=!0}).on("mouseleave",function(){t.mouseInSub=!1})}}]),i}();n(function(){new o(n(".col1").eq(0)),u.init(),n(".col2").eq(0).unslider({autoplay:!0,speed:500,delay:3e3,dots:!0,arrows:{prev:'<a class="unslider-arrow prev"><i class="fa fa-angle-left"></i></a>',next:'<a class="unslider-arrow next"><i class="fa fa-angle-right"></i></a>'}})})}).call(t,i(1))},26:function(n,t){},27:function(n,t,i){"use strict";function e(n,t){return{x:n.x-t.x,y:n.y-t.y}}function s(n,t){return n.x*t.y-n.y*t.x}function u(n,t){return(n^t)>=0}function o(n,t,i,o){var a=e(n,t),r=e(n,i),c=e(n,o),l=s(a,r),f=s(r,c),h=s(c,a);return u(l,f)&&u(l,h)}function a(n,t,i){if(!n||!t)return!1;var e=i.offset(),s=i.height();return o(n,t,{x:e.left,y:e.top},{x:e.left,y:e.top+s})}n.exports=a}},[19]);
//# sourceMappingURL=index.js.map