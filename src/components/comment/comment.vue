<template>
    <div>
        <div class="pinglun">
            <label>发表评论:</label>
            <textarea class="form-control" placeholder="输入评论内容不超过200字" maxlength="200" v-model="msg">
            </textarea>
            <mt-button size="large" type="primary" @click="commentEvent">发表评论</mt-button>
            <div class="pinglun_content" v-for="(item, i) in pinglunGetArray" :key="item.id">
                <div>
                    第&nbsp;{{i+1}}&nbsp;楼&nbsp;&nbsp;用户:&nbsp;{{item.title}}&nbsp;&nbsp;发表时间:&nbsp;{{datea}}
                </div>
                <div>
                    {{item.title==='undefined'?'用户没说':item.title}}
                </div>
            </div>
            <mt-button size="large" type="danger" plain @click="Getmonch">加载更多</mt-button>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import {Toast} from 'mint-ui'
export default{
  data () {
    return {
      msg: '',
      pinglunGetArray: [],
      datea: moment().format('YYYY MMM Do'),
      pageIndex: 1
      // 展示评论显示页数的,在后端给的路由中这个可以确定到达第几页的数据储存地方
    }
  },
  methods: {
    pinglunGetData () {
    // 其实我们根据不同的id值来确定获取谁的数据http://localhost/+item.id+Particularsnew.php,中需要传递item.id
    // ajax请求需要在main.js中引入vue-resource
      this.$http.get('http://localhost/Particularsnew.php').then(result => {
        if (result.status === 200) {
          // this.pinglunGetArray = result.body
          // concat()用于连接两个或多个数组
          // 这里用于老数据拼接新数据
          this.pinglunGetArray = this.pinglunGetArray.concat(result.body)
          /* Toast('成功') */
        } else {
          Toast('失败')
        }
      })
    },
    Getmonch () {
    // 改变pageIndex页数获取数据
      this.pageIndex++
      this.pinglunGetData()
    },
    commentEvent () {
      // 判断评论为空时提示评论不能为空并且终止后续
      if (this.msg.length === 0) {
        return Toast('评论不能为空')
      } else {
        // 用vue-resource的ajax传递信息给后端this.$http.post()有三个参数
        // 在main.js中vue-resource中用来设置用ajax传给后端的第三个参数Vue.http.options.emulateJSON = 'true'
        // this.$http.post("http//"+this.$route.params.id,{
        //     content:this.msg
        // })
        // .then(function (result){
        // if(result.status===200){
        // // 如果用刷新页面来显示最新评论会因为Getmonch函数中的this.pageIndex++;因为pageIndex已经被加到3;所以刷新只会显示第三页内容;
        // // 所以在前段内部拿到评论手动加到数组对象中去
        var msm = {
          url: 'http://www.coldrongxing.com/rongxing/rongxing/nanji.jpg',
          title: this.msg,
          // 不知道id应该是最后一条加1吧
          id: this.pageIndex * 12 + 1,
          new_time: '2019/4/30 10:5:30',
          clicks: 4
        }
        this.pinglunGetArray.unshift(msm)
        // 打印现在是第几条数据
        console.log(this.pageIndex * 12 + 1)
        // 清空评论
        this.msg = ''
        // }else{
        //  Toast("发表失败")
        // }
        // })
      }
    }
  },
  // props用来存放父元素的元素
  props: ['id'],
  created () {
    this.pinglunGetData()
  }
}
</script>
<style lang="less" scoped>
.pinglun{
    .form-control{
        border-color: rgb(0, 183, 255);
        margin: 0px;
    }
    .pinglun_content
    div:nth-child(1){
        padding: 5px 10px;
        background-color: rgb(174, 177, 177);
        font-size:10px;
    }
    div:nth-child(2){
        padding: 5px 10px;
        font-size:15px;
    }
}
</style>
