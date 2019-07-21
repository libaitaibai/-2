// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
import router, { VueRouter } from './router/router.js'
import Vue from '../node_modules/vue/dist/vue.js'
// vue使用ajax请求用VueResource
import VueResource from 'vue-resource'
// import jquery from './js/jquery.min.js'
// 引入全部mint-ui体积比较大
// import Mint from 'mint-ui'
// 引入部分mint-ui体积比较小
import { Header, Swipe, SwipeItem } from 'mint-ui'
// 引用router路径管理系统以前是超链接<a>标签
// 把vueRouter安装到vue上用
// import '../node_modules/mint-ui/lib/style.css'
// 为了在mint中使用bootstrap图标需要引入带font的bootstrap文件
// import '../node_modules/bootstrap/dist/css/bootstrap.css'
// 引入mui,mui和bootstrap使用方法类似
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// 组件app的样式引入
import './css/app.css'
import app from './app.vue'
// 把mint放在vue上
// Vue.use(Mint)
// 把mint部分组件放在vue上
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
// 这个是给button组件一个标签名例Button.name是mt-button
// Vue.component('mybtu', Button)
Vue.use(VueRouter)
Vue.use(VueResource)
// 引用其他组件
// 设置为 false 以阻止 vue 在启动时生成生产提示。
// Vue.config.productionTip = false
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
var vm = new Vue({
  el: '#app',
  data: {

  },
  methods: {

  },
  // components: {
  // login
  // },
  // app是app.vue引用的名称
  render: c => c(app), // render会把el容器中所有内容覆盖掉所以想展示路由不能用<router-view>
  // 将路由对象挂载到vm上
  router
})
