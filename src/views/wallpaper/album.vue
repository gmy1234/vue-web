<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">相册</h1>
    </div>
    <!-- 相册内容 -->
    <v-card class="blog-container">
      <v-row>
        <v-col :md="6" v-for="item of photoAlbumList" :key="item.id">
          <div class="album-item">
            <v-img class="album-cover" :src="item.albumCover"/>
            <router-link :to="{ path: '/wallpaper/' + item.id }" class="album-wrapper">
              <div class="album-name">{{ item.albumName }}</div>
              <div class="album-desc">{{ item.albumDesc }}</div>
            </router-link>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Album",
  data() {
    return {
      photoAlbumList: [],
    }
  },
  computed: {
    cover() {
      let cover = ''
      this.$store.state.blogInfo.backgroundList.forEach(item => {
        if (item.backgroundLabel === "wallpaper") {
          cover = item.backgroundCover;
        }
      });
      return "background: url(" + cover + ") center center / cover no-repeat"
    }
  },
  created() {
    this.getAlbumList()
  },
  methods: {
    getAlbumList() {
      this.axios.get("/api/wallpaper/albums").then(res => {
        this.photoAlbumList = res.data.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.album-item {
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background: #000;
  border-radius: 0.5rem !important;
}

.album-cover {
  position: relative;
  max-width: none;
  width: calc(100% + 1.25rem);
  height: 250px;
  opacity: 0.8;
  transition: opacity 0.35s, transform 0.35s;
  transform: translate3d(-10px, 0, 0);
  object-fit: cover;
}

.album-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.8rem 2rem;
  color: #fff !important;
}

.album-item:hover .album-cover {
  transform: translate3d(0, 0, 0);
  opacity: 0.4;
}

.album-item:hover .album-name:after {
  transform: translate3d(0, 0, 0);
}

.album-item:hover .album-desc {
  opacity: 1;
  filter: none;
  transform: translate3d(0, 0, 0);
}

.album-name {
  font-weight: bold;
  font-size: 1.25rem;
  overflow: hidden;
  padding: 0.7rem 0;
  position: relative;
}

.album-name:after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #fff;
  content: "";
  transition: transform 0.35s;
  transform: translate3d(-101%, 0, 0);
}

.album-desc {
  margin: 0;
  padding: 0.4rem 0 0;
  line-height: 1.5;
  opacity: 0;
  transition: opacity 0.35s, transform 0.35s;
  transform: translate3d(100%, 0, 0);
}
</style>
