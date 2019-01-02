<template>
  <div class="detail-warrap">
    <topBar></topBar>
    <div class="head">
      <div class="info">
        <div class="avatar">
          <img :src="dappInfo.logo_url" />
        </div>
        <div>
          <p class="dapp-name">{{ dappInfo.appname }}</p>
          <p class="brief">{{ dappInfo.desc }}</p>
        </div>
      </div>
      <div class="other-info">
        <div>
          <p>授权状态</p>
          <p>已授权</p>
        </div>
        <div>
          <p>合约账号</p>
          <p>xxxxx</p>
        </div>
        <div>
          <p>过期时间</p>
          <p>2012.1.1</p>
        </div>
        <div>
          <p>押金</p>
          <p>1000.00 BOS</p>
        </div>
        <div>
          <p>开发方</p>
          <p>xxxx</p>
        </div>
      </div>
      <div class="button">
        <div>项目方网站</div>
      </div>
    </div>
    <div class="auth-info">
      <div class="content">
        <div class="content-title">授权信息</div>
        <ul>
          <li v-for="(item, key) in dataList" :key="key">
            <div>
              <p class="title">总额度</p>
              <p class="number">{{ item.totalLimit }}<span>{{ item.curreny }}</span></p>
            </div>
            <div>
              <p class="title">剩余额度</p>
              <p class="number">{{ item.totalLimit }}<span>{{ item.curreny }}</span></p>
            </div>
            <div>
              <p><span class="button">取消操作</span></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import config from '@/utils/config'
import { getTableRow } from '@/utils/'

export default {
  name: 'detail',
  components: {topBar},
  data () {
    return {
      dataList: [{
        totalLimit: 20000,
        surplusLimit: 10000,
        curreny: 'BOS'
      }, {
        totalLimit: 20000,
        surplusLimit: 10000,
        curreny: 'BOS'
      }],
      dappInfo: {}
    }
  },
  created () {
    let query = this.$route.query
    if (query.contract) {
      this.getTableRowsForAjax(query.contract)
    }
  },
  methods: {
    getTableRowsForAjax (lowerBound) {
      let _that = this
      let params = {
        code: config.contractAccount,
        scope: config.contractAccount,
        lower_bound: lowerBound,
        upper_bound: '',
        index_position: 1,
        table: 'dapps',
        limit: 1
      }
      getTableRow(params, function (res) {
        if (res.rows && res.rows.length > 0) {
          let row = res.rows[0]
          if (row.contract === params.lower_bound) {
            _that.dappInfo = row
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail-warrap
  .head
    max-width 900px
    margin 0 auto
    background-color #fff
    .info
      display flex
      margin-top 40px
      .avatar
        height 120px
        width 120px
        margin-right 40px
        img
          height 120px
          width 120px
          border-radius 50%
      .dapp-name
        color #333333
        font-size 22px
        margin-bottom 20px
        font-weight 500
      .brief
        color #A8A8A8
        font-size 14px
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 4
        overflow hidden
    .other-info
      display flex
      justify-content space-between
      margin-top 58px
      >div
        font-size 14px
        color #333333
        p:first-child
          color #A8A8A8
          font-size 12px
          margin-bottom 10px
    .button
      background-color #CE2344
      height 48px
      line-height 48px
      width 305px
      border-radius 4px
      text-align center
      margin 48px auto
      font-size 16px
      color #fff
      font-weight 500
  .auth-info
    background-color #FAF9FC
    padding-bottom 38px
    .content
      max-width 900px
      margin 0 auto
      .content-title
        color #333333
        font-size 18px
        padding 24px 0
      ul
        li
          box-shadow 2px 4px 10px 0px rgba(41,26,204,0.06)
          border-radius 4px
          background-color #fff
          padding 24px
          display flex
          justify-content space-between
          align-items center
          margin-bottom 24px
          .title
            color #A8A8A8
            font-size 14px
            font-weight 400
            margin-bottom 10px
          .button
            border 1px solid rgba(206,35,68,1)
            color #CE2344
            border-radius 4px
            width 90px
            height 30px
            line-height 30px
            text-align center
            display inline-block
            cursor pointer
          .handle
            border-left 1px solid #D9D5E2
            padding-left 45px
          .momey
            display flex
            .number
              color #121212
              font-size 18px
              span
                color #455DE1
                margin-left 10px
            div:first-child
              width 260px
@media screen and (max-width: 640px)
  .detail-warrap .head
    padding 0 16px
    .info .avatar
      margin-right 20px
    .other-info
      justify-content left
      flex-wrap wrap
      margin-top 20px
      div
        width 33.33%
        margin-top 24px
    .button
      width 200px
  .content
    padding 0 16px
</style>
