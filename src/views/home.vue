<template>
  <div class="home-warrap">
    <div class="head">
      <div class="top-bar">
       <topBar :isShowbgc="isShowbgc"></topBar>
      </div>
      <img class="top-bg" src="@/assets/home/top.png" />
    </div>
    <div class="access-guide" @click="guide">
      <span><IconFont class="iconfont" name="icon-tishi" />接入指南</span>
    </div>
    <div class="dapp-list-content">
      <ul>
        <li v-for="(item, key) in dappList" :key="key" @click="toDetail">
          <div>
            <div class="info">
              <div class="img-content">
                <img :src="item.avatar"/>
              </div>
              <div>
                <p class="title">{{item.name}}</p>
                <p class="auth">授权状态：{{item.auth}}</p>
              </div>
            </div>
            <div class="brief">{{item.brief}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="bttom"><img src="@/assets/home/bottom.png" /></div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import IconFont from '@/components/Iconfont'

export default {
  name: 'home',
  components: {topBar, IconFont},
  data () {
    return {
      isShowbgc: false,
      dappList: [{
        name: 'BetDice',
        auth: '--',
        brief: '这里是简介，简介最流行去中心化交易所，这里是简介，最流行去中心化交易所，简介简介这里是简介，简介最流行去中心化交易所，这里是简介，最流行去中心化交易所，简介简介这里是简介，简介最流行去中心化交易所，这里是简介，最流行去中心化交易所，简介简介这里是简介，简介最流行去中心化交易所，这里是简介，最流行去中心化交易所，简介简介',
        avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2895986097,3609514076&fm=173&app=25&f=JPEG?w=600&h=400&s=DBACB7475B8662D2062E5B6D0300E068'
      }, {
        name: 'BetDice',
        auth: '--',
        brief: '这里是简介，简介最流行去中心化交易所，这里是简介，最流行去中心化交易所，简介简介',
        avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2895986097,3609514076&fm=173&app=25&f=JPEG?w=600&h=400&s=DBACB7475B8662D2062E5B6D0300E068'
      }, {
        name: 'BetDice',
        auth: '--',
        brief: '这里是简介，简介最流行去中心化交易所，这里是简介，最流行去中心化交易所，简介简介',
        avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2895986097,3609514076&fm=173&app=25&f=JPEG?w=600&h=400&s=DBACB7475B8662D2062E5B6D0300E068'
      }, {
        name: 'BetDice',
        auth: '--',
        brief: '这里是简介，简介最流行去中心化交易所，这里是简介，最流行去中心化交易所，简介简介',
        avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2895986097,3609514076&fm=173&app=25&f=JPEG?w=600&h=400&s=DBACB7475B8662D2062E5B6D0300E068'
      }, {
        name: 'BetDice',
        auth: '--',
        brief: '这里是简介，简介最流行去中心化交易所，这里是简介，最流行去中心化交易所，简介简介',
        avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2895986097,3609514076&fm=173&app=25&f=JPEG?w=600&h=400&s=DBACB7475B8662D2062E5B6D0300E068'
      }]
    }
  },
  methods: {
    toDetail () {
      this.$router.push({path: '/detail'})
    },
    guide () {
      alert(222)
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-warrap
  .head
    width 100%
    height 100%
    position relative
    .top-bg
      width 100%
      height 100%
    .top-bar
      position absolute
      top 0px
      width 100%
  .access-guide
    max-width 1200px
    margin 0 auto
    position relative
    z-index 2
    text-align right
    padding-right 50px
    cursor pointer
    margin-top -20px
    .iconfont
      margin-right 10px
  .dapp-list-content
    max-width 1200px
    margin 0 auto
    position relative
    z-index 2
    ul
      display flex
      flex-wrap wrap
      margin-top 20px
    li
      flex 0 0 33.33%
      margin-top 25px
      height 230px
      width 388px
      >div
        background rgba(255,255,255,1)
        box-shadow 4px 8px 20px 0px rgba(41,26,204,0.1)
        border-radius 6px
        padding 40px
        width 288px
        height 130px
        .info
          display flex
          align-items center
          color #A8A8A8
          .img-content
            height 60px
            width 60px
            border-radius 50%
            margin-right 10px
            img
              height 60px
              width 60px
              border-radius 50%
          .title
            color #333333
            font-size 22px
        .brief
          margin-top 24px
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 3
          overflow hidden
        &:hover
          transition 0.3s
          padding 50px
          border 2px solid #CE2344
          box-shadow 4px 10px 20px 0px rgba(206,35,68,0.12)
          transform translate(-10px, -10px)
  .bttom
    display flex
    justify-content flex-end
    margin-top -150px
    opacity 0.7
    img
      width 65%
      height 300px
@media screen and (max-width: 640px)
  .home-warrap
    .access-guide
      padding-right 16px
    .dapp-list-content
      ul
        padding 0 16px
      li
        margin-top 0
        >div
          width 264px
    .bttom img
      height 200px
</style>
