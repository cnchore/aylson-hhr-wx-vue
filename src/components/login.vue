

<template>  
    <div class="page">
        <tooltips v-bind:text="topTipsText" :duration="times" v-bind:isShow.sync="tipsShow" @on-my-show="onMyShow"></tooltips>
        <div class="login-tit">使用手机号码和密码登录</div>
        <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">手机号码</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="mobilePhone" v-on:change="inputChange" type="number" maxlength="11" focus placeholder="请输入11位手机号码"
                    />
                </div>
                
            </div>
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">密码</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="pwd" v-on:change="inputChange" type="password" placeholder="请输入密码" />
                </div>
                
                <div class="weui-cell__ft">
                    <router-link to="/find-pwd" class="text-link-line">忘记密码?</router-link>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
           
            <button class="weui-btn weui-btn_primary" type="primary"  @click="submit()">登录</button>
            <router-link to="/register" class="weui-btn weui-btn_default">快速注册</router-link>
            
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import tooltips from 'components/Tooltips.vue'
import qs from 'qs'
import localStorage from '../localStorage'

export default {
  name: 'login',
  components:{
    tooltips
  },
  data () {
    return {
      formData: {
            mobilePhone: '',
            pwd: ''
      },
      topTipsText: 'Welcome',
      tipsShow:false,
      submiting:true,
      times:3000
    }
  },
  created:function() {
    window.document.title='登录';
  },
  methods:{
    inputChange(e) {
        let key = e.target.id
        let value = e.target.value
        if(this.formData[key]!=undefined){
          this.formData[key]=value;
          //console.log(this.formData[key])
        }
    },
    submit:function(){
      let formData=this.formData;
      if (!formData.mobilePhone) {

            this.topTipsText='请输入手机号码!';
            this.tipsShow=true;
            return
      }
      if (!formData.pwd) {
        
        this.topTipsText='请输入密码!';
        this.tipsShow=true;
            return
      }
      this.submiting=false;
      //console.log(formData)
      axios.request({
          url: this.$store.state.url.login,
          method:'post',
          headers:{'content-type': 'application/x-www-form-urlencoded'},
          data:qs.stringify(formData)
        }).then((res) => {
          //console.log(res.data);
          if (res.data.success) {
            localStorage.setLocalStorage(res.data.data);
            this.$router.push('/');
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
  #app{
      background-color:#f8f8f8;
      height: 100%;
  }
  .page{
      height:100%;
      font-size:34px;
      line-height:1.6;
  }
  .login-tit {
  margin:30px 0;
  text-align:center;
  font-size:20px;
  font-weight:500;

  }

</style>
