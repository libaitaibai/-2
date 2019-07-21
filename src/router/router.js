import VueRouter from 'vue-router'
import home from '../components/home.vue'
import member from '../components/member.vue'
import shopping from '../components/shopping.vue'
import search from '../components/search.vue'
// 创建路由对象
var router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: home},
    {path: '/member', component: member},
    {path: '/shopping', component: shopping},
    {path: '/search', component: search}
  ],
  linkActiveClass: 'mui-active'
})
export default router
export {VueRouter}
