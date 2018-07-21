<template>
  <div class="carousel-wrap" id="carousel">
    <!-- 轮播图列表 -->
    <transition-group tag="ul" class='slide-ul' name="list">
      <li
        v-for="(list,index) in carouselList"
        :key="index"
        v-show="index===currentIndex"
        @mouseenter="stop"
        @mouseleave="go"
      >
        <img :src="list">
      </li>
    </transition-group>
    <!-- 轮播图位置指示 -->
    <div class="carousel-items">
      <span
        v-for="(item,index) in carouselList.length"
        :key="index"
        :class="{'active':index===currentIndex}"
        @mouseover="change(index)"
      >
        @mouseover="change(index)"
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      currentIndex: 0,
      timer: ''
    }
  },
  props: ['carouselList'],
  methods: {
    go () {
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 4000)
    },
    stop () {
      clearInterval(this.timer)
      this.timer = null
    },
    change (index) {
      this.currentIndex = index
    },
    autoPlay () {
      this.currentIndex++
      if (this.currentIndex > this.carouselList.length - 1) {
        this.currentIndex = 0
      }
    }
  },
  created () {
    // 在DOM加载完成后，下个tick中开始轮播
    this.$nextTick(() => {
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 4000)
    })
  }
}
</script>

<style lang="stylus">
.carousel-wrap
  position: relative
  height: 450px
  width: 600px
  overflow: hidden
  background-color: #fff
  .slide-ul
    width: 100%
    height: 100%
    li
      position: absolute
      width: 100%
      height: 100%
      img
        width: 100%
        height: 100%
  .carousel-items
    position: absolute
    z-index: 10
    bottom: 2rem
    width: 100%
    margin: 0 auto
    text-align: center
    font-size: 0
    span
      display: inline-block
      height: .3rem
      width: 1.5rem
      margin: 0 .15rem
      background-color: #b2b2b2
      cursor: pointer
    .active
      background-color: #fff
.list-enter-to
  transition: all 1s ease
  transform: translateX(0)
.list-leave-active
  transition: all 1s ease;
  transform: translateX(-100%)
.list-enter
  transform: translateX(100%)
.list-leave
  transform: translateX(0)
</style>
