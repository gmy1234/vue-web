<template>
  <div>
    <div class="comment-title"><v-icon>mdi-comment-processing-outline</v-icon>评论</div>
    <!-- 评论框 -->
    <div class="comment-input-wrapper">
      <div style="display:flex">
        <v-avatar size="40">
          <img v-if="this.$store.state.avatar" :src="this.$store.state.avatar"/>
          <img v-else :src="this.$store.state.blogInfo.websiteConfig.touristAvatar"/>
        </v-avatar>
        <div style="width:100%" class="ml-3">
          <div class="comment-input">
            <textarea
                class="comment-textarea"
                v-model="commentContent"
                placeholder="留下点什么吧..."
                auto-grow
                dense
            />
          </div>
          <!-- 操作按钮 -->
          <div class="emoji-container">
            <span
                :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'"
                @click="chooseEmoji = !chooseEmoji"
            >
              <v-icon>mdi-emoticon-happy-outline</v-icon>
            </span>
            <button
                @click="insertComment"
                class="upload-btn v-comment-btn"
                style="margin-left:auto"
            >
              提交
            </button>
          </div>
          <!-- 表情框 -->
          <Emoji @addEmoji="addEmoji" :chooseEmoji="chooseEmoji" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Emoji from "@/components/Emoji";
export default {
  name: "Comment.vue",
  components: {
    Emoji
  },
  props: {
    type: {
      type: Number
    }
  },
  data() {
    return {
      reFresh: true,
      commentContent: "", // 评论内容
      chooseEmoji: false, // 选择点击表情
      current: 1,
      commentList: [],
      count: 0
    }
  },
  computed: {
    isLike() {
      return function(commentId) {
        const commentLikeSet = this.$store.state.commentLikeSet;
        return commentLikeSet.indexOf(commentId) !== -1 ? "like-active" : "like";
      };
    }
  },
  created() {

  },
  methods: {
    addEmoji(key) {
      console.log("key" + key)
      this.commentContent += key;
    },
    insertComment(){

    }
  }
}
</script>

<style scoped>
.blogger-tag {
  background: #ffa51e;
  font-size: 12px;
  display: inline-block;
  border-radius: 2px;
  color: #fff;
  padding: 0 5px;
  margin-left: 6px;
}
.comment-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 40px;
  margin-bottom: 10px;
}
.comment-title i {
  font-size: 1.5rem;
  margin-right: 5px;
}
.comment-input-wrapper {
  border: 1px solid #90939950;
  border-radius: 4px;
  padding: 10px;
  margin: 0 0 10px;
}
.count {
  padding: 5px;
  line-height: 1.75;
  font-size: 1.25rem;
  font-weight: bold;
}
.comment-meta {
  margin-left: 0.8rem;
  width: 100%;
  border-bottom: 1px dashed #f5f5f5;
}
.reply-meta {
  margin-left: 0.8rem;
  width: 100%;
}
.comment-user {
  font-size: 14px;
  line-height: 1.75;
}
.comment-user a {
  color: #1abc9c !important;
  font-weight: 500;
  transition: 0.3s all;
}
.comment-nickname {
  text-decoration: none;
  color: #1abc9c !important;
  font-weight: 500;
}
.comment-info {
  line-height: 1.75;
  font-size: 0.75rem;
  color: #b3b3b3;
}
.reply-btn {
  cursor: pointer;
  float: right;
  color: #ef2f11;
}
.comment-content {
  font-size: 0.875rem;
  line-height: 1.75;
  padding-top: 0.625rem;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
}
.comment-avatar {
  transition: all 0.5s;
}
.comment-avatar:hover {
  transform: rotate(360deg);
}
.like {
  cursor: pointer;
  font-size: 0.875rem;
}
.like:hover {
  color: #eb5055;
}
.like-active {
  cursor: pointer;
  font-size: 0.875rem;
  color: #eb5055;
}
.load-wrapper {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.load-wrapper button {
  background-color: #49b1f5;
  color: #fff;
}
</style>
