// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)


const serverPath='http://test.aylsonclub.com/partner';
const store = new Vuex.Store({
  state: {
    count: 1,
    globalData:{
		userInfo:null
	},
    url: {
	    register: serverPath+'/partner/visitor/register',
	    login:serverPath+'/partner/visitor/login',
	    getLocation: serverPath+'/partner/visitor/getLocation',
	    findPassword: serverPath+'/partner/visitor/findPassword',
	    findPasswordNext: serverPath+'/partner/visitor/findPasswordNext',
	    getByCode: serverPath+'/partner/getByCode',
	    getPCSummaryInfo: serverPath+'/partner/getPCSummaryInfo',
	    sentCouponInfo: serverPath+'/partner/sentCouponInfo',
	    getPhoneVerifyCode: serverPath+'/common/getPhoneVerifyCode',
	    getMyPersonalInfo: serverPath+'/partner/getMyPersonalInfo',
	    modifyPersonalInfo: serverPath+'/partner/modifyPersonalInfo',
	    modifyPwd: serverPath+'/partner/modifyPwd',
	    getSumResult: serverPath+'/partner/getSumResult',
	    applyCoupon: serverPath+'/partner/applyCoupon',
	    getCouponConfig: serverPath+'/partner/getCouponConfig',
	    getCouponApplyList: serverPath+'/partner/getCouponApplyList',
	    getCouponList: serverPath+'/partner/getCouponList',
	    getClientList: serverPath+'/partner/getClientList',
	    getClientOrderList: serverPath+'/partner/getClientOrderList',
	    getClientCouponList: serverPath+'/partner/getClientCouponList',
	    getBonusList: serverPath+'/partner/getBonusList',
	    getBonusHadList: serverPath+'/partner/getBonusHadList',
	    getBonusDetail: serverPath+'/partner/getBonusDetail',
	    getNoticeList: serverPath+'/partner/getNoticeList',
	    getNoticeDetail: serverPath+'/partner/getNoticeDetail',
	    addFeedBack: serverPath+'/partner/addFeedBack',
	    replyFeedBack: serverPath+'/partner/replyFeedBack',
	    getMyFeedBackList: serverPath+'/partner/getMyFeedBackList',
	    getMyFeedBackReply: serverPath+'/partner/getMyFeedBackReply',
	    getMyFeedBackDetail: serverPath+'/partner/getMyFeedBackDetail'
	  }
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  },
  actions:{

  }
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  
  //template: '<App/>',
  data(){
  	return {transitionName:'slide'}
  },
  //components: { App }
  watch: {
  	// 监视路由，参数为要目标路由和当前页面的路由
  	'$route' (to, from){
  		const toDepth = to.path.substring(0, to.path.length-2).split('/').length
  		// 官方给出的例子为 const toDepth = to.path.split('/').length 由于现在只有两个路由路径'/'和'/detail'
  		// 按照官方给的例子，这两个路由路径深度都为 2 ，所以，这里稍作调整，不知道有什么不妥
  		// 但目前在这个demo中能正常运行，如果知道更好的方法，欢迎留言赐教
  		const fromDepth = from.path.substring(0, from.path.length-2).split('/').length
  		this.transitionName = toDepth < fromDepth ? 'slide_back' : 'slide'
  		// 根据路由深度，来判断是该从右侧进入还是该从左侧进入
  	}
  }
})
