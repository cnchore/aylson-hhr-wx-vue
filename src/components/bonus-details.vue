

<template>  
<div class="page">
  <div class="panel margin-b sticky border-b">
    <div class="panel-tit weui-flex">
      <div class="weui-flex__item">
        <span class="panel-tit-txt">应得分红：{{productList.partnerWalletBillVo.wallet}} 元</span>
      </div>
      <!--<div class="weui-flex__item text-right">
        <span class="panel-tit-txt">已得分红：666.66 元</span>
      </div>-->
    </div>
  </div>
  <div class="weui-cells__title">订单信息</div>
  <div class="panel margin-b">
    <div class="panel-cont text-table border-b">
      <div class="text-tr">
        <span class="text-tt">订单编号</span>
        <span class="text-td">{{productList.orderVo.orderNo}}</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">客户姓名</span>
        <span class="text-td">{{productList.quotationVo.clientName}}</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">手机号码</span>
        <span class="text-td">{{productList.quotationVo.clientPhone}}</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">客户地址</span>
        <span class="text-td">{{productList.quotationVo.clientAddress}}</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">下单时间</span>
        <span class="text-td">{{productList.orderVo.createTime}}</span>
      </div>
    </div>
    <div class="panel-cont text-table border-b">
      <div v-for="item in productList.couponList" :id="item.id">
        <span class="fr">￥{{item.couponValue}}</span>现金券编号：{{item.couponCode}}
      </div>
    </div>
    <div class="panel-cont">
      <div>合同总金额：{{productList.quotationVo.salesAmount}}元</div>
    </div>
  </div>

  <div class="weui-cells__title">产品信息</div>
  <div class="panel fs-s">
    <div class="panel-cont text-table product-info" v-for="item in srvoOrDwvoList" :id="item.id">
      <div class="text-tr">
        <span class="text-tt">产品名称</span>
        <span class="text-td">{{item.productName || '阳光房-'+structure[item.structure]}}</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">产品型号</span>
        <span class="text-td">{{item.productNo}}</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">单价</span>
        <span class="text-td">{{item.salesUnitPrice}}元</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">数量</span>
        <span class="text-td">{{item.pruductNum}}</span>
      </div>
      <div class="text-tr">
        <span class="text-tt">销售金额</span>
        <span class="text-td">{{item.salesUnitAmount}}元</span>
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
  name: 'bonus-details',
  components:{
    
  },
  data () {
    return {
       structure: [, '钢结构', '主立柱', '靠墙立柱', '次立柱', '三角面积', '屋顶', '水槽', '水槽堵塞网', '清风双悬推拉门', '95手摇平开窗-固定部分', '95手摇平开窗-扇部分'],
        productList: {
          couponList:{},
          orderVo:[],
          partnerWalletBillVo:{},
          quotationVo:{}
        },
        srvoOrDwvoList:{}
    }
  },
  created:function() {
    var userInfo=localStorage.getLocalStorage();
    let biId=GetQueryString('id');
    // 获取公告信息
    axios.get(this.$store.state.url.getBonusDetail,{
          params:{
            clientId:userInfo.id,
            rows:50,
            billId:biId
          }
        }).then((res) => {
          //console.log(res.data.data);

          this.productList = res.data.data;
          this.srvoOrDwvoList=this.productList.quotationVo.detailDWVoList || this.productList.quotationVo.detailSRVoList;
        }).catch((error)=>{
          console.log(error);
        });
    //修改app高度
    window.document.title='分红明细';
     
  },
  methods:{
   
  },
  computed:{

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-info{
        border-bottom: 1px solid #D9D9D9;
    }
    .product-info:last-child{
        border-bottom-color: transparent;
    }
</style>
