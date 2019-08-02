<template>
    <div>
        <!-- 表头 -->
        <h3 class="tu">图片缩略</h3>
        <p class="photoInformationtop">
            <span>日期:{{datea}}</span>
        </p>
        <hr>
        <!-- 缩略图 -->
        <!-- 引用vue组件vue-preview必须是slide1属性 -->
        <div>
            <vue-preview class="previewy" :slides="slide1" @close="handleClose"></vue-preview>
        </div>
        <!-- 评论 -->
        <comment></comment>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import moment from 'moment'
import comment from '../comment/comment.vue'
import '../../../node_modules/vue-preview/dist/vue-preview.min.js'
export default {
  data () {
    return {
      slide1: [],
      id: this.$route.params.id,
      datea: moment().format('YYYY MMM Do h:mm:ss')
    }
  },
  methods: {
    photoInformationGetData () {
      this.$http.get('http://localhost/photoInformation.php')
        .then(result => {
          if (result.status === 200) {
            result.body.forEach(item => {
              item.w = 400
              item.h = 400
            })
            this.slide1 = result.body
            console.log(this.slide1)
          /* Toast('成功') */
          } else {
            Toast('失败')
          }
        })
    },
    handleClose () {
      console.log('close event')
    }
  },
  components: {
    comment
  },
  created () {
    this.photoInformationGetData()
  }
}
</script>
<style lang="less" scoped>
.tu{
    font-size: 20px;
    text-align: center;
    color: red;
    margin: 15px 0;
}
.photoInformationtop{
    color: rgb(0, 183, 255);
    display:flex;
    justify-content: space-between;
}
.previewy{
    /deep/ .my-gallery{
        figure{
            /* 内联元素inline*/
            display: inline;
            /* float: left; */
            margin: 0px;
        }
    }
}
.thumbs {
  /* /deep/表示深入的在使用别人插件时使用设置css样式 */
  /deep/ .my-gallery {
    display: flex;
    flex-wrap: wrap;
    figure {
        float: left;
      /* width: 100%;
      margin: 5px; */
      margin: 0px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
