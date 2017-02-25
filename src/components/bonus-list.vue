

<template>  
 <div class="page">
  
  <div class="tab-tit sticky">
    <div :class="{'tab-tit-item':true, 'active':(tabIndex === 0)}"  v-on:click="tabClick(0)">应得分红</div>
    <div :class="{'tab-tit-item':true, 'active':(tabIndex === 1)}"  v-on:click="tabClick(1)">已得分红</div>
  </div>

  <div class="tab-cont-item margin-t" v-show="tabIndex === 0">
    <router-link :to="'/bonus-details?id='+item.id" class="panel margin-b fs-s" hover-class="panel-active" v-for="item in tabList0.rowsObject" :id="item.id">
      <div class="panel-tit weui-flex __link">
        <div class="weui-flex__item">
          <span class="panel-tit-txt gray">{{item.description}}</span>
        </div>
      </div>
      <div class="panel-cont weui-flex border-t">
        <div class="weui-flex__item">
          <span class="panel-tit-txt">销售金额：{{item.contractAmount}}</span>
        </div>
        <div class="weui-flex__item text-right">
          <span class="panel-tit-txt">应得分红：{{item.wallet}}</span>
        </div>
      </div>
    </router-link>
  </div>
  <div class="tab-cont-item margin-t" v-show="tabIndex === 1">
    <div :class="{'panel weui-flex padding':true, 'border-t':(tabIndex > 0)}" v-for="item in tabList1.rowsObject" :id="item.id">
      <div class="weui-flex__item">
        <span class="panel-tit-txt">已得分红：{{Math.abs(item.wallet)}}</span>
      </div>
      <div class="weui-flex__item text-right">
        <span class="panel-tit-txt text-gray fs-s">{{item.createTime}}</span>
      </div>
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
            <router-link to="/customer-list"  class="weui-tabbar__item">
                <span style="display: inline-block;position: relative;">
                 <img src="../assets/icon-03.png" alt="" class="weui-tabbar__icon">
                       
                </span>
                <p class="weui-tabbar__label">我的客户</p>
            </router-link>
            <router-link to="/bonus-list" class="weui-tabbar__item  weui-bar__item_on">
                <img src="../assets/icon-04-h.png" alt="" class="weui-tabbar__icon">
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
  name: 'bonus-list',
  components:{
    
  },
  data () {
    return {
      tabIndex: 0,
      tabList0: {rowsObject:[]},
      tabList1: {rowsObject:[]}
    }
  },
  created:function() {
    var userInfo=localStorage.getLocalStorage();
    
    // 获取已得分红信息
    
      axios.get(this.$store.state.url.getBonusHadList,{
          params:{
            clientId:userInfo.id,
            rows:50
          }
        }).then((res) => {
          //console.log(res.data.data);
          this.tabList1 = res.data.data;
         
        }).catch((error)=>{
          console.log(error);
        });
   // 获取应得分红信息
      axios.get(this.$store.state.url.getBonusList,{
          params:{
            clientId:userInfo.id,
            rows:50
          }
        }).then((res) => {
          //console.log(res.data.data);
          this.tabList0 = res.data.data.billDetail;
         
        }).catch((error)=>{
          console.log(error);
        });
     window.document.title='我的分红';
  },
  methods:{
    tabClick(vel){
      //console.log('e:'+vel);
      this.tabIndex=vel;
    }
  },
  computed:{

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  

.panel.margin-b.fs-s span{
  color: #555;
  font-size: 15px;
}

.panel-tit,.panel-cont{
  background-color: #fff;
}
.panel-cont{
  margin-bottom: 15px;
}

</style>
