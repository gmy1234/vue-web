<template>
  <div>
    <div class="banner" :style="cover">
      <h1 class="banner-title">个人中心</h1>
    </div>
    <v-card class="blog-container">
      <div>
        <span class="info-title">基本信息</span>
      </div>
      <v-row class="info-wrapper">
        <v-col md="3" cols="12">
          <el-upload
              class="avatar-uploader"
              action="/api/user/info/avatar"
              :headers="userToken"
              :before-upload="beforeUpload"
              :on-success="uploadCover"
          >
            <v-avatar size="140">
              <img :src="this.$store.state.avatar" style="object-fit: cover" />
            </v-avatar>
          </el-upload>
        </v-col>
        <v-col md="7" cols="12">
          <v-text-field
              v-model="userInfo.nickname"
              label="昵称"
              placeholder="请输入您的昵称"
          />
          <v-text-field
              v-model="userInfo.webSite"
              class="mt-7"
              label="个人网站"
              placeholder="http://你的网址"
          />
          <v-text-field
              v-model="userInfo.intro"
              class="mt-7"
              label="简介"
              placeholder="介绍下自己吧"
          />
          <div v-if="loginType !== 0" class="mt-7 binding">
            <v-text-field
                disabled
                v-model="email"
                label="邮箱号"
                placeholder="请绑定邮箱"
            />
            <v-btn v-if="email" text small @click="openEmailModel">
              修改绑定
            </v-btn>
            <v-btn v-else text small @click="openEmailModel">
              绑定邮箱
            </v-btn>
          </div>
          <v-btn @click="updateUserInfo" outlined class="mt-5">修改</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import * as imageConversion from "image-conversion";

export default {
  name: "User",
  data() {
    return {
      userInfo: {
        nickname: this.$store.state.nickname,
        intro: this.$store.state.intro,
        webSite: this.$store.state.webSite,
        loginType: this.$store.state.loginType
      }
    }
  },
  computed: {
    email() {
      return this.$store.state.email;
    },
    loginType() {
      return this.$store.state.loginType;
    },
    cover() {
      let cover = "";
      this.$store.state.blogInfo.backgroundList.forEach(item => {
        if (item.backgroundLabel === "user") {
          cover = item.backgroundCover;
        }
      });
      return "background: url(" + cover + ") center center / cover no-repeat";
    },
    // 上传前请求头添加 token
    userToken(){
      return {"token": this.$store.state.userToken}
    }
  },
  created() {

  },
  methods: {
    updateUserInfo() {
      this.axios.put("/api/user/info/update", this.userInfo).then(({ data }) => {
        if (data.flag) {
          this.$store.commit("updateUserInfo", this.userInfo);
          this.$toast({ type: "success", message: "修改成功" });
        } else {
          this.$toast({ type: "error", message: data.message });
        }
      });
    },
    beforeUpload(file) {
      console.log("beforeUpload");
      return new Promise(resolve => {
        if (file.size / 1024 < 300) {
          resolve(file);
        }
        // 压缩到200KB,这里的200就是要压缩的大小,可自定义
        imageConversion.compressAccurately(file, 300).then(res => {
          resolve(res);
        });
      });
    },
    uploadCover(response) {
      console.log(response)
      this.$store.commit("updateAvatar", response.data);
      this.$toast({type: 'success', message: "上传成功！"})
    },
    openEmailModel() {
      this.$store.state.emailFlag = true;
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.info-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.info-wrapper {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
#pick-avatar {
  outline: none;
}
.binding {
  display: flex;
  align-items: center;
}
</style>
