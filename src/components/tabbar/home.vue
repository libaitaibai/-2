<template>
    <div>
        <!--轮播图-->
        <swiper :swipelist=swipeGetArray :isfull=isfull></swiper>
        <!--九宫格到六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newInformation">
                <img src="../../images/cartoon1.jpg" alt="cartoon1">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                <img src="../../images/cartoon2.jpg" alt="cartoon2">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodlist">
                <img src="../../images/cartoon3.jpg" alt="cartoon3">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/cartoon4.jpg" alt="cartoon4">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/cartoon5.jpg" alt="cartoon5">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/cartoon6.jpg" alt="cartoon6">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import swiper from'../swiper/swiper.vue'
export default {
  data () {
    return {
      swipeGetArray: [],
      idfull: true
    }
  },
  methods: {
    swipeGetData () {
      this.$http.get('http://localhost/test.php').then(result => {
        console.log(result)
        if (result.status === 200) {
          this.swipeGetArray = result.body
          /* Toast('成功') */
        } else {
          Toast('失败')
        }
      })
    }
  },
  created () {
    this.swipeGetData()
  },
  components: {
    swiper
  }
}
</script>
<style lang="less" scoped>
div{
    .mui-grid-view.mui-grid-9{
        background-color: white;
        border: none;
        .mui-table-view-cell{
            border:none;
            img{
                width:96px;
                height:96px;
            }
            .mui-media-body{
                font-size:4px;
            }
        }
    }
}
</style>
