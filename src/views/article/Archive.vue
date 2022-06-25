<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">归档</h1>
    </div>
    <!-- 归档列表 -->
    <v-card class="blog-container">
      <v-timeline dense style="text-align: left">
        <v-timeline-item  color="amber lighten-1" fill-dot left small>
          目前共计{{ count }}篇文章，继续加油
        </v-timeline-item>
        <v-timeline-item
            v-for="item of archiveList"
            :key="item.id"
            icon="mdi-airballoon"
            color="green lighten-1">
          <div >
            <!-- 日期 -->
            <span class="time">{{ item.createTime | date }}</span>
            <!-- 文章标题 -->
            <router-link :to="'/articles/' + item.id" style="color:#666;text-decoration: none">
              {{ item.articleTitle }}
            </router-link>
          </div>
          <div style="border-bottom: 1px dotted #dbdde0;}"></div>
        </v-timeline-item>

      </v-timeline>

      <!-- 分页按钮 -->
      <v-pagination
          color="#00C4B6"
          v-model="current"
          :length="Math.ceil(count / 10)"
          total-visible="7"
      />
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Archive.vue",
  data() {
    return {
      current: 1,
      count: 0,
      archiveList: []
    };
  },
  computed: {
    cover() {
      let cover = "";
      this.$store.state.blogInfo.backgroundList.forEach(item => {
        if (item.backgroundLabel === "archive") {
          cover = item.backgroundLabel;
        }
      });
      return "background: url(" + cover + ") center center / cover no-repeat";
    }
  },
  created() {
    this.listArchives()
  },
  watch: {
    current(value) {
      this.axios.get("/api/article/archives", {
            params: { current: value }
          }).then(({ data }) => {
            this.archiveList = data.data.recordList;
            this.count = data.data.count;
          });
    }
  },
  methods: {
    listArchives() {
      this.axios.get("/api/article/archives", {
            params: { current: this.current }
          }).then(res=> {
            console.log(res.data)
            this.archiveList = res.data.data.recordList;
            this.count = res.data.data.count;
          });
    }
  },
}
</script>

<style scoped>
.time {
  font-size: 0.75rem;
  color: #555;
  margin-right: 1rem;
}
</style>
