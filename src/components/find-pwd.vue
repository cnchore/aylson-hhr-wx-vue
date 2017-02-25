

<template>  
    <div class="page">
        <tooltips v-bind:text="topTipsText" :duration="times" v-bind:isShow.sync="tipsShow" @on-my-show="onMyShow"></tooltips>
        <div class="weui-cells__title">请输入您注册时的手机号码</div>
        <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">手机号码</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="mobilePhone" v-on:change="inputChange" type="number" maxlength="11" focus placeholder="11位手机号码"
                    />
                </div>
                
            </div>
        </div>
        <div class="weui-btn-area">
            <button class="weui-btn weui-btn_primary" type="primary" :disabled="submiting" @click="submit()">下一步</button>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import tooltips from 'components/Tooltips.vue'
import qs from 'qs'


export default {
  name: 'find-pwd',
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
      submiting:false,
      times:3000
    }
  },
  created:function() {
    window.document.title='找回密码';
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
      if (!formData.mobilePhone) {

            this.topTipsText='请输入手机号码!';
            this.tipsShow=true;
            //console.log(formData)
            return
      }
     // 发送验证码到手机，成功后，转到设置密码页面
      axios.request({
          url: this.$store.state.url.findPassword,
          method:'get',
          headers:{'content-type': 'application/x-www-form-urlencoded'},
          data:qs.stringify(formData),
          params:formData
        }).then((res) => {
          //console.log(res.data);
          if (res.data.success) {
            
            this.$router.push('/find-pwd-next?phone='+formData.mobilePhone);
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
