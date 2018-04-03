/*
 * @Author: guidetheorient 
 * @Date: 2018-03-30 09:14:12 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-02 20:24:54
 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const devServer = require('webpack-dev-server');

const webpack = require('webpack');

let cssExtract = new ExtractTextPlugin({
  filename: 'css/[name]_[contenthash:8].css',
})

let scssExtract = new ExtractTextPlugin({
  filename: 'css/[name]_[contenthash:8].css',
})

function getHtmlConfig(name, title){
  return {
    template: './src/views/'+ name +'.html',
    title: title,
    filename: 'views/' + name + '.html',
    chunks: [name, 'common', 'jquery'],
    hash: true
  }
}

let providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  'window.$': 'jquery',
});

module.exports = {
  entry: {
    jquery: 'jquery',
    common: ['./src/pages/common/index.js'],
    
    index: ['./src/pages/index/index.js'],
    'user-login': ['./src/pages/user-login/index.js'],
    'user-register': ['./src/pages/user-register/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/dist/'
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      node_modules: path.resolve(__dirname, 'node_modules'),
      tool: path.resolve(__dirname, 'src/tool'),
      pages: path.resolve(__dirname, 'src/pages')
    }
  },
  devServer: {
    proxy: {
      '**/*.do' : {
        target: 'http://test.happymmall.com',
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: scssExtract.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: cssExtract.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif)\??.*$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2*1024,
              name: '[name].[ext]',
              outputPath: 'assets'
              }
            }
        ]
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)\??.*$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2*1024,
              name: '[name].[ext]',
              outputPath: 'assets',
            }
          }
        ]
      },
      {
        test: /\.ejs$/,
        use: ['html-loader']
      },
      // {
      //   test: /\.html$/i,
      //   use: ['html-withimg-loader']
      // }
    ]
  },
  plugins: [
    // font-awesome.css
    cssExtract,
    // 抽离scss
    scssExtract,
    // views中的html 打包到dist/views
    new HtmlWebapckPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebapckPlugin(getHtmlConfig('user-login', '登录')),
    new HtmlWebapckPlugin(getHtmlConfig('user-register', '注册')),
    // 自动引入jquery
    providePlugin,
    // 公共模块抽离
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common', 'jquery'],
      filename: 'assets/lib/[name].js'
    })
  ]
}