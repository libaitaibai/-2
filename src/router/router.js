import VueRouter from 'vue-router'
import home from '../components/tabbar/home.vue'
import member from '../components/tabbar/member.vue'
import shopping from '../components/tabbar/shopping.vue'
import search from '../components/tabbar/search.vue'
import newInformation from '../components/home/newInformation.vue'
import newParticulars from '../components/home/newParticulars.vue'
import photolist from '../components/home/photolist.vue'
import photoInformation from '../components/home/photoInformation.vue'
import goodlist from '../components/home/goodlist.vue'
import goodinfo from '../components/home/goodinfo.vue'
import goodsintroduce from '../components/home/goodsintroduce.vue'
import goodscomment from '../components/home/goodscomment.vue'
// 创建路由对象
var router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: home},
    {path: '/home/newInformation', component: newInformation},
    // id是变量,传递给newparticulars.vue用来展示固定页面的
    {path: '/home/newParticulars/:id', component: newParticulars},
    {path: '/home/photolist', component: photolist},
    {path: '/home/photoInformation/:id', component: photoInformation},
    {path: '/home/goodlist', component: goodlist},
    {path: '/home/goodinfo/:id', component: goodinfo, name: 'goodinfo'},
    {path: '/home/goodsintroduce/:id', component: goodsintroduce, name: 'goodsintroduce'},
    {path: '/home/goodscomment/:id', component: goodscomment, name: 'goodscomment'},
    {path: '/member', component: member},
    {path: '/shopping', component: shopping},
    {path: '/search', component: search}
  ],
  // 被点击路由的样式名.mui-active
  linkActiveClass: 'mui-active'
})
export default router
export {VueRouter}
