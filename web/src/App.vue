<!-- template放的是HTML样式的代码，但可以写一些vue命令，例如v-for,v-bind，类似于特殊的HTML代码。
 还可以绑定vue组件，类似于<NavBar />一个目录导航，在script里面导入。 -->
<template>
  <NavBar />
  <!-- 这个是用来导航的，写在router文件夹的index.js里面 -->
  <router-view/>
</template>

<script>
// @ 是路径别名，通常指向项目的 src 目录。
// 使用别名的好处是避免书写相对路径（如 ../../components/NavBar.vue），提高代码的可读性和维护性。
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
// import：将外部的文件或模块引入当前文件。
// components：将导入的组件注册到当前组件中，允许在 <template> 中使用这些组件。
export default {
  components: {
    NavBar
  }
}
</script>

<style>
/* @/表示我们当前目录根目录 */
/* body 是一个全局的 CSS 选择器，用于修饰整个页面的 <body> 元素 的样式。 */
body{
  background-image: url("@/assets/images/background.png");
  /* 百分百填充 */
  background-size: cover;
}
</style>

