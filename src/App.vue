<template>
  <v-app id="app">
    <!-- 导航栏 -->
    <TopNavBar></TopNavBar>
    <!-- 侧边导航栏 -->
    <SideNavBar></SideNavBar>
    <!-- 内容 -->
    <v-main style="padding-bottom: 0">
      <router-view :key="$route.fullPath"/>
    </v-main>
    <!-- 底部 -->
    <FooterBar/>
    <!-- 登录模态框 -->
    <LoginModel/>
    <!-- 注册模态框 -->
    <RegisterModel/>
  </v-app>
</template>

<script>
import TopNavBar from "./components/layout/TopNavBar.vue";
import SideNavBar from "./components/layout/SideNavBar.vue";
import FooterBar from "./components/layout/FooterBar.vue";
import LoginModel from "@/components/model/LoginModel";
import RegisterModel from "@/components/model/RegisterModel";

export default {
  name: 'App',
  components: {
    FooterBar,
    TopNavBar,
    SideNavBar,
    LoginModel,
    RegisterModel
  },
  created() {
    // 获取博客信息
    this.getBlogInfo();
    // 上传访客信息
    this.axios.post("/api/blog/reportVisitor");
  },
  methods:{
    getBlogInfo() {
      this.axios.get("/api/blog/info").then(res  => {
        this.$store.commit("checkBlogInfo", res.data.data);
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
