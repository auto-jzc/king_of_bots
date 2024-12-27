import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/PkIndexView'
import RanklistIndexView from '../views/ranklist/RanklistIndexView'
import RecordIndexView from '../views/record/RecordIndexView'
import UserBotIndexView from '../views/user/bot/UserBotIndexView'
import NotFound from '../views/error/NotFound'
 
 
const routes = [
  {
    path:"/", /**根路径的重定向*/
    name:"home",
    redirect:"/pk/"
  },
  {
    path:"/pk/",/**相对路径(域名后开始) */
    name:"pk_index",
    component:PkIndexView,/**访问上面路径后映射的组件 */
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RanklistIndexView,
  },
  {
    path: "/user/bot",
    name: "user_bot_index",
    component: UserBotIndexView,
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)",/**匹配所有其他路径，重定向到404 */
    redirect: "/404/",
  }
 
]
 

// 2. 路由模式（history）
// Vue Router 提供了两种路由模式：
// createWebHistory()：
// 基于 HTML5 History API，无需 # 号（例如 /about）。
// createWebHashHistory()：
// 使用哈希模式，路径带有 #（例如 /#/about）。

const router = createRouter({
  history: createWebHistory(),
  routes
})
 
export default router
