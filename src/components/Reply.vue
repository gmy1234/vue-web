<template>
  <div class="reply-input-wrapper" style="display: none" ref="reply">
    <textarea
        v-model="commentContent"
        class="comment-textarea"
        :placeholder="'回复 @' + nickname + '：'"
        auto-grow
        dense
    />
    <div class="emoji-container">
      <!-- 表情的开关 -->
      <span :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'" @click="chooseEmoji = !chooseEmoji">
        <v-icon>mdi-emoticon-happy-outline</v-icon>
      </span>
      <div style="margin-left:auto">
        <button @click="cancelReply" class="cancel-btn v-comment-btn">
          取消
        </button>
        <button @click="insertReply" class="upload-btn v-comment-btn">
          提交
        </button>
      </div>
    </div>
    <!-- 表情框 -->
    <emoji @addEmoji="addEmoji" :chooseEmoji="chooseEmoji" />
  </div>
</template>

<script>

import Emoji from "./Emoji";
import EmojiList from "../assets/js/emoji";
export default {
  name: "Reply",
  components: {
    Emoji
  },
  props: {
    type: {
      type: Number
    }
  },
  data(){
    return {
      index: 0,
      chooseEmoji: false,
      nickname: "",
      replyUserId: null,
      parentId: null,
      commentContent: ""
    }
  },
  methods: {
    cancelReply() {
      this.$refs.reply.style.display = "none";
    },
    insertReply() {
      // 判断登录
      if (!this.$store.state.userId) {
        this.$store.state.loginFlag = true;
        return false;
      }
      // 判空
      if (this.commentContent.trim() === "") {
        this.$toast({ type: "error", message: "回复不能为空" });
        return false;
      }
      // 解析表情
      const reg = /\[.+?\]/g;
      this.commentContent = this.commentContent.replace(reg, function(str) {
        return (
            "<img src= '" +
            EmojiList[str] +
            "' width='24'height='24' style='margin: 0 1px;vertical-align: text-bottom'/>"
        );
      });
      //发送请求
      const path = this.$route.path;
      const arr = path.split("/");
      console.log(arr)
      const comment = {
        commentContent: this.commentContent,
        type: this.type,
        replyUserId: this.replyUserId,
        parentId: this.parentId
      };
      switch (this.type) {
        case 1:
        case 3:
          comment.topicId = arr[2];
          break;
        default:
          break;
      }
      this.commentContent = "";
      this.axios.post("/api/comment", comment).then(({ data }) => {
        if (data.flag) {
          console.log(this.index)
          this.$emit("reloadReply", this.index);
          this.$toast({ type: "success", message: "回复成功" });
        } else {
          this.$toast({ type: "error", message: data.message });
        }
      });
    },
    addEmoji(text) {
      this.commentContent += text;
    }
  }
}
</script>

<style scoped>
.reply-input-wrapper {
  border: 1px solid #90939950;
  border-radius: 4px;
  padding: 10px;
  margin: 0 0 10px;
}
</style>
