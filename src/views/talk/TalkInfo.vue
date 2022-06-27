<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">说说</h1>
    </div>
    <!-- 说说内容 -->
    <v-card class="blog-container">
      <div class="talk-wrapper" style="text-align: left">
        <!-- 用户信息 -->
        <div class="user-info-wrapper">
          <v-avatar size="36" class="user-avatar">
            <img :src="talkInfo.avatar" />
          </v-avatar>
          <div class="user-detail-wrapper">
            <div class="user-nickname">
              {{ talkInfo.nickname }}
              <v-icon class="user-sign" size="20" color="#ffa51e">
                mdi-check-decagram
              </v-icon>
            </div>
            <!-- 发表时间 -->
            <div class="time">{{ talkInfo.createTime | time }}</div>
            <!-- 说说信息 -->
            <div class="talk-content" v-html="talkInfo.content" />
            <!-- 图片列表 -->
            <v-row class="talk-images" v-if="talkInfo.imgList">
              <v-col :md="4" :cols="6" v-for="(img, index) of talkInfo.imgList" :key="index">
                <v-img
                    class="images-items"
                    :src="img"
                    aspect-ratio="1"
                    max-height="200"
                    @click="previewImg(img)"
                />
              </v-col>
            </v-row>
            <!-- 说说操作 -->
            <div class="talk-operation">
              <div class="talk-operation-item">
                <v-icon
                    size="16"
                    :color="isLike(talkInfo.id)"
                    class="like-btn"
                    @click.prevent="like(talkInfo)"
                >
                  mdi-thumb-up
                </v-icon>
                <div class="operation-count">
                  {{ talkInfo.likeCount == null ? 0 : talkInfo.likeCount }}
                </div>
              </div>
              <div class="talk-operation-item">
                <v-icon size="16" color="#999">mdi-chat</v-icon>
                <div class="operation-count">
                  {{ commentCount == null ? 0 : commentCount }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <Comment :type="commentType" @getCommentCount="getCommentCount" />
    </v-card>
  </div>
</template>

<script>
import Comment from "@/components/comment/TalkComment";
export default {
  name: "TalkInfo.vue",
  components: {
    Comment
  },
  data(){
    return {
      commentType: 3,
      commentCount: 0,
      talkInfo: {},
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
    isLike() {
      return function(talkId) {
        const talkLikeSet = this.$store.state.talkLikeSet;
        return talkLikeSet.indexOf(talkId) !== -1 ? "#eb5055" : "#999";
      };
    }
  },
  created() {
    this.getTalkById();
  },
  methods:{
    getTalkById() {
      this.axios.get("/api/talk/" + this.$route.params.talkId).then(res => {
        this.talkInfo = res.data.data;
        this.previewList = this.talkInfo.imgList;
      });
    },
    getCommentCount(count) {
      this.commentCount = count;
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
      this.axios.post("/api/talks/" + talk.id + "/like").then(({ data }) => {
        if (data.flag) {
          // 判断是否点赞
          if (this.$store.state.talkLikeSet.indexOf(talk.id) !== -1) {
            this.$set(talk, "likeCount", talk.likeCount - 1);
          } else {
            this.$set(talk, "likeCount", talk.likeCount + 1);
          }
          this.$store.commit("talkLike", talk.id);
        }
      });
    }
  }
}
</script>

<style scoped>
.talk-wrapper {
  padding: 16px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 3px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s ease 0s;
}
.talk-wrapper:hover {
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
  margin-left: 10px;
  width: 100%;
  flex: 1;
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
  display: flex;
  align-items: center;
  margin-top: 10px;
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
.comment-wrapper {
  margin-top: 20px;
}
.like-btn:hover {
  color: #eb5055 !important;
}
</style>
