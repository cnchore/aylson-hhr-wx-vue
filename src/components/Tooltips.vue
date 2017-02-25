

<template>

<div v-show="showEd"
  v-bind:class="{
    'weui_toptips': true,
    'weui_warn': (type == 'warn'),
    'weui_success': (type == 'success')
  }"  >{{text}}</div>

</template>

<script>

export default {
    name: 'Tooltips',
    data(){
      return {
        showEd:this.isShow
      }
    },
    props: {
      value: Boolean,
      text: {
        type: String
      },
      // 类型：warn,success
      type: {
        type: String,
        default: 'warn'

      },
      isShow: {
        type: Boolean,
        default: false
      },
      // 持续时间(毫秒)
      duration: {
        type: Number,
        default: 3000
      }
    },
    created(){
      
    },
    watch: {
      isShow(val) {
        
        this.showEd=val;
        //this.$emit('on-show',val)
        if(val){
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.showEd = false;
            
          }, this.duration);
        }
      },
      showEd(val){
        this.$emit('on-my-show',val);
        //console.log('tips:'+val);
      }
    }
}
/*
        if(val){
          this.showEd=true;
        }
        if(val){
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            this.showEd = false;
          }, this.duration)
        }
        */
</script>
<style scoped>
.weui_toptips {
  display: block;
  position: fixed;
  -webkit-transform: translateZ(0);
          transform: translateZ(0);
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  font-size: 14px;
  text-align: center;
  color: #FFFFFF;
  z-index: 5000;
  word-wrap: break-word;
  word-break: break-all;
}
.weui_toptips.weui_warn{
  background-color: #E64340;
}

.weui_toptips.weui_success {
  background-color: #039702;
}
</style>
