

<template>  
    <div>
      <router-link to="/user-info" class="user-card margin-b">
        <img class="_thumb" src="../assets/avatar.png">
        <div class="_main">
          <div class="h3">{{userInfo.partnerName}}</div>
          <div>手机号码：{{userInfo.mobilePhone}}</div>
        </div>
        <div class="weui-cell__ft_in-access"></div>
      </router-link>
      <div class="weui-cells weui-cells_after-title margin-b">
        <router-link to="/user-feedback-list" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <div class="weui-cell__hd">
            <img class="weui-cell__icon" src="../assets/icon-13.jpg">
          </div>
          <div class="weui-cell__bd">我的申述</div>
          <div class="weui-cell__ft weui-cell__ft_in-access">
            <div class="weui-badge" v-show="feedbackUnRead > 0">{{feedbackUnRead}}</div>
          </div>
        </router-link>
        <router-link to="/user-notice-list" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <div class="weui-cell__hd">
            <img class="weui-cell__icon" src="../assets/icon-14.jpg">
          </div>
          <div class="weui-cell__bd">我的公告</div>
          <div class="weui-cell__ft weui-cell__ft_in-access">
            <div class="weui-badge" v-show="noticeUnRead > 0">{{noticeUnRead}}</div>
          </div>
        </router-link>
        <router-link to="/user-pwd" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <div class="weui-cell__hd">
            <img class="weui-cell__icon" src="../assets/icon-15.jpg">
          </div>
          <div class="weui-cell__bd">修改密码</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </router-link>
        <div bindtap="callPhone" hover class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <div class="weui-cell__hd">
            <img class="weui-cell__icon" src="../assets/icon-16.jpg">
          </div>
          <div class="weui-cell__bd">客户热线</div>
          <a class="weui-cell__ft weui-cell__ft_in-access" href="tel:13802510950">400-816-2882</a>
        </div>
      </div>
      <div class="weui-cells weui-cells_after-title">
        <div @click="exit()" hover class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <div class="weui-cell__hd">
            <img class="weui-cell__icon" src="../assets/icon-17.jpg">
          </div>
          <div class="weui-cell__bd" >退出</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
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
            <router-link to="/bonus-list" class="weui-tabbar__item">
                <img src="../assets/icon-04.png" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label">我的分红</p>
            </router-link>
            <router-link to="/user" class="weui-tabbar__item weui-bar__item_on">
                <img src="../assets/icon-05-h.png" alt="" class="weui-tabbar__icon">
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
  name: 'user',
  components:{
    
  },
  data () {
    return {
      userInfo: {},
      feedbackUnRead:0,
      noticeUnRead:0
    }
  },
  created:function() {
    window.document.title='个人中心';
    this.userInfo=localStorage.getLocalStorage();
    // 获取公告等信息
    axios.get(this.$store.state.url.getPCSummaryInfo,{
          params:{
            clientId:this.userInfo.id,
            rows:50
          }
        }).then((res) => {
          //console.log(res.data.data);
          this.noticeUnRead = res.data.data.noticeUnRead;
          this.feedbackUnRead=res.data.data.feedbackUnRead;
        }).catch((error)=>{
          console.log(error);
        });
      
  },
  methods:{
   
    exit:function(){
       localStorage.setLocalStorage([]);
       this.$router.push('/login');
    }
  },
  computed:{

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .user-card{
    display: flex;
    align-items:center;
    background-image: linear-gradient(to top right, #393a3e, #4083c7);
    padding: 25px 15px;
    color: #fff;
}

.user-card ._thumb{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255, 0.8);
    margin-right: 15px;
}

.user-card ._main{
    flex: 1;
}

.weui-badge{
    display:block;
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
