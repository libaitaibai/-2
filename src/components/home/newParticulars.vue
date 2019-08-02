<template>
    <div class="Particulars-container">
        <h3 class="title">新闻详情</h3>
        <p class="newtop">
            <span>日期:{{datea}}</span>
            <span>浏览:{{clicksa}}次</span>
        </p>
        <hr>
        <!-- v-html接收html如果html中有图片图片过大需要把<style lang="less" scoped>中的scoped去掉 -->
        <div class="newcontent" v-html="title1"></div>
        <!-- 给子组件传值 -->
        <comment :id="this.id"></comment>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import moment from 'moment'
import comment from '../comment/comment.vue'
export default{
  data () {
    return {
      id: this.$route.params.id, /* 获取路由传过来的id值根据id值展示页面内容 */
      ParticularsGetArray: [],
      datea: moment().format('YYYY MMM Do h:mm:ss'),
      clicksa: '',
      title1: ''
    }
  },
  methods: {
    ParticularsGetData () {
      this.$http.get('http://localhost/Particularsnew.php').then(result => {
        if (result.status === 200) {
          this.ParticularsGetArray = result.body
          this.clicksa = this.ParticularsGetArray[(this.id - 1)].clicks
          this.title1 = this.ParticularsGetArray[(this.id - 1)].title
          /* Toast('成功') */
        } else {
          Toast('失败')
        }
      })
    }
  },
  components: {
    comment
  },
  created () {
    this.ParticularsGetData()
  }
}
</script>
<style lang="less" scoped>
.Particulars-container{
    .title{
        font-size: 20px;
        text-align: center;
        color: red;
        margin: 15px 0;
    }
    .newtop{
        color: rgb(0, 183, 255);
        display:flex;
        justify-content: space-between;
    }
}
</style>
