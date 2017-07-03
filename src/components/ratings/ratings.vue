<template>
  <div class="ratings">
  	<div class="ratings-top">
  	  <span class="score-part">
  	  	<span class="score">
  	  	  <font>3.9</font>
  	  	  <label for="" class="score-title">综合评分</label>
  	  	</span>
  	  	<span class="compare">
  	  	  高于周边商家69.2%	
  	  	</span>
  	  </span>
  	  <span class="stars-part">
  	    <span class="row">
  	  	  <label for="" class="score-title">服务态度</label>
  	  	  <star></star>
  	  	  <font class="score">4.1</font>
  	    </span>
  	    <span class="row"> 
  	  	  <label for="" class="score-title">商品评分</label>
  	  	  <star></star>
  	  	  <font class="score">4.3</font>
  	  	</span>
  	  	<span class="row"> 
  	  	  <label for="" class="score-title">商品评分</label>
  	  	  <font class="min">38分钟</font>
  	  	</span>
  	  </span>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import Vue from 'vue';
  import star from 'components/star/star.vue';
  export default {
    components: {
      star: star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    background-color: #f3f5f7
    .ratings-top
      border-1px(rgba(7, 17, 27, 0.1))
      background-color: #fff
      padding:18px 0
      .score-part
        display:inline-block;
        width: 36.7%
        text-align: center
        font
          color: rgb(255,153,0)
          line-height: 28px
          font-size: 24px
        .score-title
          width:100%
          display:inline-block
      .stars-part
        display:inline-block
        width: 63.3%
        float:right
</style>
