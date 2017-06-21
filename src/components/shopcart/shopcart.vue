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
		<div class="balls-container">
			<div v-for="ball in balls">
				<transition name="drop" @before-enter="beforeDropEnter" @enter="droppingEnter" @after-enter="afterDropEnter">
					<div class="ball" v-show="ball.show">
						 <div class="inner inner-hook"></div>
					</div>
				</transition>
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
      dropBalls: []
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
    }
  },
  methods: {
    drop(el) {
      console.log(el);
      for (let i = 0; i < this.balls.length; i++) {
        if (!this.balls[i].show) {
          this.balls[i].show = true;
          this.balls[i].el = el;
          this.dropBalls.push(this.balls[i]);
          // console.log(this.dropBalls);
          return;
        }
      };
    },
    beforeDropEnter(el) {
      // el==>ball?
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          // let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(100px,0,0)`;
          inner.style.transform = `translate3d(100px,0,0)`;
          console.log(inner);
        }
      }
    },
    droppingEnter(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.opacity = 1;
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        console.log(inner);
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend', done);
      });
    },
    // 动画结束
    afterDropEnter(el) {
      let inner = el.getElementsByClassName('inner-hook')[0];
      // console.log(inner.style.transform);
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
        // console.log(el);
      }
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
		.balls-container			
			.ball
				transition: all 0.4s cubic-bezier(0.49,-0.29,0.72,0.41)
				position: fixed
				left: 32px
				bottom: 22px
				z-index: 3
				.inner
					width: 16px
					height: 16px
					border-radius: 50%
					background-color: rgb(10, 160, 220)
				    transition: all 0.4s linear

</style>
