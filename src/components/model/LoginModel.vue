<template>
  <v-dialog v-model="loginFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius:4px">
      <v-icon class="float-right" @click="loginFlag = false">mdi-close</v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
            v-model="username"
            label="邮箱号"
            placeholder="请输入您的邮箱号"
            clearable
            @keyup.enter="login"
        />
        <!-- 密码 -->
        <v-text-field
            v-model="password"
            class="mt-7"
            label="密码"
            placeholder="请输入您的密码"
            @keyup.enter="login"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
        />
        <!-- 按钮 -->
        <v-btn class="mt-7" block color="blue" style="color:#fff" @click="login">
          登录
        </v-btn>
        <!-- 注册和找回密码 -->
        <div class="mt-10 login-tip">
          <span @click="openRegister">立即注册</span>
          <span @click="openForget" class="float-right">忘记密码?</span>
        </div>
        <div v-if="socialLoginList.length > 0">
          <div class="social-login-title">社交账号登录</div>
          <div class="social-login-wrapper">
            <!-- 微博登录 -->
            <a v-if="showLogin('weibo')" class="mr-3 iconfont" style="color:#e05244" @click="weiboLogin"/>
            <!-- qq登录 -->
            <a v-if="showLogin('qq')" class="iconfont" style="color:#00AAEE" @click="qqLogin"/>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoginModel",
  data(){
    return{
      username: "",
      password: "",
      show: false
    }
  },
  computed: {
    loginFlag: {
      set(value) {
        this.$store.state.loginFlag = value;
      },
      get() {
        return this.$store.state.loginFlag;
      }
    },
    isMobile() {
      const clientWidth = document.documentElement.clientWidth;
      return clientWidth <= 960;

    },
    socialLoginList() {
      // return this.$store.state.blogInfo.websiteConfig.socialLoginList;
      return 0
    },
    showLogin() {
      return function(type) {
        // return this.socialLoginList.indexOf(type) != -1;
        return false
      };
    }
  },
  created() {
    this.loginFlag = false
    console.log(this.$store.state.userToken)
  },
  methods: {
    openRegister() {
      this.$store.state.loginFlag = false;
      this.$store.state.registerFlag = true;
    },
    openForget() {
      this.$store.state.loginFlag = false;
      this.$store.state.forgetFlag = true;
    },
    login() {
      // 校验
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.username)) {
        this.$toast({ type: "error", message: "邮箱格式不正确" });
        return false;
      }
      if (this.password.trim().length === 0) {
        this.$toast({ type: "error", message: "密码不能为空" });
        return false;
      }
      // 图形验证码
      const captcha = new TencentCaptcha(this.config.TENCENT_CAPTCHA, res => {
        if (res.ret === 0) {
          // 发送登陆请求
          let parma = {
            username: this.username,
            password: this.password
          }
          this.axios.post("api/user/login", parma).then(res => {
            console.log(res)
            if (res.data.flag){
              this.username = ""
              this.password = ""
              // 提交token 到 全局变量中
              this.$store.commit("login", res.data.data)
              this.$toast({ type: "success", message: "登录成功" })
              // 关闭登陆框
              this.loginFlag = false
              this.$store.state.isLogin = true
            }else {
              this.$toast({ type: "error", methods: "登陆失败" })
            }
          }).catch(error =>{
            console.log(error)
          })
        }
      });

      // 显示验证码
      captcha.show()
    },
    qqLogin() {

    },
    weiboLogin() {

    }
  }
}
</script>

<style scoped>
.social-login-title {
  margin-top: 1.5rem;
  color: #b5b5b5;
  font-size: 0.75rem;
  text-align: center;
}
.social-login-title::before {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}
.social-login-title::after {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}
.social-login-wrapper {
  margin-top: 1rem;
  font-size: 2rem;
  text-align: center;
}
.social-login-wrapper a {
  text-decoration: none;
}
</style>
