<template>
    <div>
        <!-- 小球动画 -->
        <transition name="fade"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="qiu" v-if="show" ref="qiuchu">
                {{selectedcount}}
            </div>
        </transition>
        <div class="box">
            <!-- div1轮播图 -->
            <div class="lunbotu">
                <swiper :swipelist=goodsinfoGetArray :isfull=isfull></swiper>
            </div>
            <div class="goumai">
                <!-- div2 h3加hr -->
                <h3>小米出售</h3>
                <hr>
                <div class="price">
                    <div class="oldprice">
                        <p>市场价:</p>
                        <span>${{goodsGetArray.oldprice}}</span>
                        <p>销售价:</p>
                        <span>${{goodsGetArray.newprice}}</span>
                    </div>
                    <div class="shapping">
                        <p>购买数量:</p>
                        <div class="gou">
                            <!-- 我们无法拿到子组件内的值就给子组件一个方法在子组件内的方法把值传给这个方法 -->
                            <!-- 需要根据库存量设置numbox组件的最大值不让超过这个值 -->
                            <numbox @getgount="countchanged" :max="goodsGetArray.piece"></numbox>
                        </div>
                    </div>
                    <mt-button size="small" type="primary">立即购买</mt-button>
                    <mt-button size="small" type="danger" @click="showa">加入购物车</mt-button>
                </div>
            </div>
            <div class="xiangqing">
                <!-- h3加hr加详情 -->
                <!-- hr加按钮 -->
                <h3>商品参数</h3>
                <hr>
                <div class="p1">
                    <p>商品货号:{{goodsGetArray.title}}</p>
                    <p>存货情况:{{goodsGetArray.piece}}件</p>
                    <p>上架时间:2015.4.25</p>
                </div>
                <hr>
                <div class="btn">
                    <mt-button size="large" type="primary" @click="introduce(id)" plain>图文介绍</mt-button>
                </div>
                <div class="btn">
                    <mt-button size="large" type="danger" @click="comment(id)" plain>商品评论</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import swiper from '../swiper/swiper.vue'
import numbox from './goodinfo_numbox.vue'
import mui from '../../lib/mui/js/mui.js'
export default{
  data () {
    return {
      // 挂载自己组件的私有数据
      goodsinfoGetArray: [],
      goodsGetArray: {},
      id: this.$route.params.id,
      isfull: false,
      show: false,
      // 小球初始和终点位移差
      qiuchux: '',
      qiuchuy: '',
      qiuzongx: '',
      qiuzongy: '',
      // 数值组件的数值
      selectedcount: 1
    }
  },
  methods: {
    // 在created中调用此函数,本函数用get请求从后端获取数据并且付给本组件自己的变量
    goodsinfoGetData () {
      // this.$http.get('http://localhost/goodslistnew/'+this.id).then(result => {
      this.$http.get('http://localhost/goodslistnew.php').then(result => {
        if (result.status === 200) {
          this.goodsinfoGetArray = result.body
          this.goodsGetArray = this.goodsinfoGetArray[this.id - 1]
          /* Toast('成功') */
        } else {
          Toast('失败')
        }
      })
    },
    introduce (id) {
      // 用编程式导航引入商品介绍组件
      this.$router.push({name: 'goodsintroduce', params: { id }})
    },
    comment (id) {
      // 用编程式导航引入商品评论组件
      this.$router.push({name: 'goodscomment', params: { id }})
    },
    showa () {
      // 小球显示隐藏
      this.show = !this.show
      // 把数据放到对象传递给store
      var goodsinfo = {
        id: this.id,
        nums: this.selectedcount,
        price: this.goodsGetArray.newprice,
        selected: true
      }
      this.$store.commit('addCarValue', goodsinfo)
    },
    beforeEnter (el) {
      // 小球进入前动画
      el.style.transform = 'translate(154px , 536px)'
    },
    enter (el, done) {
      el.offsetWidth
      // 获取小球初始位置x,y用vue的ref和getBoundingClientRect(),getBoundingClientRect()是获取矩形边框到小球位置的有left,right,top,bottom
      this.qiuchux = this.$refs.qiuchu.getBoundingClientRect().left
      this.qiuchuy = this.$refs.qiuchu.getBoundingClientRect().top
      // 获取小球终点位置x,y无法用vue的ref,因为ref只获取当前页面的元素,但是因为没有计算也可以直接用dom元素
      // 给购物车小球一个id(badgeid)
      this.qiuzongx = document.getElementById('badgeid').getBoundingClientRect().left
      this.qiuzongy = document.getElementById('badgeid').getBoundingClientRect().top
      // var A=this.$refs.qiuchu.getBoundingClientRect();
      // console.log(A)
      var latex = parseInt(this.qiuzongx - this.qiuchux) + 154
      var latey = parseInt(this.qiuzongy - this.qiuchuy) + 536
      // console.log(latex,latey)
      // 小球进入中,done表示立马调用下个函数,一定要有el.offsetWidth,transition过渡效果
      //  这里的`是1左边的
      el.style.transform = `translate(${latex}px , ${latey}px)`
      el.style.transition = 'all 0.5s cubic-bezier(.68,.2,.83,.65)'
      // 立即调用小球消失
      done()
    },
    afterEnter (el) {
      // 小球进入后动画,让小球结束动画后消失
      this.show = !this.show
    },
    countchanged (count) {
      // 获取数字组件的值用方法传值
      this.selectedcount = count
      // console.log(this.selectedcount)
    }
  },
  created () {
    this.goodsinfoGetData()
  },
  components: {
    swiper,
    numbox
  },
  mounted () {
    mui('.mui-numbox').numbox()
  }
}
</script>
<style lang="less" scoped>
.box{
    padding:10px;
    padding-bottom:0px;
    background-color: rgb(216, 216, 216);
    /* 底下白边消除 */
    overflow:hidden;
    .lunbotu{
        background-color: rgb(255, 255, 255);
    }
    .goumai{
        background-color: rgb(255, 255, 255);
        margin-top:10px;
        h3{
            padding: 20px 0 10px 15px ;
            font-size: 20px;
        }
        .price{
            padding: 10px 0 20px 15px;
            p{
                display: inline;
            }
            .oldprice{
                span{
                    padding: 0px 10px;
                }
                span:nth-child(2){
                    font-size: 15px;
                    text-decoration:line-through;
                    color: rgb(116, 116, 116);
                }
                span:nth-child(4){
                    color:red;
                    font-weight: bold;
                }
            }
            .shapping{
                padding:10px 0px;
                .gou{
                    display:inline;
                }
            }
        }
    }
    .xiangqing{
        margin:10px 0px;
        background-color: rgb(255, 255, 255);
        padding:10px 0px;
        h3{
            padding: 15px 0 10px 15px;
        }
        .p1{
            padding: 20px 0 10px 15px;
        }
        .btn{
            margin: 20px;
        }
    }
}
/* cubic-bezier(.68,.2,.83,.65)是网页 cubic-bezier提供的曲线运动 */
.qiu{
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color: red;
    position:absolute;
    /* transform: translate(239px , 779px); */
    z-index:99;
    color: white;
    text-align: center;
    font-size:12px;
    line-height: 17px;
}
</style>
