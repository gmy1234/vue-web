<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    width="250"
    disable-resize-watcher
    right
    overlay-opacity="0.8"
  >
    <div class="blogger-info">
      <v-avatar size="110" style="margin-bottom:0.5rem">
        <img :src="this.$store.state.blogInfo.websiteConfig.websiteAvatar" style="object-fit: cover;" />
      </v-avatar>
    </div>
    <!-- 博客信息 -->
    <div class="blog-info-wrapper">
      <div class="blog-info-data">
        <router-link to="/archives">
          <div style="font-size: 0.875rem">文章</div>
          <div style="font-size: 1.125rem;">
            {{ this.$store.state.blogInfo.articleCount }}
          </div>
        </router-link>
      </div>
      <div class="blog-info-data">
        <router-link to="/category">
          <div style="font-size: 0.875rem">分类</div>
          <div style="font-size: 1.125rem">
            {{ this.$store.state.blogInfo.categoryCount }}
          </div>
        </router-link>
      </div>
      <div class="blog-info-data">
        <router-link to="/tag">
          <div style="font-size: 0.875rem">标签</div>
          <div style="font-size: 1.125rem">
            {{ this.$store.state.blogInfo.tagCount }}
          </div>
        </router-link>
      </div>
    </div>
    <hr />
    <!-- 页面导航 -->
    <div class="menu-container">
      <div class="menus-item">
        <router-link to="/">
          <v-icon>mdi-desktop-mac-dashboard</v-icon>首页
        </router-link>
      </div>

      <div class="menus-item">
        <router-link to="/wallpaper">
          <v-icon>mdi-wallpaper</v-icon>壁纸集
        </router-link>
      </div>
<!--      <div class="menus-item">-->
<!--        <router-link to="/talks">-->
<!--           说说-->
<!--        </router-link>-->
<!--      </div>-->
      <div class="menus-item">
        <router-link to="/category">
          <v-icon>mdi-shape</v-icon>分类
        </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/tag">
          <v-icon>mdi-tag-outline</v-icon>标签
        </router-link>
      </div>
<!--      <div class="menus-item">-->
<!--        <router-link to="/about">-->
<!--           关于-->
<!--        </router-link>-->
<!--      </div>-->
<!--      <div class="menus-item">-->
<!--        <router-link to="/message">-->
<!--          留言-->
<!--        </router-link>-->
<!--      </div>-->
      <div class="menus-item" v-if="!this.$store.state.avatar">
        <a @click="openLogin"><v-icon>mdi-login</v-icon> 登录 </a>
      </div>
      <div v-else>
        <div class="menus-item">
          <router-link to="/user">
            <v-icon>mdi-account</v-icon>个人中心
          </router-link>
        </div>
        <div class="menus-item">
          <a @click="logout"><v-icon>mdi-logout</v-icon> 退出</a>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideNavBar',
  computed: {
    drawer: {
      set (value) {
        this.$store.state.drawer = value
      },
      get () {
        return this.$store.state.drawer
      }
    },
    isLogin () {
      return this.$store.state.userId
    }
  },
  methods: {
    openLogin () {
      this.$store.state.loginFlag = true
    },
    logout () {
      //如果在个人中心则跳回上一页
      if (this.$route.path === "/user") {
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style scoped>
.blogger-info {
  padding: 26px 30px 0;
  text-align: center;
}
.blog-info-wrapper {
  display: flex;
  align-items: center;
  padding: 12px 10px 0;
}
.blog-info-data {
  flex: 1;
  line-height: 2;
  text-align: center;
}
hr {
  border: 2px dashed #d2ebfd;
  margin: 20px 0;
}
.menu-container {
  padding: 0 10px 40px;
  animation: 0.8s ease 0s 1 normal none running sidebarItem;
}
.menus-item a {
  padding: 6px 30px;
  display: block;
  line-height: 2;
}
.menus-item i {
  margin-right: 2rem;
}
@keyframes sidebarItem {
  0% {
    transform: translateX(200px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
