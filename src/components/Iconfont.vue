<template>
  <svg class="icon" aria-hidden="true">
   <!-- 记得此处的计算属性需要和‘#’拼接-->
    <use :xlink:href="'#'+fontClass"></use>
  </svg>
</template>

<script>
// 创建一个映射表，能更方便地设置Icon样式，
// 以后如果需要更换图标，也只需要更换映射表里的属性值。
const classMap = {
  // 右上角导航栏
  search: 'icon-sousuoxiao', // 搜索
  home: 'icon-shouye1', // 主页
  discover: 'icon-faxian', // 发现
  play: 'icon-yule1', // 娱乐
  about: 'icon-guanyu', // 关于
  message: 'icon-liuyan', // 留言
  login: 'icon-denglu', // 登陆

  // 个人展示：
  qq: 'icon-QQ',
  github: 'icon-github'

}
export default {
  name: 'icon-font',
  props: {
    type: {
      type: String,
      require: true
    }
  },
  computed: {
    fontClass () {
      return classMap[this.type]
    }
  }

}
</script>

<style type="text/css">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
