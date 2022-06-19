<template>
  <v-dialog v-model="registerFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius:4px">
      <v-icon class="float-right" @click="registerFlag = false">
        mdi-close
      </v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field v-model="username"
          label="邮箱号"
          placeholder="请输入您的邮箱号"
          clearable
          @keyup.enter="register"
        />
        <!-- 验证码 -->
        <div class="mt-7 send-wrapper">
          <v-text-field
            maxlength="6"
            v-model="code"
            label="验证码"
            placeholder="请输入6位验证码"
            @keyup.enter="register"
          />
          <v-btn :disabled="messageCodeFlag" color="success" @click="sendCode" small>
            {{ codeMsg }}
          </v-btn>
        </div>
        <!-- 密码 -->
        <v-text-field
          v-model="password"
          class="mt-7"
          label="密码"
          placeholder="请输入您的密码"
          @keyup.enter="register"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        />
        <!-- 注册按钮 -->
        <v-btn class="mt-7" block color="red" :loading="loading" :disabled="loading" style="color:#fff" @click="register">
          注册
          <template v-slot:loader><span>Loading...</span></template>
        </v-btn>
        <!-- 登录 -->
        <div class="mt-10 login-tip">
          已有账号？
          <v-btn small color="primary" dark @click="openLogin">
            登陆
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      loading: false,
      username: "",
      code: "",
      password: "",
      messageCodeFlag: true, // 发送验证码禁用 标识
      codeMsg: "发送",
      time: 60,
      show: false,
      buttonLoad: false // 按钮加载 标识
    };
  },
  computed: {
    registerFlag: {
      set(value) {
        this.$store.state.registerFlag = value;
      },
      get() {
        return this.$store.state.registerFlag;
      }
    },
    isMobile() {
      const clientWidth = document.documentElement.clientWidth;
      return clientWidth <= 960;
    }
  },
  methods: {
    openLogin() {
      this.$store.state.registerFlag = false;
      this.$store.state.loginFlag = true;
    },
    // 发送验证码
    sendCode() {
      const that = this
      // eslint-disable-next-line no-undef
      const captcha = new TencentCaptcha(this.config.TENCENT_CAPTCHA,  (res)=> {
        if (res.ret === 0){
          // 倒计时
          that.countDown()
          // 发送邮件
          that.axios.get("api/user/code",{
            params:{ username: this.username }
          }).then(res =>{
            if (res.data.flag) {
              that.$toast({ type: "success", message: "发送成功" });
            } else {
              that.$toast({ type: "error", message: "发送失败" });
            }
          })

        }
      })
      // 显示验证码
      captcha.show();
    },
    // 发送按钮变成60s 倒计时
    countDown() {
      this.messageCodeFlag = true;
      this.timer = setInterval(() => {
        this.time--;
        this.codeMsg = this.time + "s";
        // 重制
        if (this.time <= 0) {
          clearInterval(this.timer);
          this.codeMsg = "发送";
          this.time = 60;
          this.messageCodeFlag = false;
        }
      }, 1000);
    },
    register() {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.username)) {
        this.$toast({type: "error", message: "邮箱格式不正确"});
        return false;
      }
      if (this.code.trim().length !== 6) {
        this.$toast({type: "error", message: "请输入6位验证码"});
        return false;
      }
      if (this.password.trim().length < 6) {
        this.$toast({type: "error", message: "密码不能少于6位"});
        return false;
      }
      const user = {
        username: this.username,
        password: this.password,
        code: this.code
      };
      this.loading = true
      this.axios.post("api/user/register", user).then(res =>{
        console.log(res.data)
        if (res.data.flag){
          this.$toast({type: "success", message: "注册成功"});
          this.loading = false
          this.$store.state.loginFlag = true
          this.$store.state.registerFlag =false
        }
      }).catch(error =>{
        this.$toast({type: "error", message: "注册失败"});
        this.loading = false
      })
    }

  },

  watch: {
    username(value) {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

      if (reg.test(value)) {
        this.messageCodeFlag = false;
      } else {
        this.messageCodeFlag = true;
      }
    }
  }
};
</script>
