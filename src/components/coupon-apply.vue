<template>
  <div class="page">

    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__hd weui-cell__hd_in-select-after">
          <div class="weui-label">分类</div>
        </div>
        <div class="weui-cell__bd">
          <div class="weui-select" id="couponCatePicker" @click="cateSelected">{{formData.applyCouponName}}
          </div>

        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">姓名</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="ownerName" v-model="formData.ownerName" placeholder="请输入您的姓名" />
        </div>

      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">手机号码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="ownerPhone" v-model="formData.ownerPhone" type="number" maxlength="11" placeholder="请输入您的手机号码"/>
        </div>

      </div>
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__hd weui-cell__hd_in-select-after">
          <div class="weui-label">省份</div>
        </div>
        <div class="weui-cell__bd">
          <div class="weui-select" id="provincePicker" @click="mySelected">{{formData.province}}
          </div>
        </div>
      </div>
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__hd weui-cell__hd_in-select-after">
          <div class="weui-label">城市</div>
        </div>
        <div class="weui-cell__bd">
          <div class="weui-select" id="cityPicker" @click="citySelected">{{formData.city}}</div>

        </div>
      </div>
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__hd weui-cell__hd_in-select-after">
          <div class="weui-label">区县</div>
        </div>
        <div class="weui-cell__bd">
          <div class="weui-select" id="areaPicker" @click="areaSelected">
            {{formData.area}}
          </div>
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">街道/小区</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="street" v-model="formData.street" placeholder="请输入街道或小区" />
        </div>

      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">门牌/单位</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="unit" v-model="formData.unit" placeholder="请输入门牌或单位" />
        </div>

      </div>
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__hd weui-cell__hd_in-select-after">
          <div class="weui-label">风格</div>
        </div>
        <div class="weui-cell__bd">
          <div class="weui-select" id="houseStylePicker" @click="houseStyleSelected">
            {{formData.houseStyle}}
          </div>
        </div>
      </div>
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__hd weui-cell__hd_in-select-after">
          <div class="weui-label">户型</div>
        </div>
        <div class="weui-cell__bd">
          <div class="weui-select" id="houseTypePicker" @click="houseTypeSelected">
            {{formData.houseType}}
          </div>

        </div>
      </div>
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__hd weui-cell__hd_in-select-after">
          <div class="weui-label">面积</div>
        </div>
        <div class="weui-cell__bd">
          <div class="weui-select" id="houseAreaPicker" @click="houseAreaSelected">
            {{formData.houseArea}}
          </div>
        </div>
      </div>
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__hd weui-cell__hd_in-select-after">
          <div class="weui-label">进度</div>
        </div>
        <div class="weui-cell__bd">
          <div class="weui-select" id="progressPicker" @click="progressSelected">
            {{progressName}}
          </div>
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">申请数量</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="applyNum" v-model="formData.applyNum" type="number" placeholder="请输入申请数量" />
        </div>

      </div>
    </div>
    <div class="weui-btn-area">
      <button class="weui-btn weui-btn_primary" type="primary" :disabled="submiting" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import localStorage from '../localStorage'
  import qs from 'qs'
  import weui from '../../static/js/weui.min'

  export default {
    name: 'coupon-apply',
    components: {

    },
    data() {
      return {
        formData: {
          clientId: '',
          applyCouponId: '',
          applyCouponName: '',
          ownerName: '',
          ownerPhone: '',
          province: '',
          provinceId: '',
          city: '',
          cityId: '',
          area: '',
          areaId: '',
          street: '',
          unit: '',
          houseStyle: '欧式',
          houseType: '两居及以内',
          houseArea: '80以内',
          progress: 0,
          applyNum: ''
        },

        submiting: false,

        couponCate: [],
        province: [],
        city: [],

        area: [],

        houseStyle: [{
          value: '欧式',
          label: '欧式'
        }, {
          value: '美式',
          label: '美式'
        }, {
          value: '中式',
          label: '中式'
        }, {
          value: '现代简约',
          label: '现代简约'
        }, {
          value: '其他',
          label: '其他'
        }],
        houseType: [{
          value: '两居及以内',
          label: '两居及以内'
        }, {
          value: '三居室',
          label: '三居室'
        }, {
          value: '四居室',
          label: '四居室'
        }, {
          value: '复式楼',
          label: '复式楼'
        }, {
          value: '别墅洋房',
          label: '别墅洋房'
        }, {
          value: '其他',
          label: '其他'
        }],

        houseArea: [{
          value: '80以内',
          label: '80以内'
        }, {
          value: '100以内',
          label: '100以内'
        }],
        progressName: '未进场',
        progress: [
          {
            value: 0,
            label: '未进场'
          }, {
            value: 1,
            label: '已进场'
          }
        ]
      }
    },
    created: function () {
      var objs = localStorage.getLocalStorage();
      let t = Object.prototype.toString.call(objs).slice(8, -1);
      const self = this;
      if (t == 'Object' && objs.id) {
        self.formData.clientId = objs.id;
      } else {
        self.$router.push('/login');
      }

      self.provinceInit();
      //self.cityInit();
      self.cateInit();

      window.document.title='现金券申请';

    },
    methods: {
      cateInit() {
        // 优惠券分类数据初始化
        const self = this;
        axios.get(self.$store.state.url.getCouponConfig
        ).then((res) => {
          var cateList = res.data.data;
          if (cateList[0]) {
            cateList.forEach(function (value, index) {
              var _list = {
                label: value.couponName,
                value: value.id
              }
              self.couponCate.push(_list);
            })
            //self.province= res.data.data;
            self.formData.applyCouponId = cateList[0].id;
            self.formData.applyCouponName = cateList[0].couponName;
            //console.log(self.province)

          }
          //this.nubs = res.data.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      provinceInit() {
        // 省市数据初始化
        const self = this;
        axios.get(self.$store.state.url.getLocation, {
          params: {
            parentId: 1,
            type: 'province'
          }
        }).then((res) => {
          var provinceList = res.data.data;
          if (provinceList[0]) {
            provinceList.forEach(function (value, index) {
              var _list = {
                label: value.regionName,
                value: value.regionId
              }
              self.province.push(_list);
            })
            //self.province= res.data.data;
            self.formData.provinceId = provinceList[0].regionId;
            self.formData.province = provinceList[0].regionName;
            //console.log(self.province)
            self.cityInit(self.formData.provinceId);
          }
          //this.nubs = res.data.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      cityInit(cityParentId) {
        // 城市数据初始化

        const self = this;
        axios.get(self.$store.state.url.getLocation, {
          params: {
            parentId: cityParentId,
            type: 'city'
          }
        }).then((res) => {
          var cityList = res.data.data;
          self.city = [];
          if (cityList[0]) {
            cityList.forEach(function (value, index) {
              var _list = {
                label: value.regionName,
                value: value.regionId
              }
              self.city.push(_list);
            })

            //self.province= res.data.data;
            self.formData.cityId = cityList[0].regionId;
            self.formData.city = cityList[0].regionName;
            self.areaInit(self.formData.cityId);
          }
          //this.nubs = res.data.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      areaInit(areaParentId) {
        // 城市数据初始化

        const self = this;
        axios.get(self.$store.state.url.getLocation, {
          params: {
            parentId: areaParentId,
            type: 'area'
          }
        }).then((res) => {
          var areaList = res.data.data;
          self.area = [];
          if (areaList[0]) {
            areaList.forEach(function (value, index) {
              var _list = {
                label: value.regionName,
                value: value.regionId
              }
              self.area.push(_list);
            })

            //self.province= res.data.data;
            self.formData.areaId = areaList[0].regionId;
            self.formData.area = areaList[0].regionName;
          }
          //this.nubs = res.data.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      mySelected(sel) {
        //console.log('provincePicker');
        var that = this;
        weui.picker(this.province, {
          className: 'custom-classname',
          defaultValue: [2],
          onChange: function (result) {
            //console.log(result)
          },
          onConfirm: function (result) {
            that.formData.provinceId = result[0];
            //console.log(that.province[result[0]])
            that.province.forEach(function (item, index) {
              if (item.value == result[0]) {
                that.formData.province = item.label;
                return;
              }
            })
            that.cityInit(result[0]);
            //that.formData.province=that.province[result[0]].label;
            //console.log(that.formData.province);
          },
          id: 'provincePicker'
        });
      },
      citySelected() {
        var that = this;
        weui.picker(this.city, {
          className: 'custom-classname',
          //defaultValue: [3],
          onChange: function (result) {
            //console.log(result)
          },
          onConfirm: function (result) {
            that.formData.cityId = result[0];
            that.city.forEach(function (item, index) {
              if (item.value == result[0]) {
                that.formData.city = item.label;
                return;
              }
            })
            that.areaInit(result[0]);
            //that.formData.city=that.city[result[0]].label;
            //console.log(that.formData.city);
          },
          id: 'cityPicker'
        });
      },
      areaSelected() {
        var that = this;
        weui.picker(that.area, {
          className: 'custom-classname',
          //defaultValue: [3],
          onChange: function (result) {
            //console.log(result)
          },
          onConfirm: function (result) {
            that.formData.areaId = result[0];
            that.area.forEach(function (item, index) {
              if (item.value == result[0]) {
                that.formData.area = item.label;
                return;
              }
            })
            //that.formData.city=that.city[result[0]].label;
            //console.log(that.formData.city);
          },
          id: 'areaPicker'
        });
      },
      cateSelected() {
        //优惠券分类
        var that = this;
        weui.picker(that.couponCate, {
          defaultValue: that.formData.applyCouponId,
          onConfirm: function (result) {
            that.formData.applyCouponId = result[0];
            that.couponCate.forEach(function (item, index) {
              if (item.value == result[0]) {
                that.formData.applyCouponName = item.label;
                return;
              }

            })

          },
          id: 'couponCatePicker'
        });
      },
      houseStyleSelected() {
        //风格
        var that = this;
        weui.picker(that.houseStyle, {
          defaultValue: that.formData.houseStyle,
          onConfirm: function (result) {
            that.formData.houseStyle = result[0];
            return;
          },
          id: 'houseStylePicker'
        });
      },
      houseTypeSelected() {
        //户型
        var that = this;
        weui.picker(that.houseType, {
          defaultValue: that.formData.houseType,
          onConfirm: function (result) {
            that.formData.houseType = result[0];
            return;
          },
          id: 'houseTypePicker'
        });
      },
      houseAreaSelected() {
        //面积
        var that = this;
        weui.picker(that.houseArea, {
          defaultValue: that.formData.houseArea,
          onConfirm: function (result) {
            that.formData.houseArea = result[0];
            return;
          },
          id: 'houseAreaPicker'
        });
      },
      progressSelected() {
        //进度
        var that = this;
        weui.picker(that.progress, {
          defaultValue: that.formData.progress,
          onConfirm: function (result) {
            that.formData.progress = result[0];
            that.progress.forEach(function (item, index) {
              if (item.value = result[0]) {
                that.progressName = item.label;
                return;
              }
            })

          },
          id: 'progressPicker'
        });
      },
      inputChange(e) {
        let key = e.target.id
        let value = e.target.value
        if (this.formData[key] != undefined) {
          this.formData[key] = value;
          //console.log(this.formData[key])
        }
      },
      testFn() {
        console.log(this.formData);
      },
      submit: function () {

        let formData = this.formData;
        let that = this;
        if (!formData.ownerName) {
          weui.topTips('姓名不能为空')
          return
        }
        if (!formData.ownerPhone) {
          weui.topTips('手机号码不能为空')
          return
        }
        if (!formData.street) {
          weui.topTips('请输入街道或小区')
          return
        }
        if (!formData.unit) {
          weui.topTips('请输入门牌或单位')
          return
        }
        if (!formData.applyNum) {
          weui.topTips('请输入申请数量')
          return
        }
        var loading = weui.loading('提交中...');


        this.submiting = true;
        //console.log(formData)
        axios.request({
          url: that.$store.state.url.applyCoupon,
          method: 'post',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(formData),
          timeout: 9000
          //get 需求参数
          //,params:{}
        }).then((res) => {
          //console.log(res.data);
          loading.hide();
          if (res.data.success) {
            weui.dialog({
              title: '提交成功，等待系统审核',
              content: '是否继续申请？',
              buttons: [{
                label: '不继续申请',
                type: 'default',
                onClick: function () {
                  that.$router.push('/coupon-list');
                }
              }, {
                label: '继续申请',
                type: 'primary',
                onClick: function () {  
                  that.submiting=false;
                }
              }]
            });

          } else {
            that.submiting = false;
            weui.topTips('申请报错:' + res.data.message);
          }
          //this.nubs = res.data.data;
        }).catch((error) => {
          loading.hide();
          weui.alert(error);
          that.submiting=true;
        });
      }
    },
    computed: {


    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    margin: 0px;
  }
  
  .weui-cells__title {
    font-size: 16px;
  }
  
  .weui-agree__text {
    color: #999999;
    font-size: 14px;
  }
  
  .weui-cell_select {
    padding-left: 15px;
  }
  
  .weui-select {
    padding-left: 0px;
  }
  
  .weui-agree__checkbox {
    display: inline-block;
    padding: 0px;
    width: 20px;
    line-height: 12px;
    margin: 0;
    height: 1px;
  }
</style>