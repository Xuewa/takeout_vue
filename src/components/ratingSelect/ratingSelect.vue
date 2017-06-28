<template>
  <div class="ratingSelect">
  	<ul class="ratingTabs">
  		<li class="allTab"></li>
  		<li class="positiveTab"></li>
  		<li class="negativeTab"></li>
  	</ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      ratingType: {
        type: Number,
        default: 2
      },
      onlyContent: {
        type: Boolean,
        detault: true
      },
      ratingArr: {
        type: Array,
        default: []
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
  .ratingTabs
    li
      color: rgb(77,85,93)
      font-size: 12px
      line-height: 16px
      border-radius: 24px
      &.active
        color: #fff
        background-color: rgb(0,160,220)
</style>
