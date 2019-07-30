<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newGetArray" :key="item.id">
        <router-link :to="'/home/newParticulars/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.url">
          <div class="mui-media-body">
            <h3>{{item.pinglun}}</h3>
            <p class='mui-ellipsis'>
              <span>日期:{{datea}}</span>
              <span>浏览:{{item.click}}次</span>
            </p>
          </div>
          </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import moment from 'moment'
export default {
  data () {
    return {
      newGetArray: [],
      datea: moment().format('YYYY MMM Do h:mm:ss')
    }
  },
  methods: {
    newGetData () {
      this.$http.get('http://localhost/textnew.php').then(result => {
        console.log(result)
        if (result.status === 200) {
          this.newGetArray = result.body
          /* Toast('成功') */
        } else {
          Toast('失败')
        }
      })
    }
  },
  created () {
    this.newGetData()
  }
}
</script>
<style lang="less" scoped>
  .mui-table-view{
    li{
      a{
        .mui-media-body{
          >h3{
            font-size: 20px;
          }
          .mui-ellipsis{
            font-size: 14px;
            color: #226aff;
            display:flex;
            justify-content: space-between;
          }
        }
      }
    }
  }

</style>
