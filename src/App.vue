<template>
  <v-app id="app">
    <!-- 导航栏 -->
    <TopNavBar></TopNavBar>
    <!-- 侧边导航栏 -->
    <SideNavBar></SideNavBar>
    <!-- 内容 -->
    <v-main >
      <router-view :key="$route.fullPath"/>
    </v-main>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- 底部 -->
    <FooterBar/>
    <!-- 登录模态框 -->
    <LoginModel/>
    <!-- 注册模态框 -->
    <RegisterModel/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TopNavBar from "./components/layout/TopNavBar.vue";
import SideNavBar from "./components/layout/SideNavBar.vue";
import FooterBar from "./components/layout/FooterBar.vue";
import LoginModel from "@/components/model/LoginModel";
import RegisterModel from "@/components/model/RegisterModel";

export default {
  name: 'App',
  components: {
    FooterBar,
    HelloWorld,
    TopNavBar,
    SideNavBar,
    LoginModel,
    RegisterModel
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
