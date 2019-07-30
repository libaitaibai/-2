<template>
    <div>
        <h3>小米配置</h3>
        <hr>
        <p>{{introsunGetArray.title}}</p>
        <div class="tu" v-for="item in introduceGetArray" :key="item.id">
            <img :src="item.url" :alt="item.title">
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default{
    data (){
        return{
            id: this.$route.params.id,
            introduceGetArray: [],
            introsunGetArray: {}
        }
    },
    methods: {
        introduceGetData () {
            this.$http.get('http://localhost/test.php').then(result => {
                if (result.status === 200) {
                this.introduceGetArray = result.body
                this.introsunGetArray= this.introduceGetArray[this.id]
                console.log(this.introsunGetArray)
                /* Toast('成功') */
                } else {
                Toast('失败')
                }
            })
        }
    },
    created(){
        this.introduceGetData()
    }
}
</script>
<style lang="less" scoped>
div{
    padding:10px 3px;
    h3{
        text-align: center;
        color: blue;
        font-size: 20px;
    }
    .tu{
        text-align: center;
        padding:0px;
        >img{
            width: 80%;
            height: 80%;
        }
    }
}
</style>
