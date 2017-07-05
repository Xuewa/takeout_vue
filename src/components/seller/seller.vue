<template>
  <div class="seller">
  	<div class="seller-top">
  		<div class="top-row">
  			<span class="left-part">
				<span class="inner-row">
				  <font class="sellerName">{{seller.name}}</font>
				</span>
				<span class="inner-row">
				  <star :score="seller.score" :size="36"></star><!--
			   --><font class="ratingCount">({{seller.ratingCount}})</font><!--
			   --><font class="sellCount">月售{{seller.sellCount}}单</font>
				</span>
  			</span>
  			<span class="right-part">
  		      	<i class="icon-favorite" :class="collectFlag? 'active' :''"></i><font class="collectTip">{{collectTip}}</font>
  			</span>
  		</div>
  		<div class="bottom-row">
  			<span class="minPrice">
  				<span class="tip">起步价</span>
  				<span class="data">
  				  <font class="num">{{seller.minPrice}}</font><font class="unit">元</font></span>
  			</span>
  			<span class="deliveryPrice">
  				<span class="tip">商家配送</span>
  				<span class="data">
  				  <font class="num">{{seller.deliveryPrice}}</font><font class="unit">元</font></span>
  				</span>
  			</span>
  			<span class="deliveryTime">
  				<span class="tip">平均配送时间</span>
  				<span class="data">
  			      <font class="num">{{seller.deliveryTime}}</font><font class="unit">分钟</font></span>
  				</span>
  			</span>
  		</div>
  	</div>
  	<div class="seller-middle">
  		<h2>公共与活动</h2>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star.vue';

  export default {
    props: {
      seller: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        collectFlag: true
      };
    },
    computed: {
      collectTip() {
        if (this.collectFlag) {
          return '已收藏';
        } else {
          return '收藏';
        }
      }
    },
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
  .seller
    background-color: #f3f5f7
    .seller-top
      border-1px(rgba(7, 17, 27, 0.1))
      background-color:#fff
      margin-bottom: 16px
      .top-row
        border-1px(rgba(7, 17, 27,0.1))
        padding:18px 0
        margin:0 18px
     	.left-part
          .inner-row
            display:block
            margin-bottom: 8px
            .sellerName
              font-size:14px
              color: rgb(7,17,27)
              line-height:14px
              font-weight: 500
            .ratingCount
              font-size:10px
              color:rgb(77,85,93)
              line-height:18px
              margin-left:8px
              margin-right:12px
            .sellCount
              font-size:10px
              color:rgb(77,85,93)
              line-height:18px
        .right-part
          position:absolute
          right:0
          top:18px
          font-size: 24px
          line-height: 24px
          width:50px
          text-align:center
          .active
            color: #f01414
          .collectTip
            font-size:10px
            margin-top:4px
            line-height:10px
            color:rgb(77,85,93)
            display:block
      .bottom-row
        padding:18px
        display:flex
        .minPrice,.deliveryPrice,.deliveryTime
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          text-align:center
          border-right:1px solid rgba(7,17,27,.1)
          .tip
            color: rgb(147,153,159)
            line-height:10px
            font-size:10px
            display:block
            margin-bottom:4px
          .data
            font-size: 24px
            font-weight:200
            color:rgb(7,17,27)
            line-height:24px
            .unit
              font-size:10px
              color:rgb(7,17,27)
              font-weight:500
    .seller-middle
      border-top: 1px solid rgba(7,17,27,.1)
      padding: 18px
</style>
