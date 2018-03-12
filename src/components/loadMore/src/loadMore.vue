<template>
  <div class="fly-loadmore">
    <div class="fly-loadmore-content" ref="loadMore" :class="{ 'fly-is-dropped-bottom': bottomDropped}" :style="{'transform': transform}">
      <div class="fly-loadmore-slot-box">
        <slot></slot>
      </div>
      <div class="fly-loadmore-bottom">
        <span class="fly-loadmore-tip-font" :class="{'fly-loadmore-rotate': bottomStatus === 'drop'}" v-show="bottomStatus !== 'loading'">↑</span>
        <span v-show="bottomStatus === 'loading'">{{bottomText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fly-loadmore',
  props: {
    // 上拉缓冲感参数
    distanceIndex: {
      type: Number,
      default: 2
    },
    bottomPullText: {
      type: String,
      default: '上拉刷新'
    },
    bottomDropText: {
      type: String,
      default: '释放更新'
    },
    bottomLoadingText: {
      type: String,
      default: '加载中...'
    },
    // 初始上拉状态改变高度
    bottomDistance: {
      type: Number,
      default: 70
    },
    // 是否已经全部加载，加载完毕移除事件
    bottomLoadAll: {
      type: Boolean,
      default: false
    },
    bottomFetchMethod: {
      type: Function
    }
  },
  data() {
    return {
      bottomText: '释放刷新',
      scrollEventTarget: null,  // scroll事件目标元素(通常为父元素)
      startY: 0,  // touchstart时事件clientY的值
      currentY: 0,  //  当前事件clientY的值
      startScrollTop: 0,
      bottomReached: false,  // 是否到达底部
      bottomDropped: false,  // 到达底部后是否正在上拉
      direction: '',  // 手指滑动方向down(下拉)、up(上滑)
      translateY: 0,
      bottomStatus: '',  // 到达底部后的三种状态：pull(上拉)、drop(释放)、loading(加载)
      isTouchEnd: false
    }
  },
  watch: {
    bottomStatus(newVal) {
      // this.$emit('bottom-status-change', val);
      switch (newVal) {
        case 'pull':
          this.bottomText = this.bottomPullText;
          break;
        case 'drop':
          this.bottomText = this.bottomDropText;
          break;
        case 'loading':
          this.bottomText = this.bottomLoadingText;
          break;
      }
    },
    bottomLoadAll(newVal) {
      if (newVal) {
        this.removeTouchEvents()
      } else {
        this.bindTouchEvents()
      }
    }
  },
  computed: {
    transform() {
      return this.translateY === 0 ? null : 'translate3d(0, '+ this.translateY +'px, 0)'
    }
  },
  methods: {
    onBottomLoaded() {
      this.bottomStatus = 'pull'
      this.bottomDropped = false
      this.$nextTick(() => {
        this.scrollEventTarget.scrollTop += 50
        this.translateY = 0
      })
    },
    checkBottomReached() {
      return parseInt(this.$el.getBoundingClientRect().bottom) <= parseInt(this.scrollEventTarget.getBoundingClientRect().bottom) + 1;
    },
    handleLoadMoreTouchStart(e) {
      this.startY = e.touches[0].clientY
      this.startScrollTop = this.scrollEventTarget.scrollTop
      if (this.bottomStatus !== 'loading') {
        this.bottomStatus = 'pull'
        this.bottomDropped = false
      }
    },
    handleLoadMoreTouchMove(e) {
      if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
        return
      }
      this.currentY = e.touches[0].clientY
      let moveDistance = (this.currentY - this.startY) / this.distanceIndex
      this.direction = moveDistance > 0 ? 'down' : 'up';

      if (this.direction === 'up') {
        this.bottomReached = this.bottomReached || this.checkBottomReached();
      }
      if (this.bottomReached && this.direction === 'up' && typeof this.bottomFetchMethod === 'function' && this.bottomStatus !== 'loading' && !this.bottomLoadAll) {
        e.preventDefault();
        e.stopPropagation();
        this.translateY = this.scrollEventTarget.scrollTop - this.startScrollTop + moveDistance
      }
      if (this.translateY > 0) {
        this.translateY = 0
      }
      this.bottomStatus = -this.translateY >= this.bottomDistance ? 'drop' : 'pull';

    },
    handleLoadMoreTouchEnd(e) {
      this.isTouchEnd = true
      if (this.direction === 'up' && this.bottomReached && this.translateY < 0) {
        this.bottomDropped = true
        this.bottomReached = false
        if (this.bottomStatus === 'drop') {
          this.translateY = '-50'
          this.bottomStatus = 'loading'
          this.bottomFetchMethod()
        } else {
          this.translateY = '0'
          this.bottomStatus = 'pull'
        }
      }
      this.direction = ''
    },
    bindTouchEvents() {
      this.$el.addEventListener('touchstart', this.handleLoadMoreTouchStart)
      this.$el.addEventListener('touchmove', this.handleLoadMoreTouchMove)
      this.$el.addEventListener('touchend', this.handleLoadMoreTouchEnd)
    },
    removeTouchEvents() {
      this.$el.removeEventListener('touchstart', this.handleLoadMoreTouchStart)
      this.$el.removeEventListener('touchmove', this.handleLoadMoreTouchMove)
      this.$el.removeEventListener('touchend', this.handleLoadMoreTouchEnd)
    }
  },
  mounted() {
    this.scrollEventTarget = this.$el.parentNode
    if (typeof this.bottomFetchMethod === 'function') {
      this.bindTouchEvents()
    }
  }
};
</script>

<style>
.fly-loadmore {
  width: 100%;
  overflow: hidden;
}
.fly-loadmore-content.fly-is-dropped-bottom {
  -webkit-transition: .2s;
  transition: .2s;
}
.fly-loadmore-slot-box::before,
.fly-loadmore-slot-box::after {
  content: ' ';
  visibility: hidden;
  height: 0;
  display: table;
}
.fly-loadmore-slot-box::after {
  clear: both;
}
.fly-loadmore-bottom {
  height: 50px;
  margin-bottom: -50px;
  text-align: center;
  line-height: 50px;
}
.fly-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: .2s linear;
  transition: .2s linear;
  vertical-align: middle;
}
.fly-loadmore-bottom span.fly-loadmore-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.fly-loadmore-tip-font {
  font-weight: 500
}
</style>
