webpackJsonp([3],[,,,,,,,,,,,,,,function(t,n,e){t.exports=e(15)},function(t,n,e){"use strict";e(16),e(18)},function(t,n,e){"use strict";(function(t,i,o){var s,r,a,c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){"object"===c(i)&&"object"===c(i.exports)?t(e(1)):(r=[],s=t(o),void 0!==(a="function"==typeof s?s.apply(n,r):s)&&(i.exports=a))}(function(n){if(!n)return console.warn("Unslider needs jQuery");n.Unslider=function(e,i){var o=this;return o._="unslider",o.defaults={autoplay:!1,delay:3e3,speed:750,easing:"swing",keys:{prev:37,next:39},nav:!0,arrows:{prev:'<a class="'+o._+'-arrow prev">Prev</a>',next:'<a class="'+o._+'-arrow next">Next</a>'},animation:"horizontal",selectors:{container:"ul:first",slides:"li"},animateHeight:!1,activeClass:o._+"-active",swipe:!0,swipeThreshold:.2},o.$context=e,o.options={},o.$parent=null,o.$container=null,o.$slides=null,o.$nav=null,o.$arrows=[],o.total=0,o.current=0,o.prefix=o._+"-",o.eventSuffix="."+o.prefix+~~(2e3*Math.random()),o.interval=[],o.init=function(e){return o.options=n.extend({},o.defaults,e),o.$container=o.$context.find(o.options.selectors.container).addClass(o.prefix+"wrap"),o.$slides=o.$container.children(o.options.selectors.slides),o.setup(),n.each(["nav","arrows","keys","infinite"],function(t,e){o.options[e]&&o["init"+n._ucfirst(e)]()}),t.event.special.swipe&&o.options.swipe&&o.initSwipe(),o.options.autoplay&&o.start(),o.calculateSlides(),o.$context.trigger(o._+".ready"),o.animate(o.options.index||o.current,"init")},o.setup=function(){o.$context.addClass(o.prefix+o.options.animation).wrap('<div class="'+o._+'" />'),o.$parent=o.$context.parent("."+o._),"static"===o.$context.css("position")&&o.$context.css("position","relative"),o.$context.css("overflow","hidden")},o.calculateSlides=function(){if(o.$slides=o.$container.children(o.options.selectors.slides),o.total=o.$slides.length,"fade"!==o.options.animation){var t="width";"vertical"===o.options.animation&&(t="height"),o.$container.css(t,100*o.total+"%").addClass(o.prefix+"carousel"),o.$slides.css(t,100/o.total+"%")}},o.start=function(){return o.interval.push(setTimeout(function(){o.next()},o.options.delay)),o},o.stop=function(){for(var t;t=o.interval.pop();)clearTimeout(t);return o},o.initNav=function(){var t=n('<nav class="'+o.prefix+'nav"><ol /></nav>');o.$slides.each(function(e){var i=this.getAttribute("data-nav")||e+1;n.isFunction(o.options.nav)&&(i=o.options.nav.call(o.$slides.eq(e),e,i)),t.children("ol").append('<li data-slide="'+e+'">'+i+"</li>")}),o.$nav=t.insertAfter(o.$context),o.$nav.find("li").on("mouseenter"+o.eventSuffix,function(t){var e=n(this).addClass(o.options.activeClass);e.siblings().removeClass(o.options.activeClass),o.animate(e.attr("data-slide"))})},o.initArrows=function(){!0===o.options.arrows&&(o.options.arrows=o.defaults.arrows),n.each(o.options.arrows,function(t,e){o.$arrows.push(n(e).insertAfter(o.$context).on("click"+o.eventSuffix,o[t]))})},o.initKeys=function(){!0===o.options.keys&&(o.options.keys=o.defaults.keys),n(document).on("keyup"+o.eventSuffix,function(t){n.each(o.options.keys,function(e,i){t.which===i&&n.isFunction(o[e])&&o[e].call(o)})})},o.initSwipe=function(){var t=o.$slides.width();"fade"!==o.options.animation&&o.$container.on({movestart:function(t){if(t.distX>t.distY&&t.distX<-t.distY||t.distX<t.distY&&t.distX>-t.distY)return!!t.preventDefault();o.$container.css("position","relative")},move:function(n){o.$container.css("left",-100*o.current+100*n.distX/t+"%")},moveend:function(n){Math.abs(n.distX)/t>o.options.swipeThreshold?o[n.distX<0?"next":"prev"]():o.$container.animate({left:-100*o.current+"%"},o.options.speed/2)}})},o.initInfinite=function(){var t=["first","last"];n.each(t,function(n,e){o.$slides.push.apply(o.$slides,o.$slides.filter(':not(".'+o._+'-clone")')[e]().clone().addClass(o._+"-clone")["insert"+(0===n?"After":"Before")](o.$slides[t[~~!n]]()))})},o.destroyArrows=function(){n.each(o.$arrows,function(t,n){n.remove()})},o.destroySwipe=function(){o.$container.off("movestart move moveend")},o.destroyKeys=function(){n(document).off("keyup"+o.eventSuffix)},o.setIndex=function(t){return t<0&&(t=o.total-1),o.current=Math.min(Math.max(0,t),o.total-1),o.options.nav&&o.$nav.find('[data-slide="'+o.current+'"]')._active(o.options.activeClass),o.$slides.eq(o.current)._active(o.options.activeClass),o},o.animate=function(t,e){if("first"===t&&(t=0),"last"===t&&(t=o.total),isNaN(t))return o;o.options.autoplay&&o.stop().start(),o.setIndex(t),o.$context.trigger(o._+".change",[t,o.$slides.eq(t)]);var i="animate"+n._ucfirst(o.options.animation);return n.isFunction(o[i])&&o[i](o.current,e),o},o.next=function(){var t=o.current+1;return t>=o.total&&(t=o.options.noloop&&!o.options.infinite?o.total-1:0),o.animate(t,"next")},o.prev=function(){var t=o.current-1;return t<0&&(t=o.options.noloop&&!o.options.infinite?0:o.total-1),o.animate(t,"prev")},o.animateHorizontal=function(t){var n="left";return"rtl"===o.$context.attr("dir")&&(n="right"),o.options.infinite&&o.$container.css("margin-"+n,"-100%"),o.slide(n,t)},o.animateVertical=function(t){return o.options.animateHeight=!0,o.options.infinite&&o.$container.css("margin-top",-o.$slides.outerHeight()),o.slide("top",t)},o.slide=function(t,n){if(o.animateHeight(n),o.options.infinite){var e;n===o.total-1&&(e=o.total-3,n=-1),n===o.total-2&&(e=0,n=o.total-2),"number"==typeof e&&(o.setIndex(e),o.$context.on(o._+".moved",function(){o.current===e&&o.$container.css(t,-100*e+"%").off(o._+".moved")}))}var i={};return i[t]=-100*n+"%",o._move(o.$container,i)},o.animateHeight=function(t){o.options.animateHeight&&o._move(o.$context,{height:o.$slides.eq(t).outerHeight()},!1)},o._move=function(t,n,e,i){return!1!==e&&(e=function(){o.$context.trigger(o._+".moved")}),t._move(n,i||o.options.speed,o.options.easing,e)},o.init(i)},n.fn._active=function(t){return this.addClass(t).siblings().removeClass(t)},n._ucfirst=function(t){return(t+"").toLowerCase().replace(/^./,function(t){return t.toUpperCase()})},n.fn._move=function(){return this.stop(!0,!0),n.fn[n.fn.velocity?"velocity":"animate"].apply(this,arguments)},n.fn.unslider=function(t){return this.each(function(e,i){var o=n(i);if(!(n(i).data("unslider")instanceof n.Unslider)){if("string"==typeof t&&o.data("unslider")){t=t.split(":");var s=o.data("unslider")[t[0]];if(n.isFunction(s))return s.apply(o,t[1]?t[1].split(","):null)}return o.data("unslider",new n.Unslider(o,t))}})}})}).call(n,e(1),e(17)(t),e(1))},function(t,n){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,n){}],[14]);
//# sourceMappingURL=unslider.js.map