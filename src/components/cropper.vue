<template>
  <div class="wrapper">
      <div class="cropper-content">
        <div class="cropper">
          <VueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :info="option.info"
            :canScale="option.canScale"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
            @imgLoad="imgLoad" />
        </div>
        <div class="show-preview"
             :style="{'width': previews.w + 'px', 'height': previews.h + 'px', 'margin': '5px'}">
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </div>

      <div class="footer-btn">
          <Button type="primary" style="margin-right:10px">
            <label class="upload-img" for="uploads">上传图片</label>
            <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                 accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)" >
          </Button>

          <ButtonGroup size="large">
            <Button type="ghost" @click="changeScale(1)" icon="plus-round">放大</Button>
            <Button type="ghost" @click="changeScale(-1)" icon="minus-round">缩小</Button>
            <Button type="ghost" @click="rotateLeft" style="width:76px">↺</Button>
            <Button type="ghost" @click="rotateRight" style="width:76px">↻</Button>
          </ButtonGroup>

          <Button type="default" :loading="finishLoading" @click="handleClose" style="margin-left:10px">取消</Button>
          <Button type="primary" :loading="finishLoading" @click="finish('blob')" style="margin-left:10px">保存</Button>
      </div>

  </div>
</template>

<script type="text/ecmascript-6">
import VueCropper from 'vue-cropper'
export default {
  name: 'imageCrop',
  components: {
    VueCropper
  },
  props: {
    crop: {
      img: {
        type: String,
        default: ''
      },
      crop: { // 是否默认生成截图框
        type: Boolean,
        default: true
      },
      width: { // 默认生成截图框宽度
        type: Number,
        default: 200
      },
      height: { // 默认生成截图框高度
        type: Number,
        default: 200
      }
    }
  },
  data () {
    return {
      crap: false,
      previews: {},
      option: {
        img: this.crop.img,
        outputSize: 1, // 裁剪生成图片的质量 0.1 - 1
        outputType: 'jpeg', // 裁剪生成图片的格式 jpeg || png || webp
        info: true, // 裁剪框的大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: this.crop.crop, // 是否默认生成截图框
        autoCropWidth: this.crop.width, // 默认生成截图框宽度
        autoCropHeight: this.crop.height, // 默认生成截图框高度
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        fixedBox: true, // 是否开启截图框宽高固定比例
        canMove: true, // 上传图片是否可以移动
        original: false, // 上传图片按照原始比例渲染
        canMoveBox: true // 截图框能否拖动
      },
      downImg: '#',
      finishLoading: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    // 上传图片
    uploadImg (e) {
      let file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$message.error('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      let reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    // 实时预览函数
    realTime (data) {
      this.previews = data
    },
    finish (type) {
      this.finishLoading = true
      if (!this.option.img) {
        this.$Message.warning('您还没有上传图片')
      } else {
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            this.handleClose()
            this.$emit('finish', data)
            console.log(data)
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.handleClose()
            this.$emit('close', data)
          })
        }
      }
      this.finishLoading = false
    },
    imgLoad (msg) {
      console.log(msg)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.wrapper
  background-color: #fff
  .cropper-content
    width 700px
    display flex
    justify-content center
  .cropper
    width 350px
    height 300px

  .show-preview
    flex 1
    display flex
    justify-content center

  .preview
    overflow hidden
    border 1px solid #cccccc
    background #000

  .footer-btn
    margin-top: 30px
    display: flex
    display: flex
    justify-content: center

  .scope-btn
    width: 350px
    display: flex
    justify-content: space-between

  .upload-btn
    flex: 1
    -webkit-flex: 1
    display: flex
    justify-content: center

  .btn
    outline: none
    display: inline-block
    line-height: 1
    white-space: nowrap
    cursor: pointer
    -webkit-appearance: none
    text-align: center
    -webkit-box-sizing: border-box
    box-sizing: border-box
    outline: 0
    margin: 0
    -webkit-transition: .1s
    transition: .1s
    font-weight: 500
    padding: 8px 15px
    font-size: 12px
    border-radius: 3px
    color: #fff
    background-color: #67c23a
    border-color: #67c23a
</style>
