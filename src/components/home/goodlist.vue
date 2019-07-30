<template>
    <div class="goodslists">
      <div class="goods-item" v-for="item in goodsGetArray" :key="item.id" @click="getgoodinfo(item.id)">
        <img :src="item.src" :alt="item.alt">
        <h3>{{item.title}}</h3>
        <div class="box">
          <div class="mony">
            <span>${{item.newprice}}</span>
            <span>${{item.oldprice}}</span>
          </div>
          <div class="jie">
            <span>热卖中</span>
            <span>剩{{item.piece}}件</span>
          </div>
        </div>
      </div>
      <mt-button type="danger" size="large" @click="goodsupload">加载更多</mt-button>
    </div>
</template>
<script>

export default{
  data () {
    return {
      // 挂载自己组件的私有数据
      // pageindex表示页码值,根据页码调用数据
      pageindex: 1,
      goodsGetArray: [],
      id: ''
    }
  },
  methods: {
    // 在created中调用此函数,本函数用get请求从后端获取数据并且付给本组件自己的变量
    goodsGetData () {
      // this.$http.get('http://localhost/goodslistnew.php/'+pageindex).then(result => {
      // 因为没用pageindex却加载数据所以v-for的:key="item.id"是重复的,所以加载时会报错
      this.$http.get('http://localhost/goodslistnew.php').then(result => {
        if (result.status === 200) {
          this.goodsGetArray=this.goodsGetArray.concat(result.body)
          console.log(this.goodsGetArray)
          console.log(this.$route)
          /* Toast('成功') */
        } else {
          Toast('失败')
        }
      })
    },
    // 加载数据调用goodsGetData
    goodsupload () {
      this.pageindex++;
      // console.log(this.pageindex)
      this.goodsGetData()
    },
    getgoodinfo (id) {
      // 除了使用 <router-link> 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。叫做编程式的导航
        // 1.简单的(字符串)
        // this.$router.push('/home/goodinfo')
        // 2.简单的(对象)
        // this.$router.push({ path: '/home/goodinfo'})
        // 3.复杂点(命名的路由,要在router.js中命名)这里params不能和push一起用
        // this.$router.push({name: 'goodinfo' , params: {id}})
        // 4.带查询参数，变成 /register?plan=private
          this.id=id
          this.$router.push({ path: '/home/goodinfo/'+this.id})
          
        // console.log(this.$router.push())
      // this.$router.
    }
  },
  created () {
    this.goodsGetData()
  }
}
</script>
<style lang="less" scoped>
.goodslists{
  display:flex;
  flex-wrap:wrap;
  padding:10px;
  justify-content: space-between;
  .goods-item{
    width: 49%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    padding: 2px;
    /* css3的布局 垂直显示*/
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 网速比较差需要给img留一个长度 */
    min-height: 293px;
    img{
      width: 100%;
    }
    h3{
      font-size:16px;
    }
    .box{
      background-color: rgb(230, 230, 230);
      color: rgb(112, 112, 112);
      padding: 5px;
      .mony{

        span:nth-child(1){
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        span:nth-child(2){
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .jie{
        font-size: 12px;
        display: flex;
        justify-content:space-between;
      }
    }

  }
}
</style>
