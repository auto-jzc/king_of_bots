<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> <!--导航栏背景样式 -->
      <div class="container"> <!--去掉-fluid变窄一点-->
        <!--第一个商标--><!--利用router-link实现页面跳转不刷新-->
        <router-link class="navbar-brand" :to="{name:'home'}" >King Of Bots</router-link>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <!--改成下面的router—link形式，实现图标不刷新;利用三目运算符实现高亮判断-->
                <router-link :class="route_name == 'pk_index' ?  ' nav-link active' : 'nav-link' " 
                :to="{name: 'pk_index'}" >对战</router-link>
            </li>
            <li class="nav-item">
              <router-link :class="route_name == 'record_index' ? 'nav-link active': 'nav-link' " 
              :to="{name:'record_index'}">对局列表</router-link>
            </li>
            <li class="nav-item">
               <router-link :class="route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'" 
               :to="{name: 'ranklist_index'}">排行榜</router-link>
            </li>  
          </ul>
          <!-- ul是定义无序列表的样式,li是列表内行的样式,它们配合用来写无序列表 -->
          <ul class="navbar-nav "> <!--下拉菜单选项-->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                majiale 
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" :to="{name:'user_bot_index'}"> 我的Bot</router-link></li>
                <li><hr class="dropdown-divider"></li> <!--我的Bot和退出之间的线-->
                <li><a class="dropdown-item" href="#">退出</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </template>
     
    <script >
    import { useRoute } from "vue-router"
    import { computed } from "@vue/reactivity"
     
    export default{
      setup(){
        const route = useRoute();
        let route_name = computed(() => route.name) 
        return{
          route_name
        }
      }
    }
     
     
    </script>
     
    <!--scoped在这里写的CSS会加个字符串，不会影响这个组件以外的部分--> 
    <!--scoped只对当前样式有效 -->
    <style scoped>
    /*a{
      text-decoration: none;
      color: rgba(255, 255, 255, 0.719);
    }*/
     
    </style>
     