

<template>  
    <div class="page">
        <tooltips v-bind:text="topTipsText" :duration="times" v-bind:isShow.sync="tipsShow" @on-my-show="onMyShow"></tooltips>
        <div class="weui-cells__title">验证码已发送到您的手机，请留意查收</div>
        <div class="weui-cells weui-cells_after-title">
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label">新密码</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="password" id="newPwd" v-on:change="inputChange" maxlength="30" placeholder="请输入新密码" />
            </div>
            
          </div>
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label">验证码</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" id="validCode" v-on:change="inputChange" type="number"  maxlength="6" placeholder="请输入验证码" />
            </div>
            <div class="weui-cell__ft">
              <button class="weui-vcode-btn" :disabled="vcodeStatus" @click="sendMobiCode()">{{vcodeText}}</button>
            </div>
          </div>
        </div>
        <div class="weui-btn-area">
            <button class="weui-btn weui-btn_primary" type="primary" :disabled="submiting" @click="submit()">提交</button>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import tooltips from 'components/Tooltips.vue'
import qs from 'qs'


function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var index=window.location.hash.lastIndexOf('?')||0;
     var r = window.location.hash.substr((index+1)).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

export default {
  name: 'find-pwd-next',
  components:{
    tooltips
  },
  data () {
    return {
      formData: {
            mobilePhone: '',
            validCode: '',
            newPwd:''
      },
      topTipsText: 'Welcome',
      tipsShow:false,
      submiting:false,
      times:3000,
      tipsType:'warn',

      vcodeStatus: false,
      vcodeText: '再次发送'
    }
  },

  created:function() {
    //console.log(GetQueryString('phone'));
    window.document.title='设置新密码';
    this.formData.mobilePhone=GetQueryString('phone');
    if(this.formData.mobilePhone!=null){

        this.vcodeStatus=true;
        this.vcodeText='60s';

        let time = 60
        let timeid = setInterval(() => {
            if (--time > 0) {
              
               this.vcodeText= time + 's'
               
            } else {
                clearInterval(timeid)
                this.vcodeStatus=false;
                this.vcodeText='再次发送';
            }
        }, 1000)
    }
   
  },
  methods:{
    inputChange(e) {
        let key = e.target.id
        let value = e.target.value
        if(this.formData[key]!=undefined){
          this.formData[key]=value;
          
        }
    },
    sendMobiCode:function(){
        if (!/^\s*1\d{10}\s*$/.test(this.formData.mobilePhone)) {
            this.topTipsText='请输入正确的手机号!';
            this.tipsShow=true;
            return
        }
        //等待60秒
        this.vcodeStatus=true;
        this.vcodeText='60s';

        let time = 60
        let timeid = setInterval(() => {
            if (--time > 0) {
              
               this.vcodeText= time + 's'
               
            } else {
                clearInterval(timeid)
                this.vcodeStatus=false;
                this.vcodeText='再次发送';
            }
        }, 1000)
        // 发送验证码到手机，成功后，转到设置密码页面
      axios.request({
          url: this.$store.state.url.getPhoneVerifyCode,
          method:'get',
          headers:{'content-type': 'application/x-www-form-urlencoded'},
          data:qs.stringify(this.formData),
          params:this.formData
        }).then((res) => {
          //console.log(res.data);
          if (res.data.success) {
            this.tipsType='success';
            this.times=10000;
            this.topTipsText='验证码已发送您的手机';
            this.tipsShow=true;
          }else{
            this.topTipsText=res.data.message;
            this.tipsShow=true;
          }
          //this.nubs = res.data.data;
        }).catch((error)=>{
          console.log(error);
        });
    },
    submit:function(){
      let formData=this.formData;
      if (!formData.newPwd) {

            this.topTipsText='请输入新密码!';
            this.tipsShow=true;
            //console.log(formData)
            return
      }
      if (!formData.validCode) {

            this.topTipsText='验证码不能为空!';
            this.tipsShow=true;
            //console.log(formData)
            return
      }
     // 修改密码
      axios.request({
          url: this.$store.state.url.findPasswordNext,
          method:'get',
          headers:{'content-type': 'application/x-www-form-urlencoded'},
          data:qs.stringify(formData),
          params:formData
        }).then((res) => {
          //console.log(res.data);
          if (res.data.success) {
            this.times=5000;
            this.tipsType='success';

            this.topTipsText='重置密码成功';
            this.tipsShow=true;
            let time = 5
            let timeid = setInterval(() => {
                if (--time > 0) {
                  this.submiting=true;
                } else {
                    clearInterval(timeid)
                    this.$router.push('/login');
                }
            }, 1000);
            
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
      this.times=3000;
      this.tipsType='warn';

    }
  },
  computed:{

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page{
    background-color:#f8f8f8;
        

        }
        .weui-cells__title{
            margin-top:.77em;
            margin-bottom:.3em;
            padding-left:15px;
            padding-right:15px;
            color:#999999;
            font-size:16px;

        }

</style>
