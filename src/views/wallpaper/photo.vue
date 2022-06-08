<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">{{ photoAlbumName }}</h1>
    </div>
    <!-- 相册列表 -->
    <v-card class="blog-container">
      <div class="photo-wrap">
        <img
            v-for="(item, index) of photoList"
            class="photo"
            :key="index"
            :src="item"
            @click="preview(index)"
        />
      </div>
      <!-- 无限加载 -->
      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more"/>
        <div slot="no-results"/>
      </infinite-loading>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "photo",
  data() {
    return {
      photoAlbumName: "",
      photoAlbumCover: "",
      photoList: [],
      current: 1,
      size: 10
    };
  },
  computed: {
    cover() {
      return ("background: url(" + this.photoAlbumCover + ") center center / cover no-repeat");
    }
  },
  methods: {
    // 预览
    preview(index) {
      this.$imagePreview({
        images: this.photoList,
        index: index
      });
    },
    // 无限加载 TODO: 需要仔细了解
    infiniteHandler($state) {
      console.log(this.$route.params.id)
      this.axios.get("/api/wallpaper/albums/" + this.$route.params.id, {
        params: {
          current: this.current,
          size: this.size
        }
      }).then(res => {
        console.log(res.data)
        this.photoAlbumCover = res.data.data.photoAlbumCover;
        this.photoAlbumName = res.data.data.photoAlbumName;
        if (res.data.data.photoList.length) {
          this.current++;
          this.photoList.push(...res.data.data.photoList);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    }
  }
}
</script>

<style scoped>
.photo-wrap {
  display: flex;
  flex-wrap: wrap;
}

.photo {
  margin: 3px;
  cursor: pointer;
  flex-grow: 1;
  object-fit: cover;
  height: 200px;
}

.photo-wrap::after {
  content: "";
  display: block;
  flex-grow: 9999;
}

@media (max-width: 759px) {
  .photo {
    width: 100%;
  }
}
</style>
