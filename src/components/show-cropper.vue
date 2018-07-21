<template>
  <div class="wrap">
    <div class="cropper">
      <Button type="success" @click="openCropper" size="small">上传图片</Button>
      <Modal
        v-model="showCropper"
        title="图片裁剪"
        width="700px"
        cancelText
        footer>
        <div slot="footer"></div>
        <Cropper
          v-bind:crop="crop"
          @finish="finish"
          @close="close"
        />
      </Modal>
    </div>
    <div class="carousel">
      <Carousel :carouselList="carouselList"></Carousel>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/carousel'
import Cropper from '@/components/cropper'
export default {
  name: 'Add',
  data () {
    return {
      showCropper: false,
      // 设置参数
      crop: {
        img: '',
        crop: true,
        width: 300,
        height: 225
      },
      carouselList: []
    }
  },

  methods: {

    // 图片裁剪
    finish (img) {
      let blog =  window.URL.createObjectURL(img) // 将blog对象转化为图片地址
      this.carouselList.push(blog)
      this.showCropper = false
      this.crop.img = ''
    },
    close () {
      this.showCropper = false
    },
    openCropper () {
      this.showCropper = true
    }
  },
  components: {
    Carousel,
    Cropper
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.wrap
  display flex
  justify-content center
  .cropper
    flex 1
    display flex
    align-items center
    justify-content center
  .carousel
    flex 3
    width 800px
    height 600px
    display flex
    align-items center
    justify-content center
</style>
