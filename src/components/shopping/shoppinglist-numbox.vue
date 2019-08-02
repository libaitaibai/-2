<template>
        <div class="mui-numbox" data-numbox-min='1' style="width: 120px;height: 25px;">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" @change="numboxchange" ref="numbox" :value="shoppingnumbox"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.js'
export default {
  data () {
    return {
      // 获取input的值传给goodinfo用来改变小球内的值用方法change只要变化就传值
    }
  },
  methods: {
    numboxchange () {
      console.log(this.$refs.numbox.value)
      // 点击增加调用store中的函数要传入id和数量
      var goodsinfo = {id: this.goodsid, nums: this.$refs.numbox.value, price:this.shoppingprice}
      console.log(goodsinfo)
      this.$store.commit('addshoppingnumbox', goodsinfo)
      // 改变购物车值时调用vuex的方法得到总价格
      this.$store.commit('zongshopping')
    }
  },
  mounted () {
    mui('.mui-numbox').numbox()
    // 这里正常情况下拿不到max因为这个值是我们向后端获取的,当我们获取到后端的值,我们对页面熏染已经完成即css完成
    // mui(Selector).numbox().setOption('max',5)
  },
  props: ['shoppingnumbox', 'goodsid', 'shoppingprice']
}
</script>
<style lang="less" scoped>

</style>
