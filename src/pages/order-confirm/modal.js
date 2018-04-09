/*
 * @Author: guidetheorient 
 * @Date: 2018-04-09 10:40:20 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-09 17:14:37
 */

// 省市联动
const _citySelect = require('tool/util/city-select.js');

const _util = require('tool/util/util.js');

// 地址接口
const _address = require('tool/service/address.js');

// 除省份城市之外的tpl
const modalTpl = require('./modal.ejs');
// 省份城市tpl
const provincesTpl = require('./provinces.ejs');
const citiesTpl = require('./cities.ejs');


let modal = {
  init(para){
    /**
     * para {
     *  type: 'edit' or 'add',
     *  $ele:  (edit存在的情况下) 
     * } 
     */ 
    this.para = para;
    
    // modal
    this.$modal = $('.add-address-modal');
    this.$modalCon = this.$modal.find('.modal');
    this.$infoList = this.$modal.find('.info-list');

    // shippingId (type=== ‘edit’)
    para.type === 'edit' ? this.para.id = para.$ele.data('id') : '';

    // 加载原始数据
    this.load();
    
    // 显示
    this.$modal.show();
  },
  load(){
    let _this = this;

    let data = {
      provinces: _citySelect.getProvinces()
    }

    // 添加地址
    if(this.para.type === 'add') {
      this.$infoList.html(_util.renderHtml(modalTpl, data));
      this.getEle();
      this.bind();
    } 
    // 编辑地址
    else if(this.para.type === 'edit') {
      _address.getAddressList(function (res) {
        if(res.data.list && res.data.list.length) {
          // 获取shippingId对应的地址
          let address = res.data.list.filter(value => value.id === _this.para.id)[0];
          
          // render信息
          _this.$infoList.html(_util.renderHtml(modalTpl, $.extend(address, data)));
          // render城市
          _this.loadCities(address.receiverProvince, address.receiverCity);
          _this.getEle();
          _this.bind();
        }
        
      })
      // 这个接口好像挂了
      // _address.getSelectedAddress({
      //   shippingId: this.para.id
      // },function (res) {
      //   console.log(res)
      //   this.$infoList.html(_util.renderHtml(modalTpl, res.data));
      // },function (errMsg) {
      //   console.log(errMsg)
      // })
    }
  },
  loadCities(province, selectedCity){
    let cities = _citySelect.getCities(province);
    $('.modal .city').html(_util.renderHtml(citiesTpl, {
      cities: cities,
      selectedCity: selectedCity
    }));
  },
  bind(){
    let _this = this;

    // 省市联动
    this.$provinceSelect.on('change',function () {
      let province = $(this).val();
      _this.loadCities(province);
    })

    let isAdding = false;
    this.$submitBtn.on('click',function (e) {
      e.preventDefault();
      let result = _this.getSubmitPara();
      // 新增地址
      if(_this.para.type === 'add' && result.status && !isAdding) {
        isAdding = true;        
        _address.createAddress(result.para, function (res) {
          _util.successTips('地址添加成功');
          _this.$modal.hide();
          typeof _this.para.success && _this.para.success();
          _this.$modal.hide();
          isAdding = false;
          console.log(res)
        },function (errMsg) {
          console.log(errMsg);
          _util.errorTips(errMsg);
        })
      } 
      // 编辑地址
      else if(_this.para.type === 'edit' && result.status) {
        _address.updateAddress(result.para, function (res) {
          _util.successTips('地址修改成功');
          _this.$modal.hide();
          typeof _this.para.success && _this.para.success();
          _this.$modal.hide();
          console.log(res)
        },function (errMsg) {
          console.log(errMsg);
          _util.errorTips(errMsg);
        })
      }
    })

    // 关闭modal
    this.$modalCon.on('click', function (e) {
      e.stopPropagation();
    })
    this.$closeBtn.on('click',function (e) {
      e.stopPropagation();
      _this.$modal.hide();
    })
    this.$modal.on('click',function(){
      _this.$modal.hide();
    })
  },
  getSubmitPara(){
    let result = {
      status: false,
      msg: '',
      para: null
    };
    let para = {
      receiverName: this.$personNameIpt.val().trim(),
      receiverPhone: this.$telIpt.val().trim(),
      receiverProvince: this.$provinceSelect.val(),
      receiverCity: this.$citySelect.val(),
      receiverAddress: this.$addressDetailIpt.val().trim(),
      receiverZip: this.$postCodeIpt.val().trim()
    }

    if(this.para.type !== 'add') {
      para.id = this.para.id;
    }

    if(!para.receiverName) {
      result.msg = '请输入收件人姓名';
    } else if(!para.receiverProvince) {
      result.msg = '请选择省份';
    } else if(!para.receiverCity) {
      result.msg = '请选择城市'
    } else if(!para.receiverAddress) {
      result.msg = '请输入详细地址'
    } else if(!_util.isPhoneNumber(para.receiverPhone)) {
      result.msg = '请输入正确的手机号'
    } else {
      result.status = true;
      result.para = para
    }
    return result;

    
  },
  getEle(){
    this.$provinceSelect = this.$modal.find('.province');
    this.$citySelect = this.$modal.find('.city');
    this.$personNameIpt = this.$modal.find('#person-name');
    this.$addressDetailIpt = this.$modal.find('#address-detail');
    this.$telIpt = this.$modal.find('#tel');
    this.$postCodeIpt = this.$modal.find('#post-code');

    this.$submitBtn = this.$modal.find('.submit-btn');
    this.$closeBtn = this.$modal.find('.fa-times');
  }
}

module.exports = modal;