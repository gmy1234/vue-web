<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">说说</h1>
    </div>
    <!-- 说说内容 -->
    <v-card class="blog-container">
      <div class="talk-item" v-for="item of talkList" :key="item.id">
        <router-link :to="'/talk/' + item.id">
          <!-- 用户信息 -->
          <div class="user-info-wrapper">
            <v-avatar size="36" class="user-avatar">
              <img :src="item.avatar" />
            </v-avatar>
            <div class="user-detail-wrapper">
              <div class="user-nickname">
                {{ item.nickname }}
                <v-icon class="user-sign" size="20" color="#ffa51e">
                  mdi-check-decagram
                </v-icon>
              </div>
              <!-- 发表时间 -->
              <div class="time">
                {{ item.createTime | time }}
                <span class="top" v-if="item.isTop === 1">
                  <i class="iconfont iconzhiding" /> 置顶
                </span>
              </div>
              <!-- 说说信息 -->
              <div class="talk-content" v-html="item.content" />
              <!-- 图片列表 -->
              <v-row class="talk-images" v-if="item.imgList">
                <v-col
                    :md="4"
                    :cols="6"
                    v-for="(img, index) of item.imgList"
                    :key="index"
                >
                  <v-img
                      class="images-items"
                      :src="img"
                      aspect-ratio="1"
                      max-height="200"
                      @click.prevent="previewImg(img)"
                  />
                </v-col>
              </v-row>
              <!-- 说说操作 -->
              <div class="talk-operation">
                <div class="talk-operation-item">
                  <v-icon
                      size="16"
                      :color="isLike(item.id)"
                      class="like-btn"
                      @click.prevent="like(item)"
                  >
                    mdi-thumb-up
                  </v-icon>
                  <div class="operation-count">
                    {{ item.likeCount == null ? 0 : item.likeCount }}
                  </div>
                </div>
                <div class="talk-operation-item">
                  <v-icon size="16" color="#999">mdi-chat</v-icon>
                  <div class="operation-count">
                    {{ item.commentCount == null ? 0 : item.commentCount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div
          class="load-wrapper"
          v-if="talkList && count > talkList.length"
          @click="listTalks"
      >
        <v-btn outlined>
          加载更多...
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "talk",
  data(){
    return{
      current: 1,
      size: 10,
      talkList: [],
      count: 0,
      previewList: []
    }
  },
  computed:{
    cover() {
      let cover = "";
      this.$store.state.blogInfo.backgroundList.forEach(item => {
        if (item.backgroundLabel === "talk") {
          cover = item.backgroundLabel;
        }
      });
      return "background: url(" + cover + ") center center / cover no-repeat";
    },
    // 判断是否点过赞
    isLike() {
      return function(talkId) {
        var talkLikeSet = this.$store.state.talkLikeSet;
        return talkLikeSet.indexOf(talkId) !== -1 ? "#eb5055" : "#999";
      };
    }
  },
  created() {
    this.listTalks();
  },
  methods: {
    listTalks() {
      this.axios.get("/api/talk/list", {
            params: {
              current: this.current,
              size: this.size
            }
          }).then(res => {
            console.log(res)
            if (this.current === 1) {
              this.talkList = res.data.data.recordList;
            } else {
              this.talkList.push(...res.data.data.recordList);
            }
            this.talkList.forEach(item => {
              if (item.imgList) {
                this.previewList.push(...item.imgList);
              }
            });
            this.current++;
            this.count = data.data.count;
          });
    },
    previewImg(img) {
      this.$imagePreview({
        images: this.previewList,
        index: this.previewList.indexOf(img)
      });
    },
    like(talk) {
      // 判断登录
      if (!this.$store.state.userId) {
        this.$store.state.loginFlag = true;
        return false;
      }
      // 发送请求
      this.axios.post("/api/talk/" + talk.id + "/like").then(res => {
        if (res.data.flag) {
          // 判断是否点赞
          if (this.$store.state.talkLikeSet.indexOf(talk.id) !== -1) {
            this.$set(talk, "likeCount", talk.likeCount - 1);
          } else {
            this.$set(talk, "likeCount", talk.likeCount + 1);
          }
          this.$store.commit("talkLike", talk.id);
        } else {
          this.$toast({ type: "error", message: res.data.message })
        }
      });
    }
  },
}
</script>

<style scoped>
.col-1 {
  width: 100%;
  padding: 2px !important;
}
.talk-item:not(:first-child) {
  margin-top: 20px;
}
.talk-item {
  padding: 16px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 3px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s ease 0s;
  text-align: left;
}
.talk-item:hover {
  box-shadow: 0 5px 10px 8px rgb(7 17 27 / 16%);
  transform: translateY(-3px);
}
.user-info-wrapper {
  width: 100%;
  display: flex;
}
.user-avatar {
  border-radius: 50%;
}
.user-avatar {
  transition: all 0.5s;
}
.user-avatar:hover {
  transform: rotate(360deg);
}
.user-detail-wrapper {
  flex: 1;
  margin-left: 10px;
  width: 0;
}
.user-nickname {
  font-size: 15px;
  font-weight: bold;
  vertical-align: middle;
}
.user-sign {
  margin-left: 4px;
}
.time {
  color: #999;
  margin-top: 2px;
  font-size: 12px;
}
.top {
  color: #ff7242;
  margin-left: 10px;
}
.talk-content {
  margin-top: 8px;
  font-size: 14px;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
}
.talk-images {
  padding: 0 10px;
  margin-top: 8px;
}
.images-items {
  cursor: pointer;
  border-radius: 4px;
}
.talk-operation {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.talk-operation-item {
  display: flex;
  align-items: center;
  margin-right: 40px;
  font-size: 12px;
}
.operation-count {
  margin-left: 4px;
}
.load-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.load-wrapper button {
  background-color: #49b1f5;
  color: #fff;
}
.like-btn:hover {
  color: #eb5055 !important;
}
</style>
