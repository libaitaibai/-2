<template>
        <div class="mui-numbox" data-numbox-min='1' style="width: 140px;height: 30px;">
                <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                <input id="test" class="mui-input-numbox" type="number" value="1" @change="changenum" ref="numbox" />
                <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
            </div>
    <!-- <div class="mui-numbox"  data-numbox-min='1' data-numbox-max=max>
        <button class="mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" type="number"/>
        <button class="mui-btn-numbox-plus" type="button">+</button>
    </div> -->
</template>
<script>
import mui from '../../lib/mui/js/mui.js'
export default {
  data () {
    return {
      // 获取input的值传给goodinfo用来改变小球内的值用方法change只要变化就传值
    }
  },
  props: [
    // 父组件用:max传值了
    'max'
  ],
  watch: {
    // 属性监听,只要max值改变就把最新值传给max
    'max': function (newVal, oldVal) {
      // 但是我们可以使用watch属性监听,监听父组件传递的max值,最后一次触发的watch值坑定是合法的max值
      // 在数字输入框mui组件中可以用js获取或改变值方法名:getValue(),setValue(Value),更新选项可取值setOption(options):min(int),step(int),max(int)
      mui('.mui-numbox').numbox().setOption('max', newVal)
      // console.log(this.max)
    }
  },
  methods: {
    changenum () {
      // this.$emit()把一个值给另一个
      this.$emit('getgount', parseInt(this.$refs.numbox.value))
      // console.log(parseInt(this.$refs.numbox.value))
    }
  },
  mounted () {
    mui('.mui-numbox').numbox()
    // 这里正常情况下拿不到max因为这个值是我们向后端获取的,当我们获取到后端的值,我们对页面熏染已经完成即css完成
  }
}
</script>
<style lang="less" scoped>

</style>
