<template>
  <div>
    <div>Bot昵称：{{ bot_name }}</div>
    <div>Bot战力：{{ bot_rating }}</div>
  </div>
  <router-view/>
</template>

<script>
import $ from 'jquery';
import { ref } from 'vue';

export default{
  name:"App",
  // setup是整个函数的入口,想在当前页面去调用一下http://localhost:3000/pk/getbotinfo/这个链接
  // 然后返回这两个值，将他显示出来，用ajax来取，
  // 需要定义两个变量，第一个是昵称，第二个是战力，需要先import一个ref
  setup:()=>{
    let bot_name=ref("");
    let bot_rating=ref("");

    //访问后端链接用ajax来写
    //请求类型一共只有两种，一个是get是获取数据，一个是post是创建数据
    //其他请求，delete是删除一个数据，put是修改一个数据
    $.ajax({
      url:"http://localhost:3000/pk/getbotinfo/",
      type:"get",
      success:resp=>{
        // console.log(resp);输出的值{name: 'tiger', rating: '1500'}
        bot_name.value=resp.name;
        bot_rating.value=resp.rating;
      }
    })


    return{
      //return的值就可以在template里调用了
      bot_name,
      bot_rating
    }
  }
}
</script>
<style>
/* @/表示我们当前目录根目录 */
body{
  background-image: url("@/assets/background.png");
  /* 百分百填充 */
  background-size: cover;
}
</style>

