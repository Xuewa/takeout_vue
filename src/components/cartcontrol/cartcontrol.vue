<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>
<script type="text/ecmascript-6" >
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(ev) {
        if (!ev._constructed) return;
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        };
      },
      decreaseCart(ev) {
        if (!ev._constructed) return;
        if (!this.food.count) {
          Vue.set(this.food, 'count', 0);
        } else {
          this.food.count--;
        }
      }
    }
  };

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 3px
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3D(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
      &.move-enter,&.move-leave
        opacity:0
        transform: translate3D(24px, 0, 0)  
    .cart-count
      display: inline-block
      width:  24px
      height: 24px
      padding-top:3px
      line-height: 24px
      font-size: 10px
      vertical-align: top
      text-align: center
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 3px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
