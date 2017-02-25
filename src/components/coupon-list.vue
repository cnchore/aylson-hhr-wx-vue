
<template>  
  <div class="page">
  <tooltips v-bind:text="topTipsText" :duration="times" :type="tipsType" v-bind:isShow.sync="tipsShow" @on-my-show="onMyShow"></tooltips>
  <div class="weui-cells__title">客户资料</div>
  <div class="panel margin-b">
    <div class="panel-cont text-table">
      <div class="text-tr">
        <span class="text-tt">姓名</span>
        <span class="text-td">{{info.ownerName}}</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">手机号</span>
        <span class="text-td">{{info.ownerPhone}}</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">地址</span>
        <span class="text-td">{{(info.province+info.city+info.area+info.street+info.unit) || ''}}</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">核发时间</span>
        <span class="text-td">{{info.createTime}}</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">有效时间</span>
        <span class="text-td">{{info.effectTime}}</span>
      </div>
    </div>
  </div>
  <div class="weui-cells__title">客户现金券</div>
  <div class="tab-tit sticky">
    <div :class="{'tab-tit-item':true, 'active':(tabIndex === 0)}"  v-on:click="tabClick(0)">已使用</div>
    <div :class="{'tab-tit-item':true, 'active':(tabIndex === 1)}"  v-on:click="tabClick(1)">未使用</div>
    <div :class="{'tab-tit-item':true, 'active':(tabIndex === 2)}"  v-on:click="tabClick(2)">已失效</div>
  </div>
  <div class="tab-cont">
    <div class="tab-cont-item" v-show="tabIndex === 0">
      <div class="coupon-list">
        <div class="coupon-list-item" v-for="item in tabList0.rowsObject" :id="item.id">
          <div class="item-value">
            <span>￥{{item.couponValue}}</span>
            <img class="item-gap" src="../assets/img-004.jpg">
          </div>
          <div class="item-main">
            <span selectable class="item-tit text-wrap2">{{item.couponCode}}</span>
            <div class="item-desc">
              <div>订单号：{{item.orderCode}}</div>
              <div>使用时间：{{item.updateTime}}</div>
            </div>
          </div>
          <img class="item-mark" src="../assets/img-003.png">
        </div>
      </div>
    </div>
    <div class="tab-cont-item" style="padding-bottom: 132rpx;" v-show="tabIndex === 1">
      <div class="coupon-list" >
        <label class="coupon-list-label" v-for="item in tabList1.rowsObject" :id="item.id" v-on:change="checkboxChange(item)">
          <div class="check">
            <input type="checkbox" class="" :checked="item.checked" :value="item.couponCode" >
          </div> 
          <div class="coupon-list-item">
            <div class="item-value">
              <span>￥{{item.couponValue}}</span>
              <img class="item-gap" src="../assets/img-004.jpg">
            </div>
            <div class="item-main">
              <span selectable class="item-tit text-wrap2">{{item.couponCode}}</span>
              <div class="item-desc">
                <div>有效时间：{{item.effectTime}}</div>
              </div>
            </div>
            <img class="item-mark" src="../assets/img-009.png">
          </div>
        </label>
      </div>
      <div class="fixed-bottom-block" v-show="tabList1.total >0">
        <button type="primary" class="weui-btn weui-btn_primary" :disabled="submiting"  @click="sentCoupon">发送现金券码到手机</button>
      </div>
    </div>
    <div class="tab-cont-item" v-show="tabIndex === 2">
      <div class="coupon-list">
        <div class="coupon-list-item gray" v-for="item in tabList2.rowsObject" :id="item.id">
          <div class="item-value">
            <span>￥{{item.couponValue}}</span>
            <img class="item-gap" src="../assets/img-004.jpg">
          </div>
          <div class="item-main">
            <span selectable class="item-tit text-wrap2">{{item.couponCode}}</span>
            <div class="item-desc">
              <div>失效时间：{{item.effectTime}}</div>
            </div>
          </div>
          <img class="item-mark" src="../assets/img-008.png">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import tooltips from 'components/Tooltips'
import qs from 'qs'
import localStorage from '../localStorage'

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var index=window.location.hash.lastIndexOf('?')||0;
     var r = window.location.hash.substr((index+1)).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

export default {
  name: 'coupon-list',
  components:{
    tooltips
  },
  data () {
    return {
        tabIndex: 0,
        couponCodes:[],
        userInfo:[],
        submiting: false,
        info:{},
        tabList0: {rowsObject:[]},
        tabList1: {rowsObject:[]},
        tabList2: {rowsObject:[]},
        tipsType:'warn',
        topTipsText: 'Welcome',
        tipsShow:false,
        times:3000
    }
  },
  created:function() {
    this.userInfo=localStorage.getLocalStorage();
    let queryId=GetQueryString('id');
   window.document.title='现金券';

    axios.get(this.$store.state.url.getCouponList,{
          params:{
            clientId:this.userInfo.id,
            rows:50,
            state:1,
            applyId:queryId
          }
        }).then((res) => {
          //console.log(objs);
          if(res.data.success){
              this.tabList0 = res.data.data;
              if (this.tabList0.rowsObject[0]) {
                this.info=this.tabList0.rowsObject[0];
              }
             //console.log(objs);
          }else{
              this.tabList0={rowsObject:[]};
          }
         
        }).catch((error)=>{
          console.log(error);
        });
    axios.get(this.$store.state.url.getCouponList,{
          params:{
            clientId:this.userInfo.id,
            rows:50,
            state:0,
            applyId:queryId
          }
        }).then((res) => {
          //console.log(objs);
          if(res.data.success){
              this.tabList1 = res.data.data;
              if (this.tabList1.rowsObject[0]) {
                this.info=this.tabList1.rowsObject[0];
              }
             //console.log(objs);
          }else{
              this.tabList1={rowsObject:[]};
          }
         
        }).catch((error)=>{
          console.log(error);
        });
    axios.get(this.$store.state.url.getCouponList,{
          params:{
            clientId:this.userInfo.id,
            rows:50,
            state:2,
            applyId:queryId
          }
        }).then((res) => {
          //console.log(objs);
          if(res.data.success){
              this.tabList2 = res.data.data;
              if (this.tabList2.rowsObject[0]) {
                this.info=this.tabList2.rowsObject[0];
              }
             //console.log(objs);
          }else{
              this.tabList2={rowsObject:[]};
          }
         
        }).catch((error)=>{
          console.log(error);
        });
    
  },
  methods:{
    
    tabClick(vel){
      
      this.tabIndex=vel;
    },
    checkboxChange:function(obj_item){
      //console.log(e);
      //this.couponCodes.
      if(typeof obj_item.checked =='undefined'){
        this.$set(obj_item,"checked",true);
      }else{
        obj_item.checked=!obj_item.checked;
      }
    },
    sentCoupon:function(){
      var _this=this;
      this.couponCodes=[];
      this.tabList1.rowsObject.forEach(function(obj_item,index){
        if (obj_item.checked){
          _this.couponCodes.push(obj_item.couponCode);
        }
      });
      if (this.couponCodes.length===0) {
        this.topTipsText='请选择要发送的现金券码!';
        this.tipsShow=true;
        return;
      }
      //this.userInfo.id
      let formData={
        couponCodes:this.couponCodes.join(','),
        clientId:9,
        rows:50
      }
      console.log(formData);
      axios.request({
          url: this.$store.state.url.sentCouponInfo,
          method:'post',
          headers:{'content-type': 'application/x-www-form-urlencoded'},
          data:qs.stringify(formData)
        }).then((res) => {
          //console.log(res.data);
          if (res.data.success) {
            this.times=5000;
            this.tipsType='success';

            this.topTipsText=res.data.message || '现金券码已发送到您的手机';
            this.tipsShow=true;
            
          }else{
            this.topTipsText=res.data.message;
            this.tipsShow=true;
          }
          //this.nubs = res.data.data;
        }).catch((error)=>{
          console.log(error);
        });
      //console.log(this.couponCodes);
    },
    onMyShow(val){
      this.tipsShow=val;
      if(!val){
        this.times=3000;
        this.tipsType='warn';
      }
    }
  },
  computed:{

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
        .fixed-bottom-block{
            background-color: rgba(255, 255, 255, .8);
            padding:0 10px;
            overflow:hidden;
        }
.check{
  width: 28px;
  height: 15px;
} 
.check input{
  width: 20px;
  height: 15px;

}
</style>
