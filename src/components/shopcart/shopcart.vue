<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<span class="logo" :class="{'current':totalCount>0}">
					  <i class="icon-shopping_cart "></i>
					</span>
          			<span class="num" v-if="totalCount>0">{{totalCount}}</span>
				</div>
				<span class="price" :class="{'highlight':totalCount>0}">
					￥{{totalPrice}}
				</span>
				<span class="desc">另需配送费￥{{deliveryPrice}}元</span>
			</div>
			<div class="content-right">
				<span class="pay" :class="{'highlight':totalPrice>=minPrice}">
				{{payDesc}}</span>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{
          price: 10,
          count: 1
        }];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.selectFoods.length; i++) {
        total += this.selectFoods[i].price * this.selectFoods[i].count;
      }
      return total;
    },
    totalCount() {
      let count = 0;
      for (let i = 0; i < this.selectFoods.length; i++) {
        count += this.selectFoods[i].count;
      }
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) return `￥${this.minPrice}元起送`;
      else if (this.totalPrice < this.minPrice) {
        let leftMon = this.minPrice - this.totalPrice;
        return `还差￥${leftMon}元起送`;
      } else return '去结算';
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.shopcart
		position: fixed
		bottom: 0
		z-index: 2
		height: 48px
		width: 100%
		.content
			background-color: #141d27
			display: flex
			color: rgba(255,255,255,.4)
			.content-left
				flex: 1
				.logo-wrapper
					float: left
					position: relative
					top: -10px
					padding: 6px
					margin:0 12px 0 12px
					display: inline-block
					width: 56px
					height: 56px
					box-sizing:border-box
					background-color: #141d27
					vertical-align: top
					border-radius: 50%
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						background-color: #2b343c
						display: inline-block
						.icon-shopping_cart
							color: rgba(255,255,255,.4)
						font-size: 24px
						line-height: 44px
						text-align: center
						&.current
							background-color: rgb(0, 160, 220)
							.icon-shopping_cart
								color: #fff
					.num
						position: absolute
						background-color: rgb(240, 20, 20)
						border-radius: 12px
						color: #fff
						font-weight: 700
						font-size: 9px
						padding:3px
						box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
						min-width: 24px
						text-align:center
						top: -2px
						right: 0px
				.price
					display: inline-block
					float: left
					font-weight: 700
					line-height: 24px
					margin: 12px 0 12px 0
					padding-right: 12px
					box-sizing: border-box
					font-size: 16px
					vertical-align: top
					border-right: 1px solid rgba(255,255,255,.2)
					&.highlight
						color: #fff
				.desc
					float: left
					display: inline-block
					vertical-align:top
					line-height: 24px
					margin: 12px 0 0 12px
					font-size: 10px
			.content-right
				flex: 0 0 105px
				max-width: 105px
				background-color: #2b333b
				.pay
					font-size: 12px
					height: 48px
					line-height: 48px
					font-weight: 700
					text-align: center
					display: block
					&.highlight
						background-color: rgb(0, 160, 220)
						color: #fff
						font-size: 16px
</style>
