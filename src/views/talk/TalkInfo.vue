<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">说说</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "TalkInfo.vue",
  data(){
    return {

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
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
