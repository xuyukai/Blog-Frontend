<!-- 公用头部-->

<template>
  <div>
    <div class="poster" ></div>
    <div class="opacitybar">
      <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true"  active-text-color="#ffd04b">
        <el-menu-item style="margin-left: 16%" index="1" route="/">首页</el-menu-item>
        <el-menu-item style="margin-left: 54%" class="hidden-xs-only" v-if="this.$store.state.token ==''"  index=""
                      @click="loginFormVisible = true" >登录</el-menu-item>
        <el-menu-item style="margin-right: 15%" class="hidden-xs-only" v-if="this.$store.state.token ==''"  index=""
                      @click="registerFormVisible=true">注册</el-menu-item>



        <el-submenu style="margin-left:57.2%; " class="hidden-xs-only" index="2" v-if="this.$store.state.token!==''" :router="true">
          <template slot="title">{{this.$store.state.name}}</template>
          <el-menu-item route="/newblog" index="2-1">&nbsp;&nbsp;&nbsp;
            <i class="el-icon-edit"></i>
            写博客
          </el-menu-item>
          <el-menu-item route="/myBlog" index="2-3">&nbsp;&nbsp;&nbsp;
            <i class="el-icon-s-home"></i>
            我的博客
          </el-menu-item>
          <el-menu-item route="/account" index="2-2">&nbsp;&nbsp;&nbsp;
            <i class="el-icon-s-tools"></i>
            账号设置
          </el-menu-item>
          <el-menu-item @click="logout">&nbsp;&nbsp;&nbsp;
            <i class="el-icon-back"></i>
            退出
          </el-menu-item>
        </el-submenu>

      </el-menu>

    </div>
    <div>
      <el-dialog title="登录" :visible.sync="loginFormVisible" width="21%">
        <el-form :model="form">
          <el-form-item :label-width="formLabelWidth">
            <el-input v-model="form.loginName" placeholder="邮箱" prefixIcon="el-icon-user-solid"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-input v-model="form.loginPwd" placeholder="密码" :show-password="form.loginShowPwd"
                      @keyup.enter.native="userLogin" prefixIcon="el-icon-lock"/>
          </el-form-item>
          <el-button @click="userLogin">登录&nbsp;&nbsp;<i class="el-icon-check"></i></el-button>
          <router-link to="/forgetPwd">
            <el-button @click="loginFormVisible = false">忘记密码&nbsp;&nbsp;<i class="el-icon-right"></i></el-button>
          </router-link>
        </el-form>
      </el-dialog>

      <el-dialog title="注册" :visible.sync="registerFormVisible" width="30%">

        <el-form :model="form">
          <el-form-item :label-width="formLabelWidth">
            <el-input v-model="form.registerName" placeholder="用户名" prefixIcon="el-icon-user-solid"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-input v-model="form.registerPwd" placeholder="密码" :show-password="form.loginShowPwd"
                      prefixIcon="el-icon-lock"/>
          </el-form-item>

          <el-form-item :label-width="formLabelWidth">
            <el-input v-model="form.registerConfirmPwd" placeholder="确认密码" :show-password="form.loginShowPwd"
                      prefixIcon="el-icon-bell"/>
          </el-form-item>

          <el-form-item :label-width="formLabelWidth">
            <el-input v-model="form.registerMail" placeholder="邮箱" prefixIcon="el-icon-message"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-input v-model="form.registerMailCode" placeholder="邮箱验证码" prefixIcon="el-icon-key"/>
          </el-form-item>
          <el-button @click="sendMail">
            发送验证码&nbsp;&nbsp;
            <i class="el-icon-coffee-cup" v-if="!sendMailFlag"/>
            <i class="el-icon-loading" v-if="sendMailFlag"/>
          </el-button>
          <el-button @click="userRegister">注册&nbsp;&nbsp;<i class="el-icon-check"></i></el-button>
        </el-form>
      </el-dialog>
    </div>
    <el-button class="logo" @click="jumpHome"></el-button>
    <div style="width: 20%; margin-top:60px; margin-left:64%" class="hidden-xs-only">
      <el-input placeholder="搜索" v-model="searchTxt" suffix-icon="el-icon-search"
                @keyup.enter.native="searchSubmit"/>
    </div>
  </div>
</template>

<script>
    import  qs from 'qs'
    export default {
        name: 'webhead',
        data() {
            return{
                searchTxt:'',
                activeIndex: '/',
                loginFormVisible: false,
                registerFormVisible:false,
                form: { //表单
                    loginName: '',
                    loginPwd: '',
                    loginShowPwd: true, //登录是否显示密码
                    registerName: '',//注册
                    registerPwd: '',
                    registerConfirmPwd: '',
                    registerMail: '',
                    registerMailCode: ''
                },
                formLabelWidth: '0px',
                sendMailFlag: false
            }
        },
        watch: {
            // 监控当前页面path，防止刷新页面显示错误
            '$route.path': {
                deep: true,
                immediate: true,
                handler(to, from) {
                    if (to === '/') {
                        this.activeIndex = '1'
                    }
                    else if(to=='/myblog'){
                        this.activeIndex = ''
                    }
                }
            }
        },
        methods: {
            jumpHome(){
                this.$route.push({
                    path:'/'
                })
            },
            searchSubmit(){
                if(this.searchTxt.length<=0)
                    return;
                this.$router.push({
                    path: '/searchBlog/'+this.searchTxt
                })
                this.searchTxt=''
            },
            logout(){
                this.$store.commit('logout')
                this.$message({
                    message:'退出登录',
                    type:'success'
                });
                this.$router.push({
                    path:'/'
                })

            },
            handleSelect(key, keyPath) {
                console.log(key,keyPath);
                if (key != null && key !== '')
                    this.activeIndex = key
            },
            userLogin () {
                var _this=this
                if (this.form.loginName.length <= 0 || this.form.loginPwd.length <= 0) {
                    this.$message({
                        message: '字段不完整',
                        type: 'error'
                    });
                    return;
                }
                this.$axios
                    .post('/login', {
                        mailAddress: this.form.loginName,
                        password: this.form.loginPwd
                    })
                    .then(successResponse => {
                        if (successResponse.data.code === 200) {
                            _this.$store.commit('login', {
                                token : 123456,
                                name  : successResponse.data.data.username
                            })
                            this.loginFormVisible = false
                        }
                        else if(successResponse.data.code === 400) {
                            this.$message({
                                message: '用户名不存在',
                                type: 'warning'
                            });
                            this.form.loginName=''
                            this.form.loginPwd=''
                        }
                        else if(successResponse.data.code === 600) {
                            this.$message({
                                message: '密码错误,请重新输入!',
                                type: 'warning'
                            });
                            this.form.loginPwd=''
                        }
                    })
                    .catch(failResponse => {
                    })
            },
            sendMail(){
                var reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
                if (!reg.test(this.form.registerMail)) {//检测字符串是否符合正则表达式
                    this.$message({
                        message: '邮箱格式不正确',
                        type: 'error'
                    });
                    return;
                }
                this.sendMailFlag= true
                this.$axios
                    .post('/checkmail',{
                        mailAddress: this.form.registerMail
                    }).then(successResponse=>{
                          this.$message({
                              message:'发送成功!',
                              type:'success'
                          });
                          this.sendMailFlag=false;
                    }).catch(()=>{
                    this.sendMailFlag=false;
                })
            },
            userRegister(){
                if (this.form.registerName.length <= 0 || this.form.registerPwd.length <= 0 || this.form.registerConfirmPwd.length <= 0 ||
                    this.form.registerMail.length <= 0 || this.form.registerMailCode.length <= 0 ) {
                    this.$message({
                        message: '字段不符合规范',
                        type: 'error'
                    });
                    return;
                }
                if (this.form.registerPwd !== this.form.registerConfirmPwd) {
                    this.$message({
                        message: '两次密码不一致',
                        type: 'error'
                    });
                    return;
                }
                if (this.form.registerPwd.length < 6) {
                    this.$message({
                        message: '密码长度需大于6位',
                        type: 'error'
                    });
                    return;
                }
                var reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);

                if (!reg.test(this.form.registerMail)) {//检测字符串是否符合正则表达式
                    this.$message({
                        message: '邮箱格式不正确',
                        type: 'error'
                    });
                    return;
                }
                this.$axios
                    .post('/register',{
                        username: this.form.registerName,
                        mailAddress:this.form.registerMail,
                        password: this.form.registerPwd,
                        checkCode: this.form.registerMailCode
                    })
                    .then(successResponse=> {
                        if (successResponse.data.code === 200) {
                            this.$message({
                                message: successResponse.data.message,
                                type: 'success'
                            });
                            this.registerFormVisible = false;
                            this.$store.commit('login',{
                                token:'123456',
                                name: this.form.registerName
                            })
                        } else if (successResponse.data.code === 400) {
                            this.$message({
                                message: successResponse.data.message,
                                type: 'error'
                            });
                            this.form.registerMailCode=''
                        }
                    })
            }

        }
    }
</script>

<style scoped>
  .poster{
    background:url("../assets/banner.jpg") no-repeat;
    background-position: center;
    margin: -8px;
    padding: 0;
    height: 25%;
    width: 100%;
    background-size: cover;
    position: absolute;

  }
  .logo{
    background: url("../assets/logo.png") no-repeat;
    margin-top:3% ;
    margin-left:-35%;
    padding: 0;
    height: 8%;
    width: 15%;
    background-size: 100% 100%;
    position: absolute;
  }
  .opacitybar{
    opacity: 0.7;
    width:101.09%;
    height: 30%;
    margin: -8px
  }

</style>
