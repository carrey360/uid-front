<template>
  <div class="detail-warrap">
    <topBar></topBar>
    <div class="head">
      <div class="info">
        <div class="avatar">
          <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2895986097,3609514076&fm=173&app=25&f=JPEG?w=600&h=400&s=DBACB7475B8662D2062E5B6D0300E068" />
        </div>
        <div>
          <p class="dapp-name">Parachute</p>
          <p class="brief">这里是简介，简介最流行去中心化交易所，这里是简介，最流行去中心化交易所，简介简介平行世界是一个基于区块链技术的虚拟世界。这里是简介，简介最流行去中心化交易所，这里是简介，最流行去中心化交易所，简介简介平行世界是一个基于区块链技术的虚拟世界。简介简介平行世界是一个基于区块链技术的虚拟世界。简介简介平行世界是一个基于区块链技术的虚拟世界。</p>
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
          <p>开发方</p>
          <p>xxxx</p>
        </div>
        <div>
          <p>押金</p>
          <p>1000.00 BOS</p>
        </div>
        <div>
          <p>过期时间</p>
          <p>2012.1.1</p>
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
              <div class="momey">
                <div>
                  <p class="title">总额度</p>
                  <p class="number">{{ item.totalLimit }}<span>{{ item.curreny }}</span></p>
                </div>
                <div>
                  <p class="title">剩余额度</p>
                  <p class="number">{{ item.totalLimit }}<span>{{ item.curreny }}</span></p>
                </div>
              </div>
            </div>
            <div>
              <div class="handle">
                <p class="title">操作</p>
                <p><span class="button">取消操作</span></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'

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
      }]
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
        height 140px
        width 140px
        margin-right 40px
        img
          height 140px
          width 140px
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
    padding-bottom 118px
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
          padding 24px 48px 24px 24px
          display flex
          justify-content space-between
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
</style>
