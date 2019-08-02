<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipelist" :key="item.id">
                <img :src="[item.url == undefined ? item.src : item.url]" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
  props: ['swipelist', 'full']
}
</script>
<style lang="less" scoped>
div{
    .mint-swipe{
        height:400px;
        .mint-swipe-item{
            text-align: center;
            >img{
                height:100%;
                /* width:100%; */
            }
        }
    }
}
.full{
    width:100%;
}
</style>
