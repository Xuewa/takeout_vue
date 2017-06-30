<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left" @click="toggleCartList()">
				<div class="logo-wrapper" >
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
			<div class="content-right" @click="pay">
				<span class="pay" :class="{'highlight':totalPrice>=minPrice}">
				{{payDesc}}</span>
			</div>
		</div>
		<div class="balls-container">
			<div v-for="ball in balls">
				<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
					<div class="ball" v-show="ball.show">
						 <div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
		<transition name="toggleUp">
			<div class="shopcart-list" v-show="listShow">
				<div class="shopcartList-header">
					<span class="title">购物车</span>
					<span class="empty" @click="empty()">清空</span>
				</div>
				<div class="shopcartList-content" ref="cartListWrapper">
					<ul>
						<li class="food-item" v-for="food in selectFoods">
							<span class="shopcartList-left">{{food.name}}</span>
							<span class="shopcartList-right">
								<span class="price">￥{{food.price*food.count}}</span>
								<span class="cartcontrol-wrapper">
		            				<cartcontrol  :food="food"></cartcontrol>
		          				</span>
							</span>

						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="mask"  @click=toggleCartList() v-show="listShow"></div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
import BScroll from 'better-scroll';

export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{
          price: 10,
          count: 0
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
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      // 折叠属性
      fold: true
    };
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
    },
    listShow() {
      return (this.totalCount) && (!this.fold);
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          // console.log(rect);
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend', done);
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    toggleCartList() {
      if (!this.totalCount) {
        this.fold = true;
        return;
      } else {
        this.fold = !this.fold;
      }
      this.$nextTick(() => {
        this.cartListScroll = new BScroll(this.$refs.cartListWrapper, {click: true});
      });
    },
    empty() {
    // 可以访问改写props的属性
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
      this.fold = true;
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      } else {
        let payMon = this.totalPrice + this.deliveryPrice;
        alert(`支付${payMon}大洋！`);
      }
    }
  },
  components: {
    cartcontrol: cartcontrol
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
			position: absolute
			left: 0
			right: 0
			z-index: 2
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
		.balls-container
			.ball
				position: fixed
				left: 32px
				bottom: 22px
				z-index: 200
				transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
				.inner
					width: 16px
					height: 16px
					display: inline-block
					border-radius: 50%
					background: rgb(0, 160, 220)
					transition: all 0.4s linear
		.shopcart-list
			position: absolute
			z-index: 1
			bottom: 48px
			left: 0;
			right: 0;
			background-color: #fff;
			max-height: 305.5px
			overflow-y: auto
			transition: all 0.6s linear
			transform: translate3d(0, 0, 0)
			opacity: 1
			&.toggleUp-enter,&.toggleUp-leave-to
				opacity: 0
				transform: translate3d(0, 305.5px, 0) 
			.shopcartList-header
				font-size: 14px
				font-weight: 200
				color: rgb(7,17,27)
				line-height: 40px
				height: 40
				background-color: #f3f5f7
				border-bottom: 1px solid rgba(7,17,27,.1)
				.title
					margin-left: 18px
				.empty
					float: right
					color: rgb(0, 160, 220)
					margin-right: 18px
			.shopcartList-content
				.food-item
					height:24px
					padding: 12px 18px
					border-bottom: 1px solid rgba(7,17,27,.1)
					.shopcartList-left
						display: inline-block
						color: rgb(7,17,27)
						line-height: 24px
					.shopcartList-right
						color: rgb(240,20,20)
						font-weight: 700
						font-size: 14px
						line-height: 24px
						float: right
						display: inline-block
						.price
							line-height: 24px
							margin-right: 12px
						.cartcontrol-wrapper
							float:right
		.mask
			background-color: rgba(7,17,27,.6)
			filter: blur(10px)
			backdrop-filter: blur(10px)
			-webkit-filter: blur(10px)
			position: fixed
			top: 0
			bottom: 0
			left: 0
			right: 0
			z-index: 0
			opacity: 1
			transition: all 0.7s linear
			&.fade-enter,&.fade-leave-to
				opacity: 0
</style>
