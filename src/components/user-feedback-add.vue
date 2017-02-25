

<template>  
   <div class="page" style="padding-bottom: 152rpx;">
    <tooltips v-bind:text="topTipsText" :duration="times" v-bind:isShow.sync="tipsShow" @on-my-show="onMyShow"></tooltips>
    <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__bd">
                    <input class="weui-input" focus id="title" v-on:change="inputChange" maxlength="100" placeholder="请在这里输入标题" />
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">

                    <textarea class="weui-textarea" id="content" 
                    v-on:change="inputChange" 
                    maxlength="1000" placeholder="请详细描述您的问题，方便系统为您解答。" style="height: 9.9em"></textarea>

                </div>
            </div>
        </div>
        <div class="fixed-bottom-block">
            <button type="primary" class="weui-btn weui-btn_primary" :disabled="submiting" @click="submit()">提交</button>
        </div>
</div>
</template>

<script>
import axios from 'axios'
import tooltips from 'components/Tooltips.vue'
import qs from 'qs'
import localStorage from '../localStorage'


export default {
  name: 'user-feedback-add',
  components:{
    tooltips
  },
  data () {
    return {
      formData:{
        title:'',
        content:'',
        clientId:0,
        rows:50
      },
      userInfo:{},
      topTipsText: 'Welcome',
      tipsShow:false,
      submiting:false,
      times:3000

    }
  },
  created:function() {
    this.userInfo=localStorage.getLocalStorage();
    window.document.title='我要申述';
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
     
      if(!formData.title){
        this.topTipsText='标题不能为空';
        this.tipsShow=true;
        return;
      }
      if(!formData.content){
        this.topTipsText='请描述您的问题';
        this.tipsShow=true;
        return;
      }
      this.submiting=true;
      
      formData.clientId=this.userInfo.id;
      axios.request({
          url: this.$store.state.url.addFeedBack,
          method:'post',
          headers:{'content-type': 'application/x-www-form-urlencoded'},
          data:qs.stringify(formData)
        }).then((res) => {
          //console.log(res.data);
          if (res.data.success) {
            this.$router.push('/user-feedback-list');
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
.fixed-bottom-block{
            padding: 0 10px;
        }
        .weui-textarea{
            display: block;
            width: 100%;
        }


</style>
