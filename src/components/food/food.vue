<template>
  <transition name='moveAlign'>
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-container">
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
          <ratingSelect @ratingTypeSelect="ratingTypeSelect" @contentToggle="contentToggle" :selectType="rateType"
          :onlyContent="onlyContent" :ratingArr="food.ratings"></ratingSelect>
          <div class="ratingList-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li  v-for="rating in food.ratings" v-show="needShow(rating)">
                <div class="row1">
                  <span class="time">
                    {{rating.rateTime | formatDate}}
                  </span>
                  <span class="user">
                    {{rating.username}}
                    <img :src="rating.avatar
                    " alt="rating.username">
                  </span>
                </div>
                <div class="rating-content">
                  <i class="icon-thumb_down"  v-show="rating.rateType===0"></i>
                  <i class="icon-thumb_up" v-show="rating.rateType===1"></i>
                  {{rating.text}}
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import {formatDate} from 'common/js/utils';
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
        showFlag: false,
        rateType: 2,
        onlyContent: false
      };
    },
    computed: {
    },
    created() {
    },
    methods: {
      initShow() {
        this.showFlag = true;
        this.rateType = 2;
        this.onlyContent = false;
        // 渲染后再触发滚动事件
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs.food, {click: true});
          } else {
            this.foodScroll.refresh();
          }
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
        this.$emit('add', ev.target);
        Vue.set(this.food, 'count', 1);
      },
      needShow(rating) {
        if (this.onlyContent && !rating.text) {
          return false;
        };
        if (this.rateType === 2) {
          console.log('true');
          return true;
        } else {
          return this.rateType === rating.rateType;
        }
      },
      ratingTypeSelect(type) {
        console.log(type);
        this.rateType = type;
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs.food, {click: true});
          } else {
            this.foodScroll.refresh();
          }
        });
      },
      contentToggle(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs.food, {click: true});
          } else {
            this.foodScroll.refresh();
          }
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd HH:mm');
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
    left: 0
    right: 0
    transition:all 0.3s linear
    transform:translate3d(0,0,0)
    opacity: 1
    margin-bottom: 24px
    &.moveAlign-enter,&.moveAlign-leave-to
      transform:translate3d(-100%,0,0)
      opacity: 0
    .food-container
      .food-img
        width: 100%
      .back
        color: rgba(70,70,70,.2)
        font-size: 16px
        position: absolute
        top: 10px
        left: 10px
        background-color:rgba(255,255,255,.5)
        width:24px
        height:24px
        line-height:26px
        text-align: center
        border-radius:50%
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
        margin-bottom: 6px
        padding: 18px 0
        border-top: 1px solid rgba(7,17,27,.1)
        .food-title
          font-size:14px
          font-family:'微软雅黑'
          margin-bottom: 18px
          font-weight: bold
          color: #000
          padding-left:18px
        .ratingList-wrapper   
          li
            border-1px(rgba(7,17,27,.1))
            padding:16px 0
            margin:0 16px
            .row1
              margin-bottom: 6px
              .time
                font-size: 10px
                color: rgb(147,153,159)
                line-height: 12px
              .user
                font-size: 10px
                color: rgb(147,153,159)
                line-height: 12px
                float: right
                img
                  width: 12px
                  height: 12px
                  border-radius: 50%
            .rating-content
              font-size:12px
              font-weight: 500
              color: rgb(7,17,27)
              line-height:16px
              i
                font-size: 12px
                line-height: 24px
                color: rgb(147,153,159)
                margin-right: 4px
                &.icon-thumb_up
                  color: rgb(0,160,220)
</style>
