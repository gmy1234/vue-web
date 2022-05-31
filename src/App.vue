<template>
  <div id="app">
    <!-- 导航栏 -->
    <TopNavBar></TopNavBar>
    <!-- 侧边导航栏 -->
    <SideNavBar></SideNavBar>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <FooterBar/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";
import FooterBar from "@/components/layout/FooterBar";

export default {
  name: 'App',
  components: {
    FooterBar,
    HelloWorld,
    TopNavBar,
    SideNavBar
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
