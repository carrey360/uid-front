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
            <button @click="chargeOpen = true">充值</button>
            <button @click="transferOpen = true">转账</button>
            <button @click="createOpen = true">创建主网账户</button>
          </div>
        </div>
      </div>
    </div>
    <modal
      :visible="chargeOpen"
      @hide="chargeOpen = false"
      :resize-width='{1200:"476",992:"476",768:"90%"}'
      defaultWidth="476px"
      :animation-panel="'modal-slide-top'"
      >
      <h1 class="wallet-dialog-title">请按以下信息充值</h1>
      <div class="wallet-dialog-content">
        <div class="wallet-dialog-content-input-label">
          <span>Account to be credited</span>
          <span class="copy"><IconFont name="icon-fuzhi" type="svg"/>复制</span>
        </div>
        <LimitInput  warn=""/>
        <div class="wallet-dialog-content-input-label">
          <span>Memo</span>
          <span class="copy"><IconFont name="icon-fuzhi" type="svg"/>复制</span>
        </div>
        <LimitInput warn=""/>
      </div>
    </modal>
    <modal
      :visible="transferOpen"
      @hide="transferOpen = false"
      :resize-width='{1200:"476",992:"476",768:"90%"}'
      defaultWidth="476px"
      :animation-panel="'modal-slide-top'"
      >
      <h1 class="wallet-dialog-title">请输入转账信息</h1>
      <div class="wallet-dialog-content">
        <LimitInput label="Account to be credited" warn=""/>
        <LimitInput label="Amount" warn=""/>
        <LimitInput label="Memo" warn=""/>
        <button class="transfer-submit">确认转账</button>
      </div>
    </modal>
    <modal
      :visible="createOpen"
      @hide="createOpen = false"
      :resize-width='{1200:"476",992:"476",768:"90%"}'
      defaultWidth="476px"
      :animation-panel="'modal-slide-top'"
      >
      <h1 class="wallet-dialog-title">创建主网账号</h1>
      <div class="wallet-dialog-content">
        <LimitInput label="账号" warn="4-8位字符，需包含数字1-5和字母a-z两种元素"/>
        <div class="wallet-dialog-content-input-label">
          <span>公钥</span>
          <span class="copy">生成新公钥</span>
        </div>
        <textarea class="wallet-dialog-content-textarea"></textarea>
        <p class="wallet-dialog-content-input-remark">所有者和使用者公钥相同</p>
        <br>
        <div class="wallet-dialog-content-input-label">
          <span>私钥</span>
        </div>
        <textarea class="wallet-dialog-content-textarea"></textarea>
        <p class="wallet-dialog-content-input-remark-warn">不要透露给任何人</p>
        <br>
        <br>
        <div class="wallet-dialog-content-text">
          <h4>离线保存</h4>
          <p>建议抄写或打印私钥后放置在安全地点保存</p>
          <br>
          <h4>请勿使用网络传输</h4>
          <p>请勿通过网络工具传输私钥，例如用微信发送到电脑。一旦被黑 客获取造成不可挽回的资产损失</p>
        </div>
        <br>
        <button class="transfer-submit">创建账号</button>
      </div>
    </modal>
  </div>
</template>

<script>
import modal from '@/components/modal'
import topBar from '@/components/topBar'
import LimitInput from '@/components/input'
import IconFont from '@/components/Iconfont'
export default {
  name: 'App',
  components: { modal, topBar, LimitInput, IconFont },
  data () {
    return {
      chargeOpen: false,
      transferOpen: false,
      createOpen: false,
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
.wallet-dialog-content
  font-size 14px
  padding 33px
  .copy
    color #455DE1
    fobt-size 12px
    svg
      width 12px
      height 12px
      margin-right 6px
  .wallet-dialog-content-input-label
    display flex
    > span:first-child
      flex 1
.wallet-dialog-title
  font-size 24px
  font-family PingFangSC-Semibold
  font-weight 600
  color rgba(206,35,68,1)
  padding-left 33px
.transfer-submit
  font-size 14px
  font-weight 600
  color rgba(255,255,255,1)
  width 100%
  margin-top 15px
  height 40px
  border-radius 4px
  background rgba(206,35,68,1)
  border 0
  outline none
  cursor pointer
  &:hover
    background-color #c11e3e
.wallet-dialog-content-textarea
  border 0
  border 1px solid #D8D8D8
  height 70px
  width 100%
  padding 0 12px
  outline none
  box-sizing border-box
  border-radius 2px
  margin-top 10px
  &:hover, &:focus
    border-color #CE2344
.wallet-dialog-content-input-remark
  font-size 12px
  color #a8a8a8
  margin-top 5px
.wallet-dialog-content-input-remark-warn
  color #CE2344
  font-size 12px
  margin-top 5px
.wallet-dialog-content-text
  color rgba(93,66,32,1)
@media screen and (max-width: 768px)
  .wallet-wrapper
    .wallet-content
      .wallet-items
        width 100%
</style>
