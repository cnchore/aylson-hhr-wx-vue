
 
<template>  
      <div class="page">
        <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">真实姓名</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="partnerName" maxlength="100" v-model="formData.partnerName" placeholder="请输入您的真实姓名">
                </div>
               
            </div>
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">手机号码</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="mobilePhone" maxlength="11" v-model="formData.mobilePhone" placeholder="请输入您的电话号码">
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
                    <div class="weui-label">所属行业</div>
                </div>
                <div class="weui-cell__bd">
                   <div class="weui-select" id="industryPicker" @click="industrySelected">
                   {{industryLabel}}
                    </div>
                </div>
            </div>
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">卖场/品牌</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="storeBrand" v-model="formData.storeBrand" maxlength="100" placeholder="请输入您卖场或品牌">
                </div>
               
            </div>
            
        </div>
        <div class="weui-cells__title">银行卡信息</div>
          <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell weui-cell_input">
              <div class="weui-cell__hd">
                <div class="weui-label">身份证号</div>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="idcard" id="cardID" bindinput="inputChange" v-model="formData.cardID" maxlength="20" placeholder="请输入您的身份证号" />
              </div>
              
            </div>
            <div class="weui-cell weui-cell_input">
              <div class="weui-cell__hd">
                <div class="weui-label">姓名</div>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" id="bankAccountName" bindinput="inputChange" v-model="formData.bankAccountName" maxlength="20" placeholder="请输入银行卡开户名" />
              </div>
             
            </div>
            <div class="weui-cell weui-cell_input">
              <div class="weui-cell__hd">
                <div class="weui-label">卡号</div>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="number" id="bankNo" bindinput="inputChange" v-model="formData.bankNo" maxlength="30" placeholder="请输入您的银行卡号" />
              </div>
             
            </div>
            <div class="weui-cell weui-cell_input">
              <div class="weui-cell__hd">
                <div class="weui-label">银行</div>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" id="bankName" bindinput="inputChange" v-model="formData.bankName" placeholder="请输入银行卡开户行" />
              </div>
             
            </div>
          </div>

          <div class="weui-btn-area">
            <button class="weui-btn weui-btn_primary" type="primary" :disabled="submiting" @click="submit">保存</button>
          </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import localStorage from '../localStorage'
import qs from 'qs'
import weui from '../../static/js/weui.min'

export default {
  name: 'user-info',
  components:{
    
  },
  data () {
    return {
      formData: {},
      
      submiting:false,
      
      vcodeStatus: false,
      vcodeText: '获取验证码',

        
        province: [],
        city: [],
        industryLabel:'设计师',
        industry: [
            {
                value: 1,
                label: '设计师'
            }, {
                value: 2,
                label: '工长'
            }, {
                value: 3,
                label: '建筑'
            }, {
                value: 4,
                label: '房产中介'
            }, {
                value: 5,
                label: '售楼员'
            }, {
                value: 10,
                label: '其他'
            }
        ],
        checkbox: {
            isAgree: true
        }

    }
  },
  created:function() {

    this.initPage();
    this.provinceInit();
    window.document.title='个人信息修改';
  },
  methods:{
    initPage(){
      const self=this;
      //获取个人信息
      var objs= localStorage.getLocalStorage();
      axios.get(self.$store.state.url.getMyPersonalInfo,{
              params:{
              clientId:objs.id,
              rows:50
            }
          }).then((res) => {
            var _list=res.data.data;
            if(_list){
               self.formData=_list;
            }
            
          }).catch((error)=>{
            console.log(error);
          });
    },
    provinceInit(){
        // 省市数据初始化
        const self=this;
        axios.get(self.$store.state.url.getLocation,{
              params:{
              parentId:1,
              type:'province'
            }
          }).then((res) => {
            var provinceList=res.data.data;
            if(provinceList[0]){
                provinceList.forEach(function(value,index){
                    var _list={
                        label:value.regionName,
                        value:value.regionId
                    }
                    self.province.push(_list);
                })
                //console.log(self.formData.provinceId);
                self.cityInit(self.formData.provinceId);
            }
            //this.nubs = res.data.data;
          }).catch((error)=>{
            console.log(error);
          });
    },
    cityInit(cityParentId,t=1){
        // 城市数据初始化
        //console.log(cityParentId);
        const self=this;
        axios.get(self.$store.state.url.getLocation,{
              params:{
              parentId:cityParentId,
              type:'city'
            }
          }).then((res) => {
            var cityList=res.data.data;
            if(cityList[0]){
              self.city=[];
                cityList.forEach(function(value,index){
                    var _list={
                        label:value.regionName,
                        value:value.regionId
                    }
                    self.city.push(_list);
                })
                if(t==2){
                  self.formData.cityId=cityList[0].regionId;
                  self.formData.city=cityList[0].regionName;
                }
                //self.province= res.data.data;
            }
            //this.nubs = res.data.data;
          }).catch((error)=>{
            console.log(error);
          });
    },
    industrySelected(){
        var that=this;
        weui.picker(that.industry, {
           className: 'custom-classname',
           defaultValue: [1],
           onChange: function (result) {
               //console.log(result)
           },
           onConfirm: function (result) {
               that.formData.industryType=result[0];
               that.industry.forEach(function(item,index){
                    if(item.value==result[0]){
                        that.industryLabel=item.label;
                        return;
                    }
               })
           },
           id: 'industryPicker'
        });
    }
    ,
    mySelected(sel){
        //console.log('provincePicker');
        var that=this;
        weui.picker(this.province, {
           className: 'custom-classname',
           defaultValue: [2],
           onChange: function (result) {
               //console.log(result)
           },
           onConfirm: function (result) {
               that.formData.provinceId=result[0];
               //console.log(that.province[result[0]])
               that.province.forEach(function(item,index){
                    if(item.value==result[0]){
                        that.formData.province=item.label;
                        return;
                    }
               })
               //console.log(result[0]);
               that.cityInit(result[0],2);
               //that.formData.province=that.province[result[0]].label;
               //console.log(that.formData.province);
           },
           id: 'provincePicker'
        });
    },
    citySelected(){
        var that=this;
        weui.picker(this.city, {
           className: 'custom-classname',
           //defaultValue: [3],
           onChange: function (result) {
               //console.log(result)
           },
           onConfirm: function (result) {
               that.formData.cityId=result[0];
               that.city.forEach(function(item,index){
                    if(item.value==result[0]){
                        that.formData.city=item.label;
                        return;
                    }
               })
               //that.formData.city=that.city[result[0]].label;
               //console.log(that.formData.city);
           },
           id: 'cityPicker'
        });
    },
    
    inputChange(e) {
        let key = e.target.id
        let value = e.target.value
        if(this.formData[key]!=undefined){
          this.formData[key]=value;
          //console.log(this.formData[key])
        }
    },
    testFn(){ 
      console.log(this.formData);
      console.log(this.city);
    },
    submit:function(){
       
      let formData=this.formData;
      let that=this;
      if (!formData.partnerName) {
            weui.topTips('姓名不能为空');
            return
        }
        if (!formData.mobilePhone) {
            weui.topTips('手机号码不能为空')
            return
        }
        if (!formData.storeBrand) {
            weui.topTips('卖场/品牌不能为空')
            return
        }
        var loading=weui.loading('保存中...');

        
      this.submiting=true;
      //console.log(formData)
      //qs.stringify(formData)
      var postData={
            id:formData.id,
            partnerName:formData.partnerName,
            mobilePhone:formData.mobilePhone,
            pwd:formData.pwd,
            photo:formData.photo,
            industryType:formData.industryType,
            storeBrand:formData.storeBrand,
            referralName:formData.referralName,
            referralPhone:formData.referralPhone,
            agentName:formData.agentName,
            agentPhone:formData.agentPhone,
            province:formData.province,
            provinceId:formData.provinceId,
            city:formData.city,
            cityId:formData.cityId,
            wxNickName:formData.wxNickName,
            wxOpenId:formData.wxOpenId,
            wxHeadPhoto:formData.wxHeadPhoto,
            wxUnionId:formData.wxUnionId,
            wallet:formData.wallet,
            state:formData.state,
            cardID:formData.cardID,
            bankName:formData.bankName,
            bankNo:formData.bankNo,
            bankAccountName:formData.bankAccountName,
            confirmPwd:formData.confirmPwd,
            newPwd:formData.newPwd,
            validCode:formData.validCode,
            walletHad:formData.walletHad
      }
      
      axios.request({
          url: that.$store.state.url.modifyPersonalInfo,
          method:'post',
          //headers:{'X-Requested-With': 'XMLHttpRequest'},
          headers:{'content-type': 'application/x-www-form-urlencoded'},
          data:qs.stringify(postData)
          //get 需求参数
          //params:{}
        }).then((res) => {
          //console.log(res.data);
          loading.hide();
          if (res.data.success) {
            weui.dialog({
                title:'成功',
                content:res.data.message,
                buttons:[{
                    label:'确定',
                    type:'primary',
                    onClick:function(){
                        localStorage.setLocalStorage(postData);
                        that.$router.push('/user');
                    }
                }]
            });
            
          }else{
            that.submiting=false;
            weui.topTips('个人信息修改失败:'+res.data.message);
          }
          //this.nubs = res.data.data;
        }).catch((error)=>{
          loading.hide();
          weui.alert(error);
        });
    }
  },
  computed:{

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  margin: 0px;
}
.weui-cells__title{
  font-size: 16px;
}
.weui-agree__text {

color:#999999;  
font-size: 14px;
}
.weui-cell_select{
    padding-left:15px; 
}
.weui-select{
    padding-left:0px; 
}
.weui-agree__checkbox{
  display: inline-block;
  padding: 0px;
  width: 20px;
  line-height: 12px;
  margin: 0;
  height: 1px;
}

</style>
