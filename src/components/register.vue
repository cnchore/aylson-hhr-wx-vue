<template>
    <div class="page">

        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">真实姓名</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="partnerName" v-on:change="inputChange" placeholder="请输入您的真实姓名">
                </div>

            </div>
            <div class="weui-cell weui-cell_select">
                <div class="weui-cell__hd weui-cell__hd_in-select-after">
                    <div class="weui-label">省份</div>
                </div>
                <div class="weui-cell__bd">
                    <div class="weui-select" id="provincePicker" @click="mySelected">{{formData.province}}
                    </div>
                </div>
            </div>
            <div class="weui-cell weui-cell_select">
                <div class="weui-cell__hd weui-cell__hd_in-select-after">
                    <div class="weui-label">城市</div>
                </div>
                <div class="weui-cell__bd">
                    <div class="weui-select" id="cityPicker" @click="citySelected">{{formData.city}}</div>

                </div>
            </div>
            <div class="weui-cell weui-cell_select">
                <div class="weui-cell__hd weui-cell__hd_in-select-after">
                    <div class="weui-label">所属行业</div>
                </div>
                <div class="weui-cell__bd">
                    <div class="weui-select" id="industryPicker" @click="industrySelected">
                        {{industryLabel}}
                    </div>
                </div>
            </div>
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">卖场/品牌</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="storeBrand" v-on:change="inputChange" placeholder="请输入您卖场或品牌">
                </div>

            </div>
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">拓展经理</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="referralName" v-on:change="inputChange" placeholder="请输入拓展经理姓名">
                </div>

            </div>
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">经理电话</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="referralPhone" v-on:change="inputChange" type="number" maxlength="11" placeholder="请输入拓展经理手机号码">
                </div>

            </div>
        </div>
        <div class="weui-cells__title">代理商信息</div>
        <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell weui-cell_switch">
                <div class="weui-cell__bd">是否有推荐代理商</div>
                <div class="weui-cell__ft">
                    <label for="hasAgent" class="weui-switch-cp">
                        <input id="hasAgent" class="weui-switch-cp__input" type="checkbox" v-model="hasAgent">
                        <div class="weui-switch-cp__box" ></div>
                    </label>
                </div>
            </div>

            <div class="weui-cell weui-cell_input" v-show="hasAgent">
                <div class="weui-cell__hd">
                    <div class="weui-label">代理商</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="agentName" v-on:change="inputChange" placeholder="请输入代理商姓名">
                </div>

            </div>
            <div class="weui-cell weui-cell_input" v-show="hasAgent">
                <div class="weui-cell__hd">
                    <div class="weui-label">代理商电话</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="agentPhone" v-on:change="inputChange" type="number" maxlength="11" placeholder="请输入代理商手机号码">
                </div>

            </div>
        </div>
        <div class="weui-cells__title">登录信息</div>
        <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">手机号码</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="mobilePhone" v-on:change="inputChange" type="number" maxlength="11" placeholder="请输入手机号码">
                </div>

            </div>
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">密码</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="pwd" v-on:change="inputChange" type="password" maxlength="11" placeholder="请输入密码">
                </div>

            </div>
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">确认密码</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="confirmPwd" type="password" v-on:change="inputChange" maxlength="11" placeholder="请再次输入密码">
                </div>

            </div>
            <div class="weui-cell weui-cell_input">
                <div class="weui-cell__hd">
                    <div class="weui-label">验证码</div>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="validCode" v-on:change="inputChange" type="number" maxlength="6" placeholder="请输入手机验证码">
                </div>
                <div class="weui-cell__ft">
                    <button class="weui-vcode-btn" :disabled="vcodeStatus" @click="sendMobiCode">{{vcodeText}}</button>
                </div>
            </div>
        </div>
        <label for="weuiAgree" class="weui-agree">
            <input id="weuiAgree" type="checkbox" v-model="checkbox.isAgree" class="weui-agree__checkbox">
            <span class="weui-agree__text">
                阅读并同意<router-link to="/agreement">《相关条款》</router-link>
            </span>
        </label>
        <div class="weui-btn-area">
            <button class="weui-btn weui-btn_primary" type="primary" :disabled="submiting" @click="submit">注册</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    import qs from 'qs'
    import weui from '../../static/js/weui.min'

    export default {
        name: 'register',
        components: {

        },
        data() {
            return {
                formData: {
                    partnerName: '',
                    mobilePhone: '',
                    pwd: '',
                    confirmPwd: '',
                    industryType: 1,
                    validCode: '',
                    storeBrand: '',
                    referralName: '',
                    referralPhone: '',
                    agentName: '',
                    agentPhone: '',
                    province: '',
                    provinceId: 2,
                    city: '',
                    cityId: '',
                    wxNickName: '',
                    wxOpenId: '',
                    wxHeadPhoto: '',
                    wxUnionId: ''
                },

                submiting: false,

                vcodeStatus: false,
                vcodeText: '获取验证码',


                province: [],
                city: [],
                industryLabel: '设计师',
                industry: [
                    {
                        value: 1,
                        label: '设计师'
                    }, {
                        value: 2,
                        label: '工长'
                    }, {
                        value: 3,
                        label: '建筑'
                    }, {
                        value: 4,
                        label: '房产中介'
                    }, {
                        value: 5,
                        label: '售楼员'
                    }, {
                        value: 10,
                        label: '其他'
                    }
                ],

                hasAgent: true,
                checkbox: {
                    isAgree: true
                }

            }
        },
        created: function () {

            const self = this;
            self.provinceInit();
            //self.cityInit();
            window.document.title='快速注册';
        },
        methods: {
            provinceInit() {
                // 省市数据初始化
                const self = this;
                axios.get(self.$store.state.url.getLocation, {
                    params: {
                        parentId: 1,
                        type: 'province'
                    }
                }).then((res) => {
                    var provinceList = res.data.data;
                    if (provinceList[0]) {
                        provinceList.forEach(function (value, index) {
                            var _list = {
                                label: value.regionName,
                                value: value.regionId
                            }
                            self.province.push(_list);
                        })
                        //self.province= res.data.data;
                        self.formData.provinceId = provinceList[0].regionId;
                        self.formData.province = provinceList[0].regionName;
                        //console.log(self.province)
                        self.cityInit(self.formData.provinceId);
                    }
                    //this.nubs = res.data.data;
                }).catch((error) => {
                    console.log(error);
                });
            },
            cityInit(cityParentId) {
                // 城市数据初始化

                const self = this;
                axios.get(self.$store.state.url.getLocation, {
                    params: {
                        parentId: cityParentId,
                        type: 'city'
                    }
                }).then((res) => {
                    var cityList = res.data.data;
                    self.city=[];
                    if (cityList[0]) {
                        cityList.forEach(function (value, index) {
                            var _list = {
                                label: value.regionName,
                                value: value.regionId
                            }
                            self.city.push(_list);
                        })

                        //self.province= res.data.data;
                        self.formData.cityId = cityList[0].regionId;
                        self.formData.city = cityList[0].regionName;
                    }
                    //this.nubs = res.data.data;
                }).catch((error) => {
                    console.log(error);
                });
            },
            industrySelected() {
                var that = this;
                weui.picker(that.industry, {
                    className: 'custom-classname',
                    defaultValue: [1],
                    onChange: function (result) {
                        //console.log(result)
                    },
                    onConfirm: function (result) {
                        that.formData.industryType = result[0];
                        that.industry.forEach(function (item, index) {
                            if (item.value == result[0]) {
                                that.industryLabel = item.label;
                                return;
                            }
                        })
                    },
                    id: 'industryPicker'
                });
            }
            ,
            mySelected(sel) {
                //console.log('provincePicker');
                var that = this;
                weui.picker(this.province, {
                    className: 'custom-classname',
                    defaultValue: [2],
                    onChange: function (result) {
                        //console.log(result)
                    },
                    onConfirm: function (result) {
                        that.formData.provinceId = result[0];
                        //console.log(that.province[result[0]])
                        that.province.forEach(function (item, index) {
                            if (item.value == result[0]) {
                                that.formData.province = item.label;
                                return;
                            }
                        })
                        that.cityInit(result[0]);
                        //that.formData.province=that.province[result[0]].label;
                        //console.log(that.formData.province);
                    },
                    id: 'provincePicker'
                });
            },
            citySelected() {
                var that = this;
                weui.picker(this.city, {
                    className: 'custom-classname',
                    //defaultValue: [3],
                    onChange: function (result) {
                        //console.log(result)
                    },
                    onConfirm: function (result) {
                        that.formData.cityId = result[0];
                        that.city.forEach(function (item, index) {
                            if (item.value == result[0]) {
                                that.formData.city = item.label;
                                return;
                            }
                        })
                        //that.formData.city=that.city[result[0]].label;
                        //console.log(that.formData.city);
                    },
                    id: 'cityPicker'
                });
            },
            switchCheck() {
                this.hasAgent = !this.hasAgent;
            },
            inputChange(e) {
                let key = e.target.id
                let value = e.target.value
                if (this.formData[key] != undefined) {
                    this.formData[key] = value;
                    //console.log(this.formData[key])
                }
            },
            sendMobiCode() {
                if (!/^\s*1\d{10}\s*$/.test(this.formData.mobilePhone)) {
                    weui.alert('请输入正确的手机号');
                    return
                }
                this.vcodeStatus = true;
                this.vcodeText = '60s';
                let time = 60;
                let timeid = 0;
                var that = this;
                timeid = setInterval(() => {
                    if (--time > 0) {

                        that.vcodeText = time + 's';
                    } else {
                        clearInterval(timeid)
                        that.vcodeStatus = false;
                        that.vcodeText = '再次发送';
                    }
                }, 1000);
                var phone = that.formData.mobilePhone;
                // 发送验证码到手机，成功后，转到设置密码页面
                axios.request({
                    url: that.$store.state.url.getPhoneVerifyCode,
                    method: 'get',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    params: { phone }
                }).then((res) => {
                    //console.log(res.data);
                    if (res.data.success) {
                        weui.alert('验证码已成功发送您的手机，请留意信息');
                    } else {
                        weui.alert(res.data.message);
                    }
                    //this.nubs = res.data.data;
                }).catch((error) => {
                    console.log(error);
                });
            },
            submit: function () {

                let formData = this.formData;
                let that = this;
                if (!formData.partnerName) {
                    weui.topTips('姓名不能为空');
                    return
                }
                if (!formData.referralName) {
                    weui.topTips('拓展经理姓名不能为空')
                    return
                }
                if (!formData.referralPhone) {
                    weui.topTips('拓展经理电话不能为空')
                    return
                }
                if (that.hasAgent) {
                    if (!formData.agentName) {
                        weui.topTips('请填写代理商姓名')
                        return
                    }
                    if (!formData.agentPhone) {
                        weui.topTips('请填写代理商电话')
                        return
                    }
                }
                if (!formData.mobilePhone) {
                    weui.topTips('手机号码不能为空')
                    return
                }
                if (!formData.pwd) {
                    weui.topTips('密码不能为空')
                    return
                }
                if (formData.pwd !== formData.confirmPwd) {
                    weui.topTips('两次密码不一致')
                    return
                }
                if (!formData.validCode) {
                    weui.topTips('请输入手机验证码')
                    return
                }
                if (!that.checkbox.isAgree) {
                    weui.topTips('注册用户必须阅读并同意相关条款')
                    return
                }
                var loading = weui.loading('注册中...');


                this.submiting = true;
                //console.log(formData)
                axios.request({
                    url: this.$store.state.url.register,
                    method: 'post',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: qs.stringify(formData)
                }).then((res) => {
                    //console.log(res.data);
                    loading.hide();
                    if (res.data.success) {
                        weui.dialog({
                            title: '恭喜您',
                            content: res.data.message,
                            buttons: [{
                                label: '确定',
                                type: 'primary',
                                onClick: function () {
                                    that.$router.push('/login');
                                }
                            }]
                        });

                    } else {
                        that.submiting = false;
                        weui.topTips('注册错误:' + res.data.message);
                    }
                    //this.nubs = res.data.data;
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        computed: {


        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
        margin: 0px;
    }
    
    .weui-cells__title {
        font-size: 16px;
    }
    
    .weui-agree__text {
        color: #999999;
        font-size: 14px;
    }
    
    .weui-cell_select {
        padding-left: 15px;
    }
    
    .weui-select {
        padding-left: 0px;
    }
    
    .weui-agree__checkbox {
        display: inline-block;
        padding: 0px;
        width: 20px;
        line-height: 12px;
        margin: 0;
        height: 1px;
    }
</style>