<template>
    <div>
        <div class="shopping-list">
            <div class="mui-card" v-for="(item,i) in shoppinglist" :key="item.id">
              <div class="mui-card-content">
                <div class="mui-card-content-inner">
                  <!-- 插件拉动按钮 -->
                  <mt-switch v-model="$store.getters.getshoppingselected[item.id]" @change="shoppingselected(item.id,$store.getters.getshoppingselected[item.id])"></mt-switch>
                  <!-- 图片 -->
                  <img :src=item.src :alt=item.alt>
                  <!-- 插件购物车 -->
                  <div class="shopping-car">
                    <h3>{{item.title}}</h3>
                    <p>
                      <span class="price">${{item.sell_price}}</span>
                      <sNumbox :shoppingnumbox="$store.getters.getshoppinglist[item.id]" :shoppingprice="item.sell_price" :goodsid=item.id></sNumbox>
                      <a href="#javascript:;" @click.prevent="selected(item.id,i)">删除</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner cardleft">
                      <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品<span>{{$store.state.zongnums}}</span>件,总价:$<span>{{$store.state.zongprice}}</span></p>
                      </div>
                      <mt-button type="danger" size="small">去结算</mt-button>
                    </div>
                </div>
            </div>
            <p>{{ $store.getters.getshoppingselected}}</p>
        </div>
    </div>
</template>
<script>
import shoppingNum from '../shopping/shoppinglist-numbox.vue'
export default {
  data () {
    return {
      shoppinglist: []
    }
  },
  created () {
    // 组件刚开始就调用getshoppinglist
    this.getshoppinglist()
  },
  methods: {
    getshoppinglist () {
      // 把car内的商品id拿到并且变成字符串传递给后端,如1,2,3,返回的是123id的商品信息,
      var carArry = []
      this.$store.state.car.forEach(item => {
        carArry.push(item.id)
      })
      // 如果数组内没有数据,不用访问
      if (carArry.length <= 0) {
        return
      }
      // 数组.join(",")是以字符串形式并且用","间隔
      // this.$http.get('http://localhost/shoppinglist.php'+carArry.join(",")).then(result=>{
      this.$http.get('http://localhost/shoppinglist.php').then(result => {
        // console.log(result)
        if (result.status === 200) {
          this.shoppinglist = result.body
        }
      })
      this.$store.commit('zongshopping')
    },
    selected (id, i) {
      // 删除:根据id删除car,根据i删除shoppinglist
      this.shoppinglist.splice(i, 1)
      this.$store.commit('selectshopping', id)
    },
    shoppingselected (id, selected) {
      // 改变滑动状态记录下
      // console.log(id+"---"+selected)
      this.$store.commit('selectedshopping', {id, selected})
    }
  },
  components: {
    sNumbox: shoppingNum
  }
}
</script>
<style lang="less" scoped>
.shopping-list{
  background-color: rgb(209, 209, 209);
  overflow: hidden;
  .mui-card-content-inner{
    display: flex;
    align-items: center;
    padding: 5px;
    >img{
      width: 50px;
      height: 50px;
    }
    h3{
      font-size:13px;
    }
    .shopping-car{
      display: flex;
      flex-direction: column;
      justify-content:space-between;
      p{
        span{
          color: red;
          font-weight: bold;
        }
      }
    }
  }
  .cardleft{
    display: flex;
    justify-content: space-between; 
    align-items: center;
    /* align-content:space-between; */
    p{
      span{
        color: red;
        font-weight: bold;
      }
    }
  }
}
</style>
