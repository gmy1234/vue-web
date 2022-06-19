<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">标签</h1>
    </div>
    <!-- 标签列表 -->
    <v-card class="blog-container">
      <div class="tag-cloud-title">标签 - {{ count }}</div>
      <div class="tag-cloud">
        <router-link
            :style="{ 'font-size': Math.floor(Math.random() * 10) + 18 + 'px' }"
            v-for="item of tagList"
            :key="item.id"
            :to="'/tag/' + item.id"
        >
          {{ item.tagName }}
        </router-link>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "tag.vue",
  data() {
    return {
      tagList: [],
      count: 0
    };
  },
  computed: {
    cover() {
      let cover = "";
      this.$store.state.blogInfo.backgroundList.forEach(item => {
        if (item.backgroundLabel === "tag") {
          cover = item.backgroundLabel;
        }
      });
      return "background: url(" + cover + ") center center / cover no-repeat";
    }
  },
  created() {
    this.listTag();
  },
  methods: {
    listTag() {
      this.axios.get("/api/article/listTag").then(res => {
        this.tagList = res.data.data.recordList;
        this.count = res.data.data.count;
      });
    }
  }
}
</script>

<style scoped>
.tag-cloud-title {
  line-height: 2;
  font-size: 36px;
  text-align: center;
}
@media (max-width: 759px) {
  .tag-cloud-title {
    font-size: 25px;
  }
}
.tag-cloud {
  text-align: center;
}
.tag-cloud a {
  color: #616161;
  display: inline-block;
  text-decoration: none;
  padding: 0 8px;
  line-height: 2;
  transition: all 0.3s;
}
.tag-cloud a:hover {
  color: #03a9f4 !important;
  transform: scale(1.1);
}
</style>
