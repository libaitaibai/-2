// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
import router, { VueRouter } from './router/router.js'
import Vue from '../node_modules/vue/dist/vue.js'
// vue使用ajax请求用VueResource
import VueResource from 'vue-resource'
// vue插件缩略图
import VuePreview from 'vue-preview'
// vuex储存数据管理数据
import Vuex from 'vuex'
// vue-resource中用来设置根地址的Vue.http.options.root = 'http://localhost'
// vue-resource中用来设置用ajax传给后端的第三个参数Vue.http.options.emulateJSON = 'true'
// import jquery from './js/jquery.min.js'
// 引入全部mint-ui体积比较大
import MintUi from 'mint-ui'
// 引入部分mint-ui体积比较小
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// 引用router路径管理系统以前是超链接<a>标签
// 把vueRouter安装到vue上用
// import '../node_modules/mint-ui/lib/style.css'
// 为了在mint中使用bootstrap图标需要引入带font的bootstrap文件
// import '../node_modules/bootstrap/dist/css/bootstrap.css'
// 引入mui,mui和bootstrap使用方法类似
// import mui from './lib/mui/js/mui.js'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// 组件app的样式引入
import './css/app.css'
import '../node_modules/vue-preview/dist/vue-preview.min.js'
// 在用mint-ui时加载组件导入css
import '../node_modules/mint-ui/lib/style.css'
import app from './app.vue'
// 把mint放在vue上
// Vue.use(Mint)
// 把mint部分组件放在vue上
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// 这个是给button组件一个标签名例Button.name是mt-button
// Vue.component('mybtu', Button)
Vue.use(VueRouter)
// 导入mint-ui组件时,但是小图标不过来所以用一下全部加载mint-ui
// Vue.use(Lazyload)
Vue.use(MintUi)
Vue.use(VueResource)
Vue.use(VuePreview)
Vue.use(Vuex)
// Vue.use(VuePreview, {
//   mainClass: 'pswp--minimal--dark',
//   barsSize: {top: 0, bottom: 0},
//   captionEl: false,
//   fullscreenEl: false,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// })
// 安装时间管理器
// import moment from 'moment'
// 定义全局过滤器
// Vue.filter('dateFormat',function () {
//   return moment().format('MMMM Do YYYY, h:mm:ss a')
// })
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
// vuex实例要放在vue前面
// 为了保证先把储存的car拿出放到store的car中,需要放在store前面,或者没有car给他一个[]
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
  state: {
    // 相当于data(){}
    count: 0,
    // 给购物车一个数组car,这个数组储存所有商品的数据
    // 刷新后car的数值会被清除我们要保存这个car的值,存储到localstorage中,后把储存的car拿出来放到这里的car上
    // car: []
    car: car,
    // 总商品数量
    zongnums: 0,
    // 总商品价格
    zongprice: 0
  },
  mutations: {
    selectshopping (state, id) {
      state.car.some((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1)
          return true
        }
      })
      // 更新car数据后就把car存到localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    addshoppingnumbox (state, goodsinfo) {
      // 在购物车组件下添加商品,因为我的后端给的值是全部但是car中不是全部,所以有些商品虽然显示但是改变value值不能增加总数量
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.nums = goodsinfo.nums
          console.log(item.nums)
        }
      })
      // 更新car数据后就把car存到localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    addCarValue (state, goodsinfo) {
      // 如果购物车之前没有这个数据,则加上这个数据用push,如果有这个数据但是数据需要更新则用some
      var flag = false
      state.car.some(item => {
        // some无法加上else
        if (item.id === goodsinfo.id) {
          item.nums += parseInt(goodsinfo.nums)
          flag = true
          return true
        }
      })
      if (!flag) {
        state.car.push(goodsinfo)
      }
      // 更新car数据后就把car存到localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    zongshopping (state) {
      // 获取商品总数量总价格
      var n=0
      var p=0
      state.car.forEach(item => {
        console.log(item.selected)
        if (item.selected) {
          n += parseInt(item.nums)
          p += parseInt(item.nums)*parseInt(item.price)
          // console.log(state.zongnums,state.zongprice)
        }
      })
      state.zongnums = n
      state.zongprice = p
      console.log(n,p)
    },
    selectedshopping (state, info){
      // 来回滑动获取状态
      // console.log(info)
      state.car.some(item => {
        if (item.id === info.id) {
          // console.log(item.id,item.selected)
          item.selected = info.selected
        }
      })
      // 更新car数据后就把car存到localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
      // 调用获取商品总价格总件数方法
      this.commit('zongshopping')
    }
  },
  getters: {
    // 把getters当做计算使用
    option: function (state) {
      // 计算购物车徽标,就是所有购物车商品的和
      var c = 0
      state.car.forEach(item => {
        c += parseInt(item.nums)
      })
      return c
    },
    getshoppinglist: function (state) {
      var a = {}
      state.car.forEach(item => {
        // 给对象添加属性名为item.id,属性值为item.nums
        a[item.id] = item.nums
      })
      return a
    },
    getshoppingselected (state) {
      // 把car数组对象中的商品状态放到页面上
      var b = {}
      state.car.forEach(item => {
        // 给对象添加属性名为item.id,属性值为item.nums
        b[item.id] = item.selected
      })
      return b
    }
  }
})
new Vue({
  el: '#app',
  data: {

  },
  methods: {

  },
  // components: {
  // login
  // app是app.vue引用的名称
  render: c => c(app), // render会把el容器中所有内容覆盖掉所以想展示路由不能用<router-view>
  // 将路由对象挂载到vm上
  router,
  // 数据管理
  store
})
