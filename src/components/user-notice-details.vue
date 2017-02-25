

<template>  
<div class="page">
  <div class="weui-article">
    <div class="article-hd">
      <div class="_tit">{{noticeDetail.title}}</div>
      <div class="_desc">{{noticeDetail.publishTime}}</div>
    </div>

    <div class="weui-article__section">
      {{noticeDetail.content}}
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
  name: 'user-notice-details',
  components:{
    
  },
  data () {
    return {
      noticeDetail: {
      }
    }
  },
  created:function() {
    window.document.title='公告详情';
    var userInfo=localStorage.getLocalStorage();
    let noticeId=GetQueryString('id');
    // 获取公告信息
    axios.get(this.$store.state.url.getNoticeDetail,{
          params:{
            clientId:userInfo.id,
            rows:50,
            noticeId:noticeId
          }
        }).then((res) => {
          //console.log(res.data.data);
          this.noticeDetail = res.data.data;
         
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

.weui-article{
    background-color: #fff;
}
.article-hd {
border-bottom:1px solid #d9d9d9;
padding-bottom:15px;
margin-bottom:15px;

}

.article-hd ._tit {
font-size:17px;
font-weight:500;
line-height:1.4;
}
.article-hd ._desc {
margin-top:3px;
font-size:14px;
color:#b2b2b2;
}
</style>
