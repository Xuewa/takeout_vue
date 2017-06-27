<template>
  <div class="food">

    <div class="foodImg-wrapper" >
      <img class="food-img" :src="food.image" alt="food.name"/>
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
          <button>加入购物车</button>
          <!-- <cartcontrol></cartcontrol> -->
        </span>
      </div>
    </div>

    <div class="food-desc">
      <div class="food-title">商品介绍</div>
      <div class="food-desc">{{food.info}}</div>
    </div>

    <div class="food-rating">
      <div class="food-title">商品评价</div>
      <!-- <ratingList></rating>   -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
      };
    },
    computed: {
    },
    created() {
    },
    methods: {
    },
    components: {
      'cartcontrol': cartcontrol
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
    .food-img
      width: 100%
    .foodBase-info
      padding: 18px
      .foodName
        font-size: 28px
        line-height: 28px
        font-weight: 700
        font-family: '微软雅黑'
      .row2
        margin-top: 8px
        margin-bottom: 18px
        font-size: 20px
        color: rgb(147,153,159)
        line-height: 20px
        .sale
          margin-right: 12px
      .row3
        .nowPrice
          color: rgb(240,20,20)
          font-weight: 700
          font-size:24px
          line-height: 24px
        .oldPrice
          text-decoration: line-through
</style>
