<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="商家头像"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports"  v-if="seller.supports" >
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supports-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <v-star :score="seller.score" :size="48"></v-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="text">
                {{seller.bulletin}}
              </p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star.vue';
export default {
  // 调用组件的组件传入的参数
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  },
  components: {
    'v-star': star
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
  .header
    color: #fff
    background-color: rgba(7, 17, 27, 0.5)
    overflow: hidden
    position: relative
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      .avatar
        vertical-align: top
        display: inline-block
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin-bottom: 8px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            bg-img('brand')
            background-size : 30px 18px
            background-repeat: no-repeat
            vertical-align: top
          .name
            font-weight: bold
            font-size: 16px
            margin-left: 6px
            line-height: 18px
        .description
          font-size: 12px
          line-height: 12px
          margin-bottom: 10px
        .supports
          margin-bottom: 2px
          .icon
            width: 12px
            height: 12px
            display: inline-block
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            vertical-align: bottom
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
          .text
            font-size: 10px
            line-height: 12px
            /*margin-left: 4px*/
      .supports-count
        position: absolute
        right: 12px
        bottom: 18px
        background-color: rgba(0, 0, 0, 0.2)
        padding: 0px 8px
        border-radius: 14px
        height: 24px
        line-height: 24px
        font-size: 10px
        .count
          /*vertical-align: top*/
        .icon-keyboard_arrow_right
          line-height: 24px
          margin-left: 2px
    .bulletin-wrapper
      position: relative
      background-color: rgba(7, 17, 27, 0.2)
      white-space: nowrap
      /*font-size: 0*/
      text-overflow: ellipsis
      overflow: hidden
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      .bulletin-title
        vertical-align: top
        margin-top: 7px
        display: inline-block
        width: 22px
        height: 12px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 8px
        margin-left: 2px
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      width: 100%
      height: 100%
      z-index: 11
      top: 0
      left: 0
      overflow: auto
      background-color: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(10px)
      &.fade-enter-active, &.fade-leave-active
        /*opacity: 1*/
        transition: all 0.5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background-color: rgba(7, 17, 27, 0)
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          /*margin-top: 64px*/
          padding-bottom: 64px
          .name
            line-height: 16px
            font-size: 16px
            font-weight: 700
            margin: 64px 0 16px 0
            text-align: center
          .star-wrapper
            text-align:center
          .title
            width: 80%
            display: flex
            margin: 28px auto 24px auto
            .line
              border-bottom: 1px solid rgba(250, 250, 250, 0.2)
              flex: 1
              position: relative
              top: -6px
            .text
              padding: 0 12px
              font-size: 14px
              font-weight: 700
          .supports
            width: 80%
            font-size: 12px
            margin:0 auto
            .support-item
              margin-bottom: 12px
              margin-right: 12px
              &:last-child
                margin-bottom: 0
              .icon
                margin: 0 6px 0 12px
                width: 16px
                height: 16px
                display: inline-block
                background-size: 16px 16px
                background-repeat: no-repeat
                vertical-align: middle
                &.decrease
                  bg-img('decrease_1')
                &.discount
                  bg-img('discount_1')
                &.guarantee
                  bg-img('guarantee_1')
                &.invoice
                  bg-img('invoice_1')
                &.special
                  bg-img('special_1')
              .text
                font-size: 12px
                line-height: 12px
          .bulletin
            width: 80%
            margin:24px auto
            font-size: 12px
            .text
              margin: 0 12px
              line-height: 24px
      .detail-close
        width: 32px
        height: 32px
        position: relative
        margin: -64px auto 0 auto
        clear: both


</style>
