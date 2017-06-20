<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item border-1px" v-for="(item,index) in goods" :class="currentIndex===index?'current':''" @click="selectMenu(index,$event)">
          <span class="text">
            <span class="icon" :class="classMap[item.type]" v-if="item.type>0"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li class="foods-list" ref="foodList" v-for="item in goods">
          <div class="title">
            {{item.name}}
          </div>
          <div class="foods-item" v-for="food in item.foods">
            <img class="food-img" :src="food.image" width="57" height="57"/>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="description">{{food.description}}</p>
              <div class="extra">
                <span class="sell">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="nowPrice"><span class="dollar">￥</span>{{food.price}}</span>
                <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol @add="cartAdd" :food="food"></cartcontrol>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart.vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';

  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        heightList: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.heightList.length; i++) {
          let heightMin = this.heightList[i];
          let heightMax = this.heightList[i + 1];
          if (!heightMax || (this.scrollY >= heightMin && this.scrollY < heightMax)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];

      this.$http.get('/api/goods').then((response) => {
        // get body data
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
           // console.log(this.heightList);
          });
        }
      });
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true});
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {click: true, probeType: 3});
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let height = 0;
        let foodList = this.$refs.foodList;
        for (let i = 0; i < foodList.length; i++) {
          this.heightList.push(height);
          height += foodList[i].clientHeight;
        }
      },
      _drop(el) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(el);
        });
      },
      selectMenu(idx, ev) {
        if (!ev._constructed) return;
        let foodList = this.$refs.foodList;
        this.foodScroll.scrollToElement(foodList[idx], 300);
        console.log(idx);
      },
      cartAdd(target) {
        // console.log(target);
        this._drop(target);
      }
    },
    components: {
      'shopcart': shopcart,
      'cartcontrol': cartcontrol
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
  .goods
    display:flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      background-color: #f3f5f7
      width: 80px
      font-size: 12px
      /*overflow: auto*/
      ul
        .menu-item
          height: 52px
          line-height: 14px
          width: 56px
          color: rgb(20, 20, 20)
          padding: 0 12px
          display: table
          border-1px(rgba(7, 17, 37, 0.1))
          &.current
            background-color: #fff
            .text
              font-weight: 700
          .text
            vertical-align: middle
            display: table-cell
            .icon
              width: 12px
              height: 12px
              display: inline-block
              margin-right: 2px
              background-size: 12px 12px
              background-repeat: no-repeat
              vertical-align: top
              &.decrease
                bg-img('decrease_3')
              &.discount
                bg-img('discount_3')
              &.guarantee
                bg-img('guarantee_3')
              &.invoice
                bg-img('invoice_3')
              &.special
                bg-img('special_3')

    .foods-wrapper
      flex: 1
      width: calc(100% - 80px)
      /*overflow: auto;*/
      ul
        .foods-list
          .title
            background-color: #f3f5f7
            height: 26px
            line-height: 26px
            vertical-align: middle
            color: rgb(147, 153, 159)
            font-size: 12px
            border-left: 1px solid #d9dde1
            padding-left: 14px
          .foods-item
            display: flex
            margin: 18px 18px 0 18px
            padding-bottom: 18px
            border-1px(rgba(7, 17, 27, 0.1))
            width: 100%
            &:last-child
              &:after
                border-top: none
            .food-img
              width: 60px
              height: 60px
              margin-right: 10px
              /*vertical-align: top*/
            .content
              height: 60px
              font-size: 10px
              color: rgb(147, 153, 159)
              width: 100%
              .name
                font-size: 14px
                color: rgb(7, 17, 27)
              .description
                margin-top: 8px
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                width: calc(100% - 100px)
              .extra
                margin-top: 8px
              .price
                margin-top: 8px
                .nowPrice
                  color: red
                  font-size: 14px
                  font-weight: 700
                  .dollar
                    font-size: 10px
                .oldPrice
                  font-size: 10px
                  margin-left: 8px
                  text-decoration: line-through;
              .cartcontrol-wrapper
                position: absolute
                right: 20px
                bottom: 0

</style>
