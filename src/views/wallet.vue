<template>
  <div class="wallet-wrapper">
    <topBar></topBar>
    <div class="wallet-top">
      <div>
        <img width="140" src="../assets/wallet/wallet-icon.jpg" alt="">
      </div>
      <div>
        <h2>Name</h2>
        <p>签名</p>
      </div>
    </div>
    <div class="wallet-content">
      <div>
        <div class="wallet-items" v-for="(i, k) in walletList" :key="k">
          <div class="wallet-items-title">
            <img width="40" src="../assets/wallet/wallet-icon.jpg" alt="">
            <span>{{i.name}}</span>
          </div>
          <p class="wallet-items-balance">
            <span>余额：</span>
            <b>{{i.balance}}</b>
          </p>
          <div class="wallet-items-btn">
            <button @click="open = true">充值</button>
            <button>转账</button>
            <button>创建主网账户</button>
          </div>
        </div>
      </div>
    </div>
    <modal
      :visible="open"
      @hide="open = false"
      :resize-width='{1200:"60%",992:"80%",768:"90%"}'
      :animation-panel="'modal-slide-top'"
      >
      <p>Lorem ipsum dolor sit amet</p>
    </modal>
  </div>
</template>

<script>
import modal from '@/components/modal'
import topBar from '@/components/topBar'

export default {
  name: 'App',
  components: { modal, topBar },
  data () {
    return {
      open: false,
      walletList: [{
        name: 'BOS',
        balance: 24222600.0202
      }, {
        name: 'BOS',
        balance: 24222600.0202
      }, {
        name: 'BOS',
        balance: 24222600.0202
      }, {
        name: 'BOS',
        balance: 24222600.0202
      }]
    }
  }
}
</script>
<style lang="stylus" scoped>
.wallet-wrapper
  .wallet-top
    display flex
    max-width 1200px
    margin 0 auto
    padding 40px 0
    > div:first-child
      width 140px
      margin-right 40px
    > div:last-child
      width 100%
      line-height 40px
      h2
        font-size 22px
        font-weight 500
        color #333333
        margin-top 30px
      p
        font-size 16px
        color rgba(168,168,168,1)
  .wallet-content
    background rgba(250,249,252,1)
    padding-top 40px
    > div
      max-width 1200px
      margin 0 auto
    .wallet-items
      width 284px
      height 205px
      background-color #fff
      box-shadow 4px 8px 20px 0px rgba(41,26,204,0.1)
      border-radius 6px
      padding 24px
      box-sizing border-box
      display inline-block
      margin-right 24px
      margin-bottom 24px
      .wallet-items-title
        span
          font-size 18px
          font-weight 500px
          color #333
          font-weight 500
          position relative
          top -10px
          margin-left 10px
      .wallet-items-balance
        margin-top 20px
        > span, > b
          font-size 14px
          font-weight 400
          color rgba(18,18,18,0.5)
        > b
          font-size 18px
      .wallet-items-btn
        margin-top 35px
        > button
          border-radius 4px
          border 1px solid rgba(217,213,226,1)
          padding 5px 12px
          color #CE2344
          font-size 12px
          margin-right 15px
          cursor pointer
          outline none
          &:hover
            background #CE2344
            border 1px solid #CE2344
            color #fff
        > button:last-child
          margin 0
@media screen and (max-width: 768px)
  .wallet-wrapper
    .wallet-content
      .wallet-items
        width 100%
</style>
