

<template>  
    <div class="page">
        <tooltips v-bind:text="topTipsText" :duration="times" v-bind:isShow.sync="tipsShow" @on-my-show="onMyShow"></tooltips>
        
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">旧密码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" id="pwd" v-on:change="inputChange" maxlength="30" placeholder="请输入旧密码" />
          </div>
         
        </div>
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
            <div class="weui-label">确认密码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" id="confirmPwd" v-on:change="inputChange" maxlength="30" placeholder="再次输入新密码" />
          </div>
         
        </div>
      </div>

      <div class="weui-btn-area">
        <button class="weui-btn weui-btn_primary" type="primary" :disabled="submiting" @click="submit()">修改</button>
      </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import tooltips from 'components/Tooltips.vue'
import qs from 'qs'
import localStorage from '../localStorage'


export default {
  name: 'user-pwd',
  components:{
    tooltips
  },
  data () {
    return {
      formData: {
            mobilePhone: '',
            pwd: '',
            newPwd:'',
            confirmPwd:'',
            clientId:0
      },
      topTipsText: 'Welcome',
      tipsShow:false,
      submiting:false,
      times:3000,
      tipsType:'warn'
    }
  },

  created:function() {
    if(localStorage.getLocalStorage()!=[])
    this.formData.clientId=localStorage.getLocalStorage().id;
  window.document.title='密码修改';
  },
  methods:{
    inputChange(e) {
        let key = e.target.id
        let value = e.target.value
        if(this.formData[key]!=undefined){
          this.formData[key]=value;
          
        }
    },
    
    submit:function(){
      let formData=this.formData;
      if (!formData.pwd) {

            this.topTipsText='请输入旧密码!';
            this.tipsShow=true;
            //console.log(formData)
            return
      }
      if (!formData.newPwd) {

            this.topTipsText='请输入新密码!';
            this.tipsShow=true;
            //console.log(formData)
            return
      }
      if (formData.newPwd!==formData.confirmPwd) {

            this.topTipsText='两次密码不一致!';
            this.tipsShow=true;
            //console.log(formData)
            return
      }
     // 修改密码
      axios.request({
          url: this.$store.state.url.modifyPwd,
          method:'post',
          headers:{'content-type': 'application/x-www-form-urlencoded'},
          //post 参数
          data:qs.stringify(formData),
          //get 需求参数
          params:{}
        }).then((res) => {
          //console.log(res.data);
          if (res.data.success) {
            this.times=5000;
            this.tipsType='success';

            this.topTipsText='修改密码成功';
            this.tipsShow=true;
            let time = 5
            let timeid = setInterval(() => {
                if (--time > 0) {
                  this.submiting=true;
                } else {
                    clearInterval(timeid)
                    this.$router.push('/user');
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
  body{
            margin: 0;
        }
        .page{
            background-color:#fff;
        }
        .weui-cells__title{
            margin-top:.77em;
            margin-bottom:.3em;
            padding-left:15px;
            padding-right:15px;
            color:#999999;
            font-size:14px;

        }

</style>
