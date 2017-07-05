<template>
  <div class="ratings">
  	<div class="ratings-top">
  	  <span class="score-part">
  	  	<span class="score">
  	  	  <font>{{seller.score}}</font>
  	  	  <label for="" class="score-title">综合评分</label>
  	  	</span>
  	  	<span class="compare">
  	  	  高于周边商家{{seller.rankRate}}%	
  	  	</span>
  	  </span><!--
   --><span class="stars-part">
  	    <span class="row">
  	  	  <label for="" class="score-title">服务态度</label><!--
  	   --><star :score="seller.serviceScore" :size="36"></star><!--
  	   --><font class="score">{{seller.serviceScore}}</font>
  	    </span>
  	    <span class="row"> 
  	  	  <label for="" class="score-title">商品评分</label><!--
  	   --><star :score="seller.foodScore" :size="36"></star><!--
  	   --><font class="score">{{seller.foodScore}}</font>
  	  	</span>
  	  	<span class="row"> 
  	  	  <label for="" class="score-title">送达时间</label><!--
  	   --><font class="min">{{seller.deliveryTime}}分钟</font>
  	  	</span>
  	  </span>
  	</div>
  	<div class="ratings-bottom">
  	  <ratingSelect @ratingTypeSelect="ratingTypeSelect" @contentToggle="contentToggle" :selectType="rateType"
          :onlyContent="onlyContent" :ratingArr="ratings"></ratingSelect>
  	  <div class="ratingList-wrapper" ref="ratingsScroll">
	  	  	<ul class="ratingsUl" v-show="ratings && ratings.length">
	            <li  v-for="rating in ratings" v-show="needShow(rating)">
	              <span class="avatar">
	               	 <img :src="rating.avatar
	                    " alt="rating.username">
	              </span>
	              <span class="right-part">
	               	<span class="right-row">
	                  <span class="username">{{rating.username}}</span>
	               	  <span class="rateTime">{{rating.rateTime | formatDate}}</span>
	               	</span>
	               	<span class="right-row star-row" >
	               	  <star :score="rating.score" :size="24"></star>
	               	  <span class="min" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
	               	</span>
	               	<span class="right-row text-row">
	               	  {{rating.text}}
	               	</span>
	                <span class="right-row recommend-row">
	               	  <i class="icon-thumb_down"  v-show="rating.rateType===1"></i>
                      <i class="icon-thumb_up" v-show="rating.rateType===0"></i>
                      <span class="recommend" v-for="re in rating.recommend">{{re}}</span>
	               	</span>
	              </span>
	            </li>
	        </ul>
	        <div class="no-rating" v-show="!ratings || !ratings.length">
	          暂无评价
	        </div>
	 </div>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {formatDate} from 'common/js/utils';
  import star from 'components/star/star.vue';
  import ratingSelect from 'components/ratingSelect/ratingSelect.vue';

  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        ratings: [],
        onlyContent: false,
        rateType: 2
      };
    },
    methods: {
      _initRatingsScroll() {
        if (!this.ratingsScroll) {
          this.ratingsScroll = new BScroll(this.$refs.ratingsScroll, {click: true});
        } else {
          this.ratingsScroll.refrensh();
        }
      },
      needShow(rating) {
        if (this.onlyContent && !rating.text) {
          return false;
        };
        if (this.rateType === 2) {
          console.log('true');
          return true;
        } else {
          return this.rateType === rating.rateType;
        }
      },
      ratingTypeSelect(type) {
        console.log(type);
        this.rateType = type;
        this.$nextTick(() => {
          if (!this.ratingsScroll) {
            this.ratingsScroll = new BScroll(this.$refs.ratingsScroll, {click: true});
          } else {
            this.ratingsScroll.refresh();
          }
        });
      },
      contentToggle(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          if (!this.ratingsScroll) {
            this.ratingsScroll = new BScroll(this.$refs.ratingsScroll, {click: true});
          } else {
            this.ratingsScroll.refresh();
          }
        });
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        // get body data
        response = response.body;
        if (response.errno === ERR_OK) {
          console.log(response);
          this.ratings = response.data;
          this.$nextTick(() => {
            this._initRatingsScroll();
          });
        }
      });
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd HH:mm');
      }
    },
    components: {
      'star': star,
      'ratingSelect': ratingSelect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
  .ratings
    background-color: #f3f5f7
    .ratings-top
      border-1px(rgba(7, 17, 27, 0.1))
      background-color:#fff
      padding:18px 0
      margin-bottom: 16px
      .score-part
        display:inline-block;
        width: 36.7%
        text-align: center
        border-right: 1px solid rgba(7,17,27,.1)
        font
          color: rgb(255,153,0)
          line-height: 28px
          font-size: 24px
        .score-title
          width:100%
          display:inline-block
          margin:6px 0 8px 0
          color: rgb(7,17,27)
          font-size:12px
          line-height:12px
        .compare
          font-size: 10px
          color: rgba(7,17,27,0.5)
          line-height: 10px;
          margin-bottom: 6px
      .stars-part
        display:inline-block
        width: calc(63.3% - 49px)
        float:right
        padding:0 24px
        @media only screen and (max-width: 320px)
          padding:0 6px
          width: calc(63.3% - 13px)
        .row
          display:block
          margin-bottom: 8px
          .score-title
            font-size: 12px
            line-height:18px
            color: rgb(7,17,27)
            vertical-align: top
            margin-right:6px
	      .score
	        color: rgb(255,153,0)
	        font-size: 12px
	        line-height:18px
	        vertical-align: top
	        margin-left:6px
	      .min
	        font-size:12px
	        color: rgb(147,153,159)
	        line-height:18px
          &:last-child
            margin-bottom:0
    .ratings-bottom
      background-color: #fff
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      padding: 18px 0
      .ratingList-wrapper
        position: fixed
        top: 416px
        bottom: 0
        width: 100%
        overflow: hidden
        ul.ratingsUl
          li
            padding:18px 0
            margin:0 18px
            border-1px(rgba(7,17,27,.1))
            .avatar
              float:left
              img
                width: 28px
                height: 28px
                border-radius:50%
            .right-part
              display:block
              margin-left:40px
              .right-row
                display:block
                width:100%
                line-height:12px
                font-size:12px
                color: rgb(7,17,27)
                margin-bottom: 4px
                .username
                  font-size:10px
                  line-height:12px
                  color: rgb(7,17,27)
                  vertical-align: top
                .rateTime
                  font-size:10px
                  font-weight:200
                  color: rgb(147,153,159)
                  line-height:12px
                  float:right
                  vertical-align: top
                &.text-row
                  line-height: 18px
                .min
                  line-height:12px
                  font-size:10px
                  color: rgb(147,153,159)
                  font-weight:200
                i
                  font-size: 12px
                  line-height: 16px
                  color: rgb(147,153,159)
                  margin-right: 8px
                  &.icon-thumb_up
                   color: rgb(0,160,220)
                &.recommend-row
                  margin-top: 8px
                  margin-bottom: 0
                .recommend
                  padding:0 6px
                  border:1px solid rgba(7,17,27,0.1)
                  border-radius:2px
                  background-color: rgb(255,255,255)
                  line-height:16px
                  font-size:9px
                  display:inline-block
                  margin:0 8px 4px 0
</style>
