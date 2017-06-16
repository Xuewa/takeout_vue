<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item border-1px" v-for="item in goods">
          <span class="text">
            <span class="icon" :class="classMap[item.type]" v-if="item.type>0"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper">
      <ul>
        <li class="foods-list" v-for="item in goods">
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
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0;
  export default {
    data() {
      return {
        goods: []
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$http.get('/api/goods').then((response) => {
        // get body data
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
//          console.log(this.goods);
        }
      });
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
    .menu-wrapper
      flex: 0 0 80px
      background-color: #f3f5f7
      width: 80px
      font-size: 12px
      overflow: auto
      ul
        .menu-item
          height: 52px
          line-height: 14px
          width: 56px
          color: rgb(20, 20, 20)
          padding: 0 12px
          display: table
          border-1px(rgba(7, 17, 37, 0.1))
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

    .goods-wrapper
      flex: 1
      overflow: auto;
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
            margin: 18px
            border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
              /*border-bottom: none*/
              .food-img
                width: 60px
                height: 60px
                margin-right: 10px
                /*vertical-align: top*/
              .content
                height: 60px
                font-size: 10px
                color: rgb(147, 153, 159)
                .name
                  font-size: 14px
                  color: rgb(7, 17, 27)
                .description
                  margin-top: 8px
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

</style>
