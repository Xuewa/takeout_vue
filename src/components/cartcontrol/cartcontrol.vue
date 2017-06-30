<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)" >
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
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
        if (!ev._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        };
        console.log(this.food.count);
        this.$emit('add', ev.target);
        ev.stopPropagation();
      },
      decreaseCart(ev) {
        if (!ev._constructed) return;
        console.log(this.food);
        if (this.food.count) {
          this.food.count--;
        }
        ev.stopPropagation();
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
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(180deg)
      &.move-enter,&.move-leave-to
        opacity:0
        transform: translate3d(24px, 0, 0) 
        .inner 
          transform: rotate(0deg)
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
