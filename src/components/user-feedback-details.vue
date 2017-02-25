

<template>  
   <div class="page" style="padding-bottom: 100rpx;">
    <tooltips v-bind:text="topTipsText" :duration="times" v-bind:isShow.sync="tipsShow" @on-my-show="onMyShow"></tooltips>
    <div class="chat-list">
      <div class="chat-item chat-item-me" >
        <div class="_avatar">
          <img v-bind:src="userInfo.wxHeadPhoto || require('../assets/avatar.png')">
        </div>
        <div class="_text">
          <div class="_msg">{{feedBackDetail.content}}</div>
        </div>
      </div>
      <div :class="{'chat-item':true, 'chat-item-me':(item.replyType == 1), 'chat-item-other':(item.replyType != 1)}" v-for=" item  in feedBackDetail.feedBackReplyPage.rowsObject" :id="item.id">
        <div class="_avatar">
          <img :src="item.replyType == 1 ? userInfo.wxHeadPhoto: require('../assets/kefu.jpg') ">
        </div>
        <div class="_text">
          <div class="_msg">{{item.replyCont}}</div>
        </div>
      </div>
    </div>

    <div class="send-form border-t">
      <div class="send-input">
        <input id="replyCont" class="weui-input" v-on:change="inputChange" maxlength="1000" :value="formData.replyCont" placeholder="说点什么..." />
      </div>
      <button type="primary" class="weui-btn weui-btn_primary" size="mini" :disabled="submiting" @click="submit()">发送</button>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import tooltips from 'components/Tooltips.vue'
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
  name: 'user-feedback-details',
  components:{
    tooltips
  },
  data () {
    return {
      formData:{
        replyCont:'',
        feedBackId:0,
        clientId:0,
        rows:50
      },
      userInfo:{},
      feedBackDetail: {
        feedBackReplyPage:{
          rowsObject:[]
        }
      },
      topTipsText: 'Welcome',
      tipsShow:false,
      submiting:false,
      times:3000

    }
  },
  created:function() {
    window.document.title='申述详情';
    this.userInfo=localStorage.getLocalStorage();
    this.formData.feedBackId=GetQueryString('id');
    // 获取申述信息
    axios.get(this.$store.state.url.getMyFeedBackDetail,{
          params:{
            feedBackId:this.formData.feedBackId,
            clientId:this.userInfo.id,
            rows:50
          }
        }).then((res) => {
          //console.log(res.data.data);
          this.feedBackDetail = res.data.data;
         
        }).catch((error)=>{
          console.log(error);
        });
      
  },
  methods:{
    inputChange(e){
        let key = e.target.id
        let value = e.target.value
        if(this.formData[key]!=undefined){
          this.formData[key]=value;
          //console.log(this.formData[key])
        }
    },
    submit(){
      let formData=this.formData;
      let chatListData = this.feedBackDetail.feedBackReplyPage.rowsObject;
      if(!formData.replyCont){
        this.topTipsText='请输入回复内容';
        this.tipsShow=true;
        return;
      }
      this.submiting=true;
      chatListData.push({
            replyType: 1,
            replyCont: formData.replyCont,
            loading: true
      });
      formData.clientId=this.userInfo.id;
      axios.request({
          url: this.$store.state.url.replyFeedBack,
          method:'post',
          headers:{'content-type': 'application/x-www-form-urlencoded'},
          data:qs.stringify(formData)
        }).then((res) => {
          //console.log(res.data);
          if (res.data.success) {
            this.submiting=false;
            formData.replyCont='';
            this.feedBackDetail.feedBackReplyPage.rowsObject=chatListData;

          }else{
            this.topTipsText=res.data.message;
            this.tipsShow=true;
          }
          //this.nubs = res.data.data;
        }).catch((error)=>{
          console.log(error);
        });
    },
    onMyShow(val){
      this.tipsShow=val;
    }
  },
  computed:{

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
    background-color:#f8f8f8; 
}
.send-form {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 1);
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.send-input {
  flex: 1;
}

.send-form button {
  margin-left: 10px;
  width: 90px;
}

.chat-list{
    margin: 0 7px;
}
.chat-item {
  display: flex;
  margin: 15px 0;
}

.chat-item ._avatar {
  width: 35px;
  height: 35px;
  border: 1px solid #e4e4e4;
  background-color: #fff;
}

.chat-item ._avatar img {
  width: 100%;
  height: 100%;
}

.chat-item ._name {
  color: #999;
  font-size: 12px;
  margin: 0 15px;
}

.chat-item ._text {
  flex: 1;
}

.chat-item ._msg {
  display: inline-block;
  border: 1px solid #6fb44d;
  border-radius: 6rpx;
  padding: 7px;
  position: relative;
  font-size: 14px;
  background-color: #a0e75a;
  color: #0f1608;
  margin-left: 15px;
  max-width: 80%;
  text-align: left;
  word-break: break-all;
}

.chat-item ._msg::before, .chat-item ._msg::after {
  content: '';
  position: absolute;
  border-style: solid;
  border-color: transparent;
}
.chat-item ._msg::before {
  left: -20px;
  top: 9px;
  border-width: 10px;
  border-right-color: #6fb44d;
}
.chat-item ._msg::after {
  left: -18px;
  top: 10px;
  border-width: 9px;
  border-right-color: #a0e75a;
}

.chat-item-other ._msg {
  max-width: 65%;
  border-color: #ccc;
  background-color: #fff;
}
.chat-item-other ._msg::before {
  border-right-color: #ccc;
}

.chat-item-other ._msg::after {
  border-right-color: #fff;
}

.chat-item-me {
  text-align: right;
  flex-direction: row-reverse;
}

.chat-item-me ._msg {
  max-width: 65%;
  margin-right: 15px;
  margin-left: auto;
}
.chat-item-me ._msg::before {
  left: auto;
  right: -20px;
  border-right-color: transparent;
  border-left-color: #6fb44d;
}
.chat-item-me ._msg::after {
  left: auto;
  right: -18px;
  border-right-color: transparent;
  border-left-color: #a0e75a;
}



</style>
