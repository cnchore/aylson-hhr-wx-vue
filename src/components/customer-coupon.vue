

<template>  
<div class="page">
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
      <!--<div class="text-tr">
        <span class="text-tt">注册</span>
        <span class="text-td">{{info.createTime}}</span>
      </div>-->
    </div>
  </div>
  <div class="weui-cells weui-cells_after-title">
    <router-link :to="'/customer-order?phone='+phone" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
      <div class="weui-cell__bd">客户订单</div>
      <div class="weui-cell__ft weui-cell__ft_in-access"></div>
    </router-link>
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
            <div class="item-tit text-wrap2">{{item.applyCouponName}}</div>
            <div class="item-desc">
              <div>订单号：{{item.orderCode}}</div>
              <div>使用时间：{{item.updateTime}}</div>
            </div>
          </div>
          <img class="item-mark" src="../assets/img-003.png">
        </div>
      </div>
    </div>
    <div class="tab-cont-item" v-show="tabIndex === 1">
      <div class="coupon-list">
        <div class="coupon-list-item" v-for="item in tabList1.rowsObject" :id="item.id">
          <div class="item-value">
            <span>￥{{item.couponValue}}</span>
            <img class="item-gap" src="../assets/img-004.jpg">
          </div>
          <div class="item-main">
            <div class="item-tit text-wrap2">{{item.applyCouponName}}</div>
            <div class="item-desc">
              <div>有效时间：{{item.effectTime}}</div>
            </div>
          </div>
          <img class="item-mark" src="../assets/img-009.png">
        </div>
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
            <div class="item-tit text-wrap2">{{item.applyCouponName}}</div>
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
  name: 'customer-coupon',
  components:{
    
  },
  data () {
    return {
      phone:'',
      tabIndex: 0,
      info: {},
      tabList0: {rowsObject:[]},
      tabList1: {rowsObject:[]},
      tabList2: {rowsObject:[]}
    }
  },
  created:function() {
    let userInfo=localStorage.getLocalStorage();
    this.phone=GetQueryString('phone');
    
      //已使用 state 1
      axios.get(this.$store.state.url.getClientCouponList,{
          params:{
            clientId:userInfo.id,
            rows:50,
            ownerPhone:this.phone,
            state:1
          }
        }).then((res) => {
          //console.log(res.data.data);
          if(res.data.success){
            this.tabList0 = res.data.data;
            if (this.tabList0.rowsObject[0]) {
              this.info=this.tabList0.rowsObject[0];
            }
          }
        }).catch((error)=>{
          console.log(error);
        });
        //未使用 state 0
        axios.get(this.$store.state.url.getClientCouponList,{
            params:{
              clientId:userInfo.id,
              rows:50,
              ownerPhone:this.phone,
              state:0
            }
          }).then((res) => {
            //console.log(res.data.data);
            if(res.data.success){
              this.tabList1 = res.data.data;
              if (this.tabList1.rowsObject[0]) {
                this.info=this.tabList1.rowsObject[0];
              }            
            }
          }).catch((error)=>{
            console.log(error);
          });
        //已失效 state 2
        axios.get(this.$store.state.url.getClientCouponList,{
            params:{
              clientId:userInfo.id,
              rows:50,
              ownerPhone:this.phone,
              state:2
            }
          }).then((res) => {
            //console.log(res.data.data);
            if(res.data.success){
              this.tabList2 = res.data.data;
              if (this.tabList2.rowsObject[0]) {
                this.info=this.tabList2.rowsObject[0];
              }
            }
          }).catch((error)=>{
            console.log(error);
          });

    //设置标题
    window.document.title='客户现金券';  
  },
  methods:{
    tabClick(vel){
      
      this.tabIndex=vel;
    }
  },
  computed:{

    
  },
  watch:{
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weui-cell__ft_in-access {
  padding-right: 13px;
  position: relative;
}
.weui-cell__ft_in-access:after {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 2px;
}

</style>
