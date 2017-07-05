<template>
  <div class="ratingSelect">
  	<ul class="ratingTabs">
  		<li class="allTab" :class="selectType===2?'active':''" @click="selectTab(2,$event)"><font class="tabName">{{ratingTabs.all}}</font><font class="tabNum">{{ratingArr.length}}</font></li>
  		<li class="positiveTab" :class="selectType===0?'active':''" @click="selectTab(0,$event)"><font class="tabName">{{ratingTabs.positive}}</font><font class="tabNum">{{positives.length}}</font></li>
  		<li class="negativeTab" :class="selectType===1?'active':''" @click="selectTab(1,$event)"><font class="tabName">{{ratingTabs.negative}}</font><font class="tabNum">{{negatives.length}}</font></li>
  	</ul>
  	<div class="check" :class="onlyContent?'active':''" @click="toggleCheck($event)">
  		<i class="icon-check_circle"></i>
  		<span class="tip_font">只看有内容的评价</span>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  export default {
    props: {
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      ratingArr: {
        type: Array,
        default() {
          return [];
        }
      },
      ratingTabs: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positives() {
        return this.ratingArr.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratingArr.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      selectTab(selectType, ev) {
        console.log(selectType);
        // if (!ev._constructed) return;
        this.$emit('ratingTypeSelect', selectType);
      },
      toggleCheck(ev) {
        // console.log(ev);
        // if (!ev._constructed) return;
        var onlyContent = this.onlyContent;
        // this.onlyContent = !onlyContent;
        this.$emit('contentToggle', !onlyContent);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
.ratingSelect
  border-1px(rgba(7,17,27,.1))
  .ratingTabs
    margin:0 18px
    border-1px(rgba(7,17,27,.1)) 
    li
      color: rgb(77,85,93)
      font-size: 12px
      line-height: 16px
      display:inline-block
      border-radius:2px
      padding: 8px 12px
      margin-right: 8px
      margin-bottom: 18px
      background-color: rgb(204,236,248)
      font-family:'微软雅黑'
      &:last-child
        margin-right: 0
      &.negativeTab
        background-color: rgb(233,235,236)
      &.active
        color: #fff
        background-color: rgb(0,160,220)
      .tabNum
        font-size: 8px
  .check
      color: rgb(147,153,159)
      font-size: 12px
      line-height: 24px
      padding:12px 18px
      &.active
        color: rgb(0,160,220)
      .icom-check_circle
        margin-right: 4px

</style>
