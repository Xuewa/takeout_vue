<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let scoreInt = Math.floor(this.score);
        // 全星
        while (result.length < scoreInt) {
          result.push(CLS_ON);
        }
        var rest = this.score - scoreInt;
        if (rest > 0) {
          result[scoreInt] = rest > 0.5 ? CLS_ON : CLS_HALF;
        }
        // 灰色星
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }

        console.log(result);
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .star
    text-align: center
    display:inline-block
    vertical-align: top
    &.star-48
      .star-item
        width: 24px
        height: 24px
        background-size: 24px 24px
        display: inline-block
        margin-right: 15px
        &.on
          bg-img('star48_on')
        &.off
          bg-img('star48_off')
        &.half
          bg-img('star48_half')
    &.star-36
       .star-item
          width: 15px
          height: 15px
          background-size: 15px 15px
          display: inline-block
          margin-right: 6px
          &:last-child
            margin-right:0
          &.on
            bg-img('star36_on')
          &.off
            bg-img('star36_off')
          &.half
            bg-img('star36_half')
    &.star-24
        .star-item
          width: 10px
          height: 10px
          background-size: 10px 10px
          display: inline-block
          margin-right: 3px
          &.on
            bg-img('star24_on')
          &.off
            bg-img('star24_off')
          &.half
            bg-img('star24_half')
</style>
