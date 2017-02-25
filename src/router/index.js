import Vue from 'vue'
import Router from 'vue-router'
import home from 'components/Home'
import login from 'components/login'
import register from 'components/register'
import findPwd from 'components/find-pwd'
import findPwdNext from 'components/find-pwd-next'
import user from 'components/user'
import userFeedbackList from 'components/user-feedback-list'
import userFeedbackDetails from 'components/user-feedback-details'
import userFeedbackAdd from 'components/user-feedback-add'
import agreement from 'components/agreement'
import userPwd from 'components/user-pwd'
import userNoticeList from 'components/user-notice-list'
import userNoticeDetails from 'components/user-notice-details'
import bonusList from 'components/bonus-list'
import bonusDetails from 'components/bonus-details'
import customerList from 'components/customer-list'
import customerCoupon from 'components/customer-coupon'
import customerOrder from 'components/customer-order'
import couponApplyList from 'components/coupon-apply-list'
import couponList from 'components/coupon-list'
import userInfo from 'components/user-info'
import couponApply from 'components/coupon-apply'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/coupon-apply-list',
      name: 'couponApplyList',
      component: couponApplyList
    },{
      path: '/coupon-list',
      name: 'couponList',
      component: couponList
    },{
      path: '/coupon-apply',
      name: 'couponApply',
      component: couponApply
    },{
    	path:'/register',
    	name:'register',
    	component:register
    },{
    	path:'/agreement',
    	name:'agreement',
    	component:agreement
    },{
    	path:'/find-pwd',
    	name:'findPwd',
    	component:findPwd
    },{
    	path:'/find-pwd-next',
    	name:'findPwdNext',
    	component:findPwdNext
    },{
    	path:'/bonus-list',
    	name:'bonusList',
    	component:bonusList
    },{
    	path:'/bonus-details',
    	name:'bonusDetails',
    	component:bonusDetails
    },{
    	path:'/customer-list',
    	name:'customerList',
    	component:customerList
    },{
    	path:'/customer-coupon',
    	name:'customerCoupon',
    	component:customerCoupon
    },{
    	path:'/customer-order',
    	name:'customerOrder',
    	component:customerOrder
    },{
    	path:'/user',
    	name:'user',
    	component:user
    },{
    	path:'/user-info',
    	name:'userInfo',
    	component:userInfo
    },{
    	path:'/user-notice-list',
    	name:'userNoticeList',
    	component:userNoticeList
    },{
    	path:'/user-notice-details',
    	name:'userNoticeDetails',
    	component:userNoticeDetails
     },{
    	path:'/user-pwd',
    	name:'userPwd',
    	component:userPwd
    },{
    	path:'/user-feedback-list',
    	name:'userFeedbackList',
    	component:userFeedbackList
    },{
    	path:'/user-feedback-details',
    	name:'userFeedbackDetails',
    	component:userFeedbackDetails
    },{
    	path:'/user-feedback-add',
    	name:'userFeedbackAdd',
    	component:userFeedbackAdd
    },{
    	path:'*',
    	redirect:'/'
    }
  ]
})
