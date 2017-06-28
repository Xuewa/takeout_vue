<template>
  <transition name='moveAlign'>
    <div class="food" v-show="showFlag" ref="food">
      <div>
        <div class="foodImg-wrapper" >
          <img class="food-img" :src="food.image" alt="food.name"/>
          <div class="back" @click="backward($event)"><i class="icon-arrow_lift"></i></div>
        </div>

        <div class="foodBase-info">
          <h2 class="foodName">{{food.name}}</h2>
          <div class="row2">
            <span class="sale">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="row3">
            <span class="price">
              <span class="nowPrice">￥{{food.price}}</span>
              <span class="oldPrice">￥{{food.oldPrice}}</span>
            </span>
            <span class="addCart">
            <transition name="buyFade">
              <span class="cart-btn" v-show="!food.count ||food.count===0" @click.stop.prevent="addFirst">加入购物车</span>
            </transition>
              <div class="cartcontrol-wrapper" v-show="food.count">
                <cartcontrol @add="cartAdd" :food="food"></cartcontrol>
              </div>
            </span>
          </div>
        </div>

        <div class="food-desc">
          <div class="food-title">商品介绍</div>
          <div class="food-desc-content">{{food.info}}</div>
        </div>

        <div class="food-rating">
          <div class="food-title">商品评价</div>
          <!-- tab -->
          <ratingSelect></ratingSelect>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  import ratingSelect from 'components/ratingSelect/ratingSelect.vue';
  import BScroll from 'better-scroll';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    computed: {
    },
    created() {
    },
    methods: {
      initShow() {
        this.showFlag = true;
        // 渲染后再触发滚动事件
        this.$nextTick(() => {
          this.foodScroll = new BScroll(this.$refs.food, {click: true});
        });
      },
      backward(ev) {
        if (!ev._constructed) return;
        this.showFlag = false;
      },
      cartAdd(target) {
        this.$emit('add', target);
      },
      addFirst(ev) {
        if (!ev._constructed) return;
        Vue.set(this.food, 'count', 1);
        this.$emit('add', ev.target);
      }
    },
    components: {
      'cartcontrol': cartcontrol,
      'ratingSelect': ratingSelect
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
  .food
    background-color: #f3f5f7
    z-index: 0
    position: fixed
    top: 0
    bottom: 0
    transition:all 0.3s linear
    transform:translate3d(0,0,0)
    opacity: 1
    &.moveAlign-enter,&.moveAlign-leave-to
      transform:translate3d(-100%,0,0)
      opacity: 0
    .food-img
      width: 100%
    .back
      color: #fff
      font-size: 16px
      position: absolute
      top: 10px
      left: 10px
    .foodBase-info
      padding: 18px
      border-1px(rgba(7, 17, 27, 0.1))
      margin-bottom: 16px
      background-color: #fff
      .foodName
        font-size: 14px
        line-height: 14px
        font-weight: 700
        font-family: '微软雅黑'
      .row2
        margin-top: 8px
        margin-bottom: 18px
        font-size: 10px
        color: rgb(147,153,159)
        line-height: 10px
        .sale
          margin-right: 12px
      .row3
        .nowPrice
          color: rgb(240,20,20)
          font-weight: 700
          font-size:12px
          line-height: 12px
        .oldPrice
          text-decoration: line-through
          font-size:10px
          line-height: 10px
        .cart-btn
          position:absolute
          bottom: 18px
          right:18px
          width: 74px
          height: 24px
          padding: 6px 0
          border-radius: 12px
          text-align: center
          color: #fff
          font-size: 10px
          background-color: rgb(0,160,220)
          box-sizing: border-box
          transition: all 0.5s linear
          opacity: 1
          &.buyFade-enter,&.buyFade-leave-to
            opacity: 0
        .cartcontrol-wrapper
          position:absolute
          bottom: 18px
          right:18px
    .food-desc
      background-color: #fff
      border-top: 1px solid rgba(7,17,27,.1)
      border-1px(rgba(7,17,27,.1))
      margin-bottom:16px
      padding:18px
      .food-title
        font-size:14px
        font-family:'微软雅黑'
        margin-bottom: 6px
        font-weight: bold
        color: #000
      .food-desc-content
        font-size:12px
        line-height:24px
        font-weight:200
        color: rgb(77,85,93) 
    .food-rating
      background-color: #fff
      margin-bottom: 48px
      padding: 18px
      border-top: 1px solid rgba(7,17,27,.1)
     .food-title
        font-size:14px
        font-family:'微软雅黑'
        margin-bottom: 6px
        font-weight: bold
        color: #000
</style>
