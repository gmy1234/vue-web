<template>
  <v-app-bar app :class="navClass" hide-on-scroll flat height="60">
    <!-- 手机端导航栏 -->
    <div class="d-md-none nav-mobile-container">
      <div style="font-size:18px;font-weight:bold">
        <router-link to="/">
          {{ blogInfo.websiteConfig.websiteAuthor }}
        </router-link>
      </div>
      <div style="margin-left:auto">
        <a @click="openSearch"></a>
        <a @click="openDrawer" style="margin-left:10px;font-size:20px"></a>
      </div>
    </div>
    <!-- 电脑导航栏 -->
    <div class="d-md-block d-none nav-container">
      <div class="float-left blog-title">
        <router-link to="/">{{blogInfo.websiteConfig.websiteName}}</router-link>
      </div>
      <div class="float-right nav-title" style="font-size: 16px;font-weight: bolder">
        <div class="menus-item">
          <a class="menu-btn" @click="openSearch"><IconFont type="search"/>搜索</a>
        </div>
        <div class="menus-item">
          <router-link class="menu-btn" to="/"><icon-font type="home"/>首页</router-link>
        </div>
        <div class="menus-item">
          <a class="menu-btn"><icon-font type="discover"/>发现</a>
          <ul class="menus-submenu">
            <li>
              <router-link to="/archives">归档</router-link>
            </li>
            <li>
              <router-link to="/category">分类</router-link>
            </li>
            <li>
              <router-link to="/tag"> 标签</router-link>
            </li>
          </ul>
        </div>
        <div class="menus-item">
          <a class="menu-btn"><icon-font type="play"/>娱乐</a>
          <ul class="menus-submenu">
            <li>
              <router-link :to="{name: 'wallpaper' }"> 相册</router-link>
            </li>
            <li>
              <router-link to="/talks"> 说说</router-link>
            </li>
          </ul>
        </div>
        <div class="menus-item">
          <router-link class="menu-btn" to="/about"><icon-font type="about"/>关于</router-link>
        </div>
        <div class="menus-item">
          <router-link class="menu-btn" to="/message"><icon-font type="message"/>留言</router-link>
        </div>
        <div class="menus-item">
          <a class="menu-btn" v-if="!this.$store.state.userToken" @click="openLogin">
            <icon-font type="login"/>登录
          </a>
          <template v-else>
            <img class="user-avatar" :src="this.$store.state.avatar" height="30" width="30"/>
            <ul class="menus-submenu">
              <li>
                <router-link to="/user">个人中心</router-link>
              </li>
              <li>
                <a @click="logout"> 退出</a>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>

import IconFont from '@/components/Iconfont'

export default {
  name: 'TopNavBar',
  components: {IconFont},
  data() {
    return {
      navClass: ''
    }
  },
  computed: {
    avatar() {
      return this.$store.state.avatar;
    },
    blogInfo() {
      return this.$store.state.blogInfo;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
  methods: {
    scroll() {
      const that = this
      const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.navClass = 'nav-fixed'
      } else {
        that.navClass = 'nav'
      }
    },
    openSearch() {
      this.$store.state.searchFlag = true;
    },
    openDrawer() {
      this.$store.state.drawer = true;
    },
    openLogin() {
      // 变量 true 打开登陆页面
      this.$store.state.loginFlag = true;
    },
    logout() {
      // 在个人中心，跳回上一页
      if (this.$route.path === "/user") {
        this.$router.back();
      }
      this.axios.get("api/user/logout",{
        headers: { token: this.$store.state.userToken }
      }).then(res =>{
        if (res.data.flag) {
          this.$store.commit("logout");
          this.$toast({ type: "success", message: "注销成功" });
        } else {
          this.$toast({ type: "error", message: data.message });
        }
      }).catch(error =>{
        console.log(error)
      })

    }
  }
}
</script>

<style scoped>
i {
  margin-right: 4px;
}
ul {
  list-style: none;
}
.nav {
  background: rgba(0, 0, 0, 0) !important;
}
.nav a {
  color: #eee !important;
}
.nav .menu-btn {
  text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
}
.nav .blog-title a {
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
}
.theme--light.nav-fixed {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 5px 6px -5px rgba(133, 133, 133, 0.6);
}
.theme--dark.nav-fixed {
  background: rgba(18, 18, 18, 0.8) !important;
}
.theme--dark.nav-fixed a {
  color: rgba(255, 255, 255, 0.8) !important;
}
.theme--light.nav-fixed a {
  color: #4c4948 !important;
}
.nav-fixed .menus-item a,
.nav-fixed .blog-title a {
  text-shadow: none;
}
.nav-container {
  font-size: 14px;
  width: 100%;
  height: 100%;
}
.nav-mobile-container {
  width: 100%;
  display: flex;
  align-items: center;
}
.blog-title,
.nav-title {
  display: flex;
  align-items: center;
  height: 100%;
}
.blog-title a {
  font-size: 18px;
  font-weight: bold;
}
.menus-item {
  position: relative;
  display: inline-block;
  margin: 0 0 0 0.875rem;
}
.menus-item a {
  transition: all 0.2s;
}
.nav-fixed .menu-btn:hover {
  color: #49b1f5 !important;
}
.menu-btn:hover:after {
  width: 100%;
}
.menus-item a:after {
  position: absolute;
  bottom: -5px;
  left: 0;
  z-index: -1;
  width: 0;
  height: 3px;
  background-color: #80c8f8;
  content: "";
  transition: all 0.3s ease-in-out;
}
.user-avatar {
  cursor: pointer;
  border-radius: 50%;
}
.menus-item:hover .menus-submenu {
  display: block;
}
.menus-submenu {
  position: absolute;
  display: none;
  right: 0;
  width: max-content;
  margin-top: 8px;
  box-shadow: 0 5px 20px -4px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  animation: submenu 0.3s 0.1s ease both;
}
.menus-submenu:before {
  position: absolute;
  top: -8px;
  left: 0;
  width: 100%;
  height: 20px;
  content: "";
}
.menus-submenu a {
  line-height: 2;
  color: #4c4948 !important;
  text-shadow: none;
  display: block;
  padding: 6px 14px;
}
.menus-submenu a:hover {
  background: #4ab1f4;
}
@keyframes submenu {
  0% {
    opacity: 0;
    filter: alpha(opacity=0);
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    filter: none;
    transform: translateY(0);
  }
}
</style>
