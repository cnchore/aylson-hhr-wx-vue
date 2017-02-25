
<template>  
  <div class="page">
    <div class="tab-tit sticky">
    <div :class="{'tab-tit-item':true, 'active':(tabIndex === 0)}"  v-on:click="tabClick(0)">已提交</div>
    <div :class="{'tab-tit-item':true, 'active':(tabIndex === 1)}"  v-on:click="tabClick(1)">已核发</div>
    <div :class="{'tab-tit-item':true, 'active':(tabIndex === 2)}"  v-on:click="tabClick(2)">已退回</div>
  
    </div>

    <div class="tab-cont-item" v-show="tabIndex === 0">
      <div class="coupon-list">
        <div class="coupon-list-item" v-for="item in tabList0.rowsObject" :id="item.id">
          <div class="item-value">
            <span>￥{{item.couponValue}}</span>
            <img class="item-gap" src="../assets/img-004.jpg">
          </div>
          <div class="item-main">
            <div class="item-tit text-wrap2">{{item.ownerName}}</div>
            <div class="item-desc">
              <div>客户手机号：{{item.ownerPhone}}</div>
              <div>申请数量：{{item.applyNum}}</div>
              <div>申请时间：{{item.applyTime}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-cont-item" v-show="tabIndex === 1">
      <div class="coupon-list">
        <div class="coupon-list-item __link" v-for="item in tabList1.rowsObject" :id="item.id">
          <router-link :to="'/coupon-list?id='+item.id" >
            <div class="item-value">
              <span>￥{{item.couponValue}}</span>
              <img class="item-gap" src="../assets/img-004.jpg">
            </div>
            <div class="item-main">
              <div class="item-tit text-wrap2">{{item.ownerName}}</div>
              <div class="item-desc">
                <div>客户手机号：{{item.ownerPhone}}</div>
                <div>申请数量：{{item.applyNum}}</div>
                <div>核发时间：{{item.auditTime}}</div>
              </div>
            </div>
            <img class="item-mark" src="../assets/img-011.png">
          </router-link>
        </div>
      </div>
    </div>
    <div class="tab-cont-item" v-show="tabIndex === 2">
      <div class="coupon-list">
        <div class="coupon-list-item" v-for="item in tabList2.rowsObject" :id="item.id">
          <div class="item-value">
            <span>￥{{item.couponValue}}</span>
            <img class="item-gap" src="../assets/img-004.jpg">
          </div>
          <div class="item-main">
            <div class="item-tit text-wrap2">{{item.ownerName}}</div>
            <div class="item-desc">
              <div>客户手机号：{{item.ownerPhone}}</div>
              <div>申请数量：{{item.applyNum}}</div>
              <div>申请时间：{{item.applyTime}}</div>
            </div>
          </div>
          <img class="item-mark" src="../assets/img-010.png">
        </div>
      </div>
    </div>
    <div class="menu-fixed-btn">
      <router-link  to="/coupon-apply">
        <span>添加</span>
      </router-link>
    </div>
    <div class="weui-tabbar">
            <router-link to="/" class="weui-tabbar__item">
                <span style="display: inline-block;position: relative;">
                  <img src="../assets/icon-01.png" alt="" class="weui-tabbar__icon">
                </span>
                <p class="weui-tabbar__label">首页</p>
            </router-link>
           <router-link to="/coupon-apply-list" class="weui-tabbar__item weui-bar__item_on">
                <img src="../assets/icon-02-h.png" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label">现金券</p>
            </router-link>
            <router-link to="/customer-list"  class="weui-tabbar__item">
                <span style="display: inline-block;position: relative;">
                 <img src="../assets/icon-03.png" alt="" class="weui-tabbar__icon">
                       
                </span>
                <p class="weui-tabbar__label">我的客户</p>
            </router-link>
            <router-link to="/bonus-list" class="weui-tabbar__item">
                <img src="../assets/icon-04.png" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label">我的分红</p>
            </router-link>
            
              <router-link to="/user" class="weui-tabbar__item">
                  <img src="../assets/icon-05.png" alt="" class="weui-tabbar__icon">
                  <p class="weui-tabbar__label">个人中心</p>
              </router-link>
           
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
  name: 'coupon-apply-list',
  components:{
    
  },
  data () {
    return {
        tabIndex: 0,
   
        tabList0: {rowsObject:[]},
        tabList1: {rowsObject:[]},
        tabList2: {rowsObject:[]}
    }
  },
  created:function() {
    var userInfo=localStorage.getLocalStorage();
    
   window.document.title='现金券';

    axios.get(this.$store.state.url.getCouponApplyList,{
          params:{
            clientId:userInfo.id,
            rows:50,
            state:0
          }
        }).then((res) => {
          //console.log(objs);
          if(res.data.success){
              this.tabList0 = res.data.data;
             //console.log(objs);
          }else{
              this.tabList0={rowsObject:[]};
          }
         
        }).catch((error)=>{
          console.log(error);
        });
    axios.get(this.$store.state.url.getCouponApplyList,{
          params:{
            clientId:userInfo.id,
            rows:50,
            state:1
          }
        }).then((res) => {
          //console.log(objs);
          if(res.data.success){
              this.tabList1 = res.data.data;
             //console.log(objs);
          }else{
              this.tabList1={rowsObject:[]};
          }
         
        }).catch((error)=>{
          console.log(error);
        });
    axios.get(this.$store.state.url.getCouponApplyList,{
          params:{
            clientId:userInfo.id,
            rows:50,
            state:2
          }
        }).then((res) => {
          //console.log(objs);
          if(res.data.success){
              this.tabList2 = res.data.data;
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
    }
  },
  computed:{

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
        .coupon-list-item {
        margin: 15px;
        background-color: #fff;
        }

        .coupon-list-item.link {
        border: none;
        }

        .menu-fixed-btn {
        position: fixed;
        bottom: 85px;
        right: 15px;
        width: 50px;
        height: 50px;
        }

        .menu-fixed-btn img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        opacity: 0.8;
        }

        .menu-fixed-btn span {
        display: table-cell;
        width: 50px;
        height: 50px;
        background-color: #4083c7;
        opacity: 0.8;
        color: #fff;
        border-radius: 50%;
        vertical-align: middle;
        text-align: center;
        }

</style>
