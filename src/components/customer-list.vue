

<template>  
<div class="page">
  <div class="weui-panel weui-panel_access">
    <div class="weui-panel__bd">
      <router-link :to="'/customer-coupon?phone='+item.ownerPhone" class="weui-media-box weui-media-box_appmsg rel" hover-class="weui-cell_active" v-for="item in clientList.rowsObject" :id="item.id">
        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
          <div class="weui-media-box__title">姓名：{{item.ownerName}}</div>
          <div class="weui-media-box__desc text-wrap1">手机号码：{{item.ownerPhone}}</div>
          <div class="weui-media-box__desc text-wrap1">联系地址：{{(item.province+item.city+item.area+item.street+item.unit) || ''}}</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        <img class="customer-list-mark" :src="require('../assets/img-00'+(item.orderNum > 0 ? 2 : 1)+'.png')" >
      </router-link>
    </div>
  </div>

        <div class="weui-tabbar">
            <router-link to="/" class="weui-tabbar__item">
                <span style="display: inline-block;position: relative;">
                        <img src="../assets/icon-01.png" alt="" class="weui-tabbar__icon">
                        
                </span>
                <p class="weui-tabbar__label">首页</p>
            </router-link>
           <router-link to="/coupon-apply-list" class="weui-tabbar__item">
                <img src="../assets/icon-02.png" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label">现金券</p>
            </router-link>
            <router-link to="/customer-list"  class="weui-tabbar__item weui-bar__item_on">
                <span style="display: inline-block;position: relative;">
                 <img src="../assets/icon-03-h.png" alt="" class="weui-tabbar__icon">
                       
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

export default {
  name: 'customer-list',
  components:{
    
  },
  data () {
    return {
      clientList: {
        rowsObject:[]
      }
    }
  },
  created:function() {
    var userInfo=localStorage.getLocalStorage();
    // 获取公告等信息
    axios.get(this.$store.state.url.getClientList,{
          params:{
            clientId:userInfo.id,
            rows:50
          }
        }).then((res) => {
          //console.log(res.data.data);
          this.clientList = res.data.data;
         
        }).catch((error)=>{
          console.log(error);
        });
    window.document.title='我的客户';  
  },
  methods:{
   
  },
  computed:{

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .weui-media-box.rel{
            z-index: 0;
        }
        .customer-list-mark{
            position: absolute;
            bottom: 0;
            right: 0;
            width: 50px;
            height: 44px;
            z-index: -1;
        } 
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
