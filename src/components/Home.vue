<template>
   <div class="page">
        <img mode="widthFix" style="display:block;width:100%;" src="../assets/img-012.jpg">
        <div class="panel margin-b">
            <div class="panel-tit border-b">
                <img class="panel-tit-icon" src="../assets/icon-06.jpg">
                <span class="panel-tit-txt">我的分红</span>
            </div>
            <div class="panel-cont">
                <div class="weui-flex text-center">
                    <div class="weui-flex__item">
                        <div>{{nubs.bonusSum || 0}} 元</div>
                        <div>总分红</div>
                    </div>
                    <div class="weui-flex__item">
                        <div>{{Math.abs(nubs.bonusHadSum) || 0}} 元</div>
                        <div>已得分红</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel margin-b">
            <div class="panel-tit border-b">
                <img class="panel-tit-icon" src="../assets/icon-08.jpg">
                <span class="panel-tit-txt">申请现金券</span>
            </div>
            <div class="panel-cont">
                <div class="weui-flex text-center">
                    <div class="weui-flex__item">
                        <div>{{nubs.couponTotalNum || 0}} 张</div>
                        <div>总数量</div>
                    </div>
                    <div class="weui-flex__item">
                        <div>{{nubs.couponUseNum || 0}} 张</div>
                        <div>已使用</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel margin-b">
            <div class="panel-tit border-b">
                <img class="panel-tit-icon" src="../assets/icon-09.jpg">
                <span class="panel-tit-txt">我的客户</span>
            </div>
            <div class="panel-cont">
                <div class="weui-flex text-center">
                    <div class="weui-flex__item">
                        <div>{{nubs.clientNum || 0}} 人</div>
                        <div>总人数</div>
                    </div>
                    <div class="weui-flex__item">
                        <div>{{nubs.orderClientNum || 0}} 人</div>
                        <div>已成单</div>
                    </div>
                    <div class="weui-flex__item">
                        <div>{{nubs.orderNum || 0}} 单</div>
                        <div>订单数量</div>
                    </div>
                </div>
            </div>
        </div>
      
        <div class="weui-tabbar">
            <router-link to="/" class="weui-tabbar__item weui-bar__item_on">
                <span style="display: inline-block;position: relative;">
                        <img src="../assets/icon-01-h.png" alt="" class="weui-tabbar__icon">
                        
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
import localStorage from '../localStorage'
import tips from 'components/Tooltips'

export default {
  name:'home',
  data () {
    return {
      nubs:{}
    }
  },
  components:{tips},
  created:function() {
    window.document.title='首页';
    var objs= localStorage.getLocalStorage();
    let t=Object.prototype.toString.call(objs).slice(8, -1);
    
    if (t=='Object') {
      axios.get(this.$store.state.url.getSumResult,{
          params:{
            clientId:objs.id,
            rows:50
          }
        }).then((res) => {
          //console.log(res.data.data);
          this.nubs = res.data.data;
        }).catch((error)=>{
          console.log(error);
        });
     }else{
      this.$router.push('/login');
    }
  },
  computed:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
