<template>
  <div>
    <div id="slider" class="mui-slider">
		  <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']" href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="item in photolistGetArray" :key="item.id" @click="listGetData(item.id)">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <li v-for="item in lista" :key="item.id">
        <router-link :to="'/home/photoInformation/'+item.id">
          <img v-lazy="item.url">
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
// 引入mui.js出现问题查找https://tieba.baidu.com/f?kz=6139704052&mo_device=1&ssid=0&from=1012852y&uid=0&pu=usm@1,sz@320_1004,ta@iphone_2_8.1_11_10.8&bd_page_type=1&baiduid=1928C262469470A925856690A0E0A7C9&tj=www_normal_1_0_10_title&referer=m.baidu.com?pn=0&
// 1.在.babelrc里面添加 "ignore": ["./src/lib/mui/js/mui.js"] 此处的./src/lib/mui/js/mui.js是相对.babelrc文件找你要用的mui文件的路径
// 2.跟.babelrc同级下创建.eslintignre 文件 在里面写上 src/lib/mui/js/mui.js
// 引用mui.min.js的话同理
// 也可能是要下载插件
import mui from '../../lib/mui/js/mui.js'
// import pullToRefresh from '../../lib/mui/js/mui.pullToRefresh.js'
// import material from '../../lib/mui/js/mui.pullToRefresh.material.js'
// mui('.mui-scroll-wrapper').scroll({
//     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
// })
export default{
  data () {
    return {
      photolistGetArray: [],
      lista: []
    }
  },
  methods: {
    photolistGetData () {
      this.$http.get('http://localhost/Particularsnew.php').then(result => {
        if (result.status === 200) {
          this.photolistGetArray = result.body
          this.photolistGetArray.unshift({title: '总', id: 0})
          /* Toast('成功') */
        } else {
          Toast('失败')
        }
      })
    },
    // 传入的参数cateid是为了根据不同cateid进入后端数据获得不同资料
    listGetData (cateid) {
      // 根据id获取图片列表
      // this.$http.get("http://localhost/Particularsnew"+cateid).then(result => {
      this.$http.get('http://localhost/textnew.php').then(result => {
        if (result.status === 200) {
          this.lista = result.body
          console.log(cateid)
          /* Toast('成功') */
        } else {
          Toast('失败')
        }
      })
    }
  },
  created () {
    this.photolistGetData()
    this.listGetData(0)
  },
  // 初始化scroll组件
  mounted () {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0006 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  }
}
</script>
<style lang="less" scoped>
*{
    padding:0px;
    margin:0px;
    touch-action: pan-y;
}
.photo-list{
    list-style:none;
    padding:0px 10px;
    li{
        background-color: rgb(199, 201, 201);
        text-align: center;
        img{
            width: 100%;
            height: 100%;
        }
        img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
    }
}

</style>
