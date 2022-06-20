<template>
  <div>
    <div class="comment-title">
      <v-icon>mdi-comment-processing-outline</v-icon>
      评论
    </div>
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
            <span :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'" @click="chooseEmoji = !chooseEmoji">
              <v-icon>mdi-emoticon-happy-outline</v-icon>
            </span>
            <button @click="insertComment" class="upload-btn v-comment-btn" style="margin-left:auto">
              提交
            </button>
          </div>
          <!-- 表情框 -->
          <Emoji @addEmoji="addEmoji" :chooseEmoji="chooseEmoji"/>
        </div>
      </div>
    </div>
    <!-- 评论详情 -->
    <div v-if="count > 0 && reFresh">
      <!-- 评论数量 -->
      <div class="count">{{ count }} 评论</div>
      <!-- 评论列表 -->
      <div
          style="display:flex"
          class="pt-5"
          v-for="(item, index) of commentList"
          :key="item.id"
      >
        <!-- 头像 -->
        <v-avatar size="40" class="comment-avatar">
          <img :src="item.avatar"/>
        </v-avatar>
        <div class="comment-meta">
          <!-- 用户名 -->
          <div class="comment-user">
            <span v-if="!item.webSite">{{ item.nickname }}</span>
            <a v-else :href="item.webSite" target="_blank">
              {{ item.nickname }}
            </a>
            <span class="blogger-tag" v-if="item.userId === 1">博主</span>
          </div>
          <!-- 信息 -->
          <div class="comment-info">
            <!-- 楼层 -->
            <span style="margin-right:10px">{{ count - index }}楼</span>
            <!-- 发表时间 -->
            <span style="margin-right:10px">{{ item.createTime | date }}</span>
            <!-- 点赞 -->
            <span :class="isLike(item.id) + ' iconfont icondianzan'" @click="like(item)"/>
            <span v-show="item.likeCount > 0"> {{ item.likeCount }}</span>
            <!-- 回复 -->
            <span class="reply-btn" @click="replyComment(index, item)">
              回复
            </span>
          </div>
          <!-- 评论内容 -->
          <p v-html="item.commentContent" class="comment-content"></p>
          <!-- 回复人 -->
          <div
              style="display:flex"
              v-for="reply of item.replyDTOList"
              :key="reply.id"
          >
            <!-- 头像 -->
            <v-avatar size="36" class="comment-avatar">
              <img :src="reply.avatar"/>
            </v-avatar>
            <div class="reply-meta">
              <!-- 用户名 -->
              <div class="comment-user">
                <span v-if="!reply.webSite">{{ reply.nickname }}</span>
                <a v-else :href="reply.webSite" target="_blank">
                  {{ reply.nickname }}
                </a>
                <span class="blogger-tag" v-if="reply.userId == 1">博主</span>
              </div>
              <!-- 信息 -->
              <div class="comment-info">
                <!-- 发表时间 -->
                <span style="margin-right:10px">
                  {{ reply.createTime | date }}
                </span>
                <!-- 点赞 -->
                <span
                    :class="isLike(reply.id) + ' iconfont icondianzan'"
                    @click="like(reply)"
                />
                <span v-show="reply.likeCount > 0"> {{ reply.likeCount }}</span>
                <!-- 回复 -->
                <span class="reply-btn" @click="replyComment(index, reply)">
                  回复
                </span>
              </div>
              <!-- 回复内容 -->
              <p class="comment-content">
                <!-- 回复用户名 -->
                <template v-if="reply.replyUserId != item.userId">
                  <span v-if="!reply.replyWebSite" class="ml-1">
                    @{{ reply.replyNickname }}
                  </span>
                  <a
                      v-else
                      :href="reply.replyWebSite"
                      target="_blank"
                      class="comment-nickname ml-1"
                  >
                    @{{ reply.replyNickname }}
                  </a>
                  ，
                </template>
                <span v-html="reply.commentContent"/>
              </p>
            </div>
          </div>
          <!-- 回复数量 -->
          <div
              class="mb-3"
              style="font-size:0.75rem;color:#6d757a"
              v-show="item.replyCount > 3"
              ref="check"
          >
            共
            <b>{{ item.replyCount }}</b>
            条回复，
            <span
                style="color:#00a1d6;cursor:pointer"
                @click="checkReplies(index, item)"
            >
              点击查看
            </span>
          </div>
          <!-- 回复分页 -->
          <div class="mb-3" style="font-size:0.75rem;color:#222;display:none" ref="paging">
            <span style="padding-right:10px">
              共{{ Math.ceil(item.replyCount / 5) }}页
            </span>
            <paging
                ref="page"
                :totalPage="Math.ceil(item.replyCount / 5)"
                :index="index"
                :commentId="item.id"
                @changeReplyCurrent="changeReplyCurrent"
            />
          </div>
          <!-- 回复框 -->
          <Reply :type="type" ref="reply" @reloadReply="reloadReply"/>
        </div>
      </div>
      <!-- 加载按钮 -->
      <div class="load-wrapper">
        <v-btn outlined v-if="count > commentList.length" @click="listComments">
          加载更多...
        </v-btn>
      </div>
    </div>
    <!-- 没有评论提示 -->
    <div v-else style="padding:1.25rem;text-align:center">
      来发评论吧~
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
      return function (commentId) {
        const commentLikeSet = this.$store.state.commentLikeSet;
        return commentLikeSet.indexOf(commentId) !== -1 ? "like-active" : "like";
      };
    }
  },
  created() {
    this.listComments()
  },
  methods: {
    addEmoji(key) {
      this.commentContent += key;
    },
    insertComment() {

    },
    listComments() {
      // 查看评论
      const path = this.$route.path;
      const arr = path.split("/");
      const param = {
        current: this.current,
        type: this.type
      };
      switch (this.type) {
        case 1:
        case 3:
          param.topicId = arr[2];
          break;
        default:
          break;
      }
      this.axios.get("/api/comment/getComments", {params: param}).then(({data}) => {
        console.log(data)
        if (this.current === 1) {
          this.commentList = data.data.recordList;
        } else {
          this.commentList.push(...data.data.recordList);
        }
        this.current++;
        this.count = data.data.count;
        this.$emit("getCommentCount", this.count);
      });
    },
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
