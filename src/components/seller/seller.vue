<template>
  <div class="seller" ref="seller">
    <div class="seller-container">
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
    			<span class="right-part" @click="toggleCollect($event)">
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
    		<h2 class="seller-title">公共与活动</h2>
	        <div class="bulletin">
	          {{seller.bulletin}}
	        </div>
	        <ul v-if="seller.supports" class="supports">
	          <li class="support-item" v-for="item in seller.supports">
	            <span class="icon" :class="classMap[item.type]"></span>
	            <span class="text">{{item.description}}</span>
	          </li>
	        </ul>
	  	</div>
    	<div class="seller-pics">
	        <h2 class="seller-title">商家实景</h2>
	        <div class="pics-wrapper" ref="picsWrapper">
	          <ul class="pics" ref="pics">
	            <li class="pic" v-for="pic in seller.pics" >
	              <img :src="pic" width="120" height="90" />
	            </li>
	          </ul>
	        </div>
        </div>
		<div class="seller-bottom">
			<h2 class="seller-title">商家信息</h2>
			<ul class="infos">
		  		<li class="info" v-for="info in seller.infos">{{info}}</li>
			</ul>
		</div>
	</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star.vue';
  import BScroll from 'better-scroll';
  import * as store from 'common/js/store';

  export default {
    props: {
      seller: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        collectFlag: (() => {
          return store.getStorage(this.seller.id, 'collect');
        })()
        // collectFlag: false
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
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    watch: {
      'seller'() {
        // console.log('watch--');
        this.$nextTick(() => {
          this._initSellerScroll();
          this._initPicsScroll();
        });
      }
    },
    mounted() {
      // console.log('mounted--');
      this.$nextTick(() => {
        this._initSellerScroll();
        this._initPicsScroll();
      });
    },
    methods: {
      _initSellerScroll() {
        console.log(this.seller.id);
        if (!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$refs.seller, {click: true});
          // console.log(this.sellerScroll);
        } else {
          // console.log(this.sellerScroll);
          this.sellerScroll.refresh();
        }
      },
      _initPicsScroll() {
        var width = 0;
        if (this.seller.pics && this.seller.pics.length) {
          let n = this.seller.pics.length;
          const margin = 6;
          const picWidth = 120;
          width = (picWidth + margin) * n - margin;
        }
        this.$refs.pics.style.width = width + 'px';
        this.$nextTick(() => {
          if (!this.picsScroll) {
            this.picsScroll = new BScroll(this.$refs.picsWrapper, {scrollX: true, eventPassthrough: 'vertical'});
          } else {
            this.picsScroll.refresh();
          }
        });
      },
      toggleCollect(ev) {
        if (!ev._constructed) {
          return;
        }
        this.collectFlag = !this.collectFlag;
        store.setStorage(this.seller.id, 'collect', this.collectFlag);
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
    position:absolute
    top: 177px
    bottom:0
    left:0
    right:0
    overflow:hidden
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
          color:rgba(77,85,93,.7)
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
        .deliveryTime
          border-right:none
    .seller-middle
      border-top: 1px solid rgba(7,17,27,.1)
      border-1px(rgba(7,17,27,.1))
      padding: 18px
      background-color: #fff
      margin-bottom:16px
      .seller-title
        font-size:14px
        color: rgb(7,17,27)
        line-height:14px
        font-weight: 500
        margin-bottom: 8px
      .bulletin
        font-size: 12px
        font-weight: 200
        color: rgb(240,20,20)
        line-height: 24px
        margin:0 12px
      .supports
        margin-top: 16px
        .support-item
          padding:16px 12px
          font-size: 12px
          font-weight:200
          color: rgb(7,17,27)
          line-height:16px
          border-top:1px solid rgba(7,17,27,.1)
          .icon
            width: 16px
            height: 16px
            display: inline-block
            margin-right: 4px
            background-size: 16px 16px
            background-repeat: no-repeat
            vertical-align: bottom
            &.decrease
              bg-img('decrease_4')
            &.discount
              bg-img('discount_4')
            &.guarantee
              bg-img('guarantee_4')
            &.invoice
              bg-img('invoice_4')
            &.special
              bg-img('special_4')
          .text
            font-size: 10px
            line-height: 12px
            /*margin-left: 4px*/
          &:last-child
            padding-bottom:0
    .seller-pics
      margin-top:16px
      border-top: 1px solid rgba(7,17,27,.1)
      border-1px(rgba(7,17,27,.1))
      background-color:#fff
      padding:18px
      .seller-title
        margin-bottom:12px
      .pics-wrapper
        overflow:hidden
        .pics
          height:90px
          white-space: nowrap
          .pic
            display:inline-block
            margin-right:6px
            font-size:0
            line-height:0
            width:120px
            height:90px
            &:last-child
              margin-right:0
    .seller-bottom
      margin-top:16px
      border-top: 1px solid rgba(7,17,27,.1)
      border-1px(rgba(7,17,27,.1))
      background-color:#fff
      padding:18px
      .infos
        margin-top:12px
        .info
          padding:16px 12px
          font-size: 12px
          font-weight:300
          color: rgb(7,17,27)
          line-height:16px
          border-top:1px solid rgba(7,17,27,.1)
          &:last-child
            padding-bottom:0
</style>
