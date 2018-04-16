# jidong-jq(仿京东商城桌面版)

jingdong-jq实现了一个网上商城购物流程所需的主要页面及逻辑，样式上力求还原京东的样式效果，逻辑上力求可以从注册，登录到下单，支付一路通畅；   
jingdong-jq使用webpack的模块化功能，使得整个项目可以切分为基础库，接口库，组件库，上层业务逻辑层这样的纵向结构。各个页面只需引入对应模块并专注于业务逻辑的开发，简单可控。

## 克隆/运行

```
// clone
git clone git@github.com:guidetheorient/GTO-jingdong.git
```

```
// 开发模式运行-开发模式下，代理已配置
npm run server
```


```
// 打包
npm run prod
```



## 功能特色
:exclamation: 支付页请不要扫码支付！！！

:exclamation: 除以下实现页面外，其他功能暂无，首页商品不支持点击到详情页。按照注册-登录-搜索(商品数量较少建议搜索关键字*i*)-商品列表页点击商品-详情页-加入购物车-增删改选地址-提交订单-支付  

1. 实现页面  
主页 / 登录页 / 注册页 / 搜索列表页 / 产品详情页 / 购物车页 / 订单确认页 / 支付页 / 操作提示页

2. 依赖  

    :lollipop: webpack(3.9.1)(多页打包小能手)  
    * webpack-dev-server(2.9.5)的代理及自动刷新  
    * ProvidePlugin自动加载jQuery  
    * HtmlWebpackPlugin自动导出html，并添加特定chunk  
    * CommonsChunkPlugin抽离公共chunk
    * sass-loader及extract-text-webpack-plugin等对.scss样式文件的处理抽离
    * :seedling::seedling::seedling:

    :lollipop: ejs  
    * ejs模板用于实现大量的请求数据回填，大幅减少手动修改；

    :lollipop: fiddler
    * 本地地址指向远程(webpack-dev-server的proxy也可)
    * 远程地址指向本地  
    
    :lollipop: jQuery/unslider  
    :lollipop: sass


3. 基础库/组件库  
:dash: Ajax封装 / url参数获取 / 手机号，邮箱等验证 / localStorage增删改查API  
:dash: 轮播 / 模态框 / 分页 / 无延迟菜单 / 省市联动 / tab


4. TODO  

     :new_moon_with_face: 首页无延迟菜单在鼠标快速滑动时，有小几率出现两个sub的可能。  
    :new_moon_with_face: 订单详情页/购物车预览商品等页面功能开发

5. 其他
模块化的开发使得横纵向层级都可以拆分为更小的模块，确实有助于开发。而工具确实基于需求去诞生，像webpack，jQuery，ejs，fiddler等大大降低了开发的成本，然而我也体会到了Vue，React这些框架诞生的原因；
