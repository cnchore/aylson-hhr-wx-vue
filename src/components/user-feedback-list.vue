

<template>  
   <div class="page" style="padding-bottom: 152rpx;">
    <div class="weui-panel">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells weui-cells_in-small-appmsg">
            <router-link v-for="item in feedBackList.rowsObject" :id="item.id" :to="'/user-feedback-details?id='+item.id" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            
              <div class="weui-cell__bd weui-cell_primary">
                <div>{{item.title}}</div>
              </div>
              <div class="weui-cell__ft weui-cell__ft_in-access">
                <div class="weui-badge weui-badge_dot" v-show="item.state != 4 && item.state != 1"></div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <router-link to="/user-feedback-add" class="fixed-bottom-block">
      <button type="primary" class="weui-btn weui-btn_primary" >我要申述</button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'

import qs from 'qs'
import localStorage from '../localStorage'

export default {
  name: 'user-feedback-list',
  components:{
    
  },
  data () {
    return {
      feedBackList: {}
    }
  },
  created:function() {
    window.document.title='我的申诉';
    var userInfo=localStorage.getLocalStorage();
    // 获取公告等信息
    axios.get(this.$store.state.url.getMyFeedBackList,{
          params:{
            clientId:userInfo.id,
            rows:50
          }
        }).then((res) => {
          //console.log(res.data.data);
          this.feedBackList = res.data.data;
         
        }).catch((error)=>{
          console.log(error);
        });
      
  },
  methods:{
   
  },
  computed:{

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fixed-bottom-block{
   padding: 0 10px;
}

</style>
