

<template>  
 <div class="page">
  <div class="weui-panel">
    <div class="weui-panel__bd __link" v-for="item in noticeList.rowsObject" :id="item.id">
      <router-link :to="'/user-notice-details?id='+item.id" class="weui-media-box weui-media-box_text " hover-class="weui-cell_active">
        <div class="weui-media-box__title weui-media-box__title_in-text">
          <div class="weui-badge weui-badge_dot" v-show="!item.isRead"> </div>
          <span>{{item.title}}</span>
        </div>
        <div class="weui-media-box__desc">{{item.content}}</div>
        <div class="weui-media-box__info">
          <div class="weui-media-box__info__meta">{{item.publishTime}}</div>
          <!--<div class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</div>-->
        </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

import qs from 'qs'
import localStorage from '../localStorage'

export default {
  name: 'user-notice-list',
  components:{
    
  },
  data () {
    return {
      noticeList: {
        rowsObject:[]
      }
    }
  },
  created:function() {
    window.document.title='我的公告';
    var userInfo=localStorage.getLocalStorage();
    // 获取公告等信息
    axios.get(this.$store.state.url.getNoticeList,{
          params:{
            clientId:userInfo.id,
            rows:50
          }
        }).then((res) => {
          //console.log(res.data.data);
          this.noticeList = res.data.data;
         
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
  .weui-panel__bd{
    padding-left: 20px;
    border-bottom: 1px solid #ddd;
  }
        .weui-media-box{
            width: 100%; 
            padding:5px;
        }

        .weui-badge_dot {
        
        
        }
        .weui-media-box__title{
           
        }
       .weui-media-box__desc,
       .weui-media-box__info{
            font-size: 16px;  
            padding:7px 0px;
            margin: 0px;

        }


</style>
