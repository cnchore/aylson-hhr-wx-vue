

<template>  
<div class="page">
  <div class="tab-tit sticky">
    <div :class="{'tab-tit-item':true, 'active':(tabIndex === 0)}"  v-on:click="tabClick(0)">安全门</div>
    <div :class="{'tab-tit-item':true, 'active':(tabIndex === 1)}"  v-on:click="tabClick(1)">安全窗</div>
    <div :class="{'tab-tit-item':true, 'active':(tabIndex === 2)}"  v-on:click="tabClick(2)">阳光房</div>
  
  </div>
  <div class="tab-cont">
    <div class="tab-cont-item" v-show="tabIndex === 0">
      <div class="list">
        <div class="list-item" v-for="item in tabList0.rowsObject" :id="item.id">
          <div>订单编号：{{item.orderNo}}</div>
          <div>订单类型：安全门</div>
          <div>下单日期：{{item.createTime}}</div>
          <div>订单状态：<span class="text-link">{{state[item.state]}}</span></div>
        </div>
      </div>
    </div>
    <div class="tab-cont-item" v-show="tabIndex === 1">
      <div class="list">
        <div class="list-item" v-for="item in tabList1.rowsObject" :id="item.id">
          <div>订单编号：{{item.orderNo}}</div>
          <div>订单类型：安全窗</div>
          <div>下单日期：{{item.createTime}}</div>
          <div>订单状态：<text class="text-link">{{state[item.state]}}</text></div>
        </div>
      </div>
    </div>
    <div class="tab-cont-item" v-show="tabIndex === 2">
      <div class="list">
        <div class="list-item" v-for="item in tabList2.rowsObject" :id="item.id">
          <div>订单编号：{{item.orderNo}}</div>
          <div>订单类型：阳光房</div>
          <div>下单日期：{{item.createTime}}</div>
          <div>订单状态：<text class="text-link">{{state[item.state]}}</text></div>
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
  name: 'customer-order',
  components:{
    
  },
  data () {
    return {
       tabIndex: 0,
        info: {},
        tabList0: {rowsObject:[]},
        tabList1: {rowsObject:[]},
        tabList2: {rowsObject:[]},
        state: [,'确认订单', '生产完成','产品入库中', '产品出库','已经发货']
     
    }
  },
  created:function() {
    var userInfo=localStorage.getLocalStorage();
    let phone=GetQueryString('phone');
    // 获取公告等信息
   window.document.title='客户订单';

    axios.get(this.$store.state.url.getClientOrderList,{
          params:{
            clientId:userInfo.id,
            rows:50,
            mobilePhone:phone,
            designType:1
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
    axios.get(this.$store.state.url.getClientOrderList,{
          params:{
            clientId:userInfo.id,
            rows:50,
            mobilePhone:phone,
            designType:2
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
    axios.get(this.$store.state.url.getClientOrderList,{
          params:{
            clientId:userInfo.id,
            rows:50,
            mobilePhone:phone,
            designType:3
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
 .list{
            margin-top: -1px;
        }
        .list-item{
            padding: 10px 0;
            border-bottom:1px solid #D9D9D9;
        }
        .list-item:last-child{
            border-bottom-color: transparent;
        }


</style>
