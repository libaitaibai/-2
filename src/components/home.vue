<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeGetArray" :key="item.id">
                <img :src="item.url">
            </mt-swipe-item>
        </mt-swipe>
        <!--九宫格到六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../images/cartoon1.jpg" alt="cartoon1">
                <div class="mui-media-body">新闻资讯</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../images/cartoon2.jpg" alt="cartoon2">
                <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../images/cartoon3.jpg" alt="cartoon3">
                <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../images/cartoon4.jpg" alt="cartoon4">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../images/cartoon5.jpg" alt="cartoon5">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../images/cartoon6.jpg" alt="cartoon6">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      swipeGetArray: []
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
  }
}
</script>
<style lang="less" scoped>
div{
    .mint-swipe{
        height:400px;
        .mint-swipe-item{
            &:nth-child(1){
                background-color: red;
            }
            &:nth-child(2){
                background-color: blue;
            }
            &:nth-child(3){
                background-color:  rgba(155, 197, 38, 0.664);
            }
            &:nth-child(4){
                background-color: rgba(38, 197, 73, 0.664);
            }
            >img{
                height:100%;
                width:100%;
            }
        }
    }
    .mui-grid-view.mui-grid-9{
        background-color: white;
        border:none;
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
