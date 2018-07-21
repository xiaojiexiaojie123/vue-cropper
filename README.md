## vue-cropper
### 一个在线图片裁剪预览和实时轮播的功能

#### 适用于头像上传、制作轮播图
 
 ### vue-cropper 相关文章参考。
 #### [一个优雅的图片裁剪插件](https://github.com/xyxiao001/vue-cropper)   作者： xyxiao001
 #### [Vue 过渡实现轮播图](https://segmentfault.com/a/1190000008828755)  作者： koucxz
 
## 使用方法
##### install dependencies
npm install

##### serve with hot reload at localhost:8080
npm run dev


## 裁剪框，根据需要，可以在里面设置需要的属性
``` html
<vueCropper
  ref="cropper"
  :img="option.img"
  :outputSize="option.size"
  :outputType="option.outputType"
></vueCropper>
```

## 属性列表
<table style="text-align: center">
  <thead>
    <tr>
        <td>名称</td>
        <td>功能</td>
        <td>默认值</td>
        <td>可选值</td>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>img</td>
        <td>裁剪图片的地址</td>
        <td>空</td>
        <td>url 地址 || base64 || blob</td>
    </tr>
    <tr>
        <td>outputSize</td>
        <td>裁剪生成图片的质量</td>
        <td>1</td>
        <td>0.1 - 1</td>
    </tr>
    <tr>
        <td>outputType</td>
        <td>裁剪生成图片的格式</td>
        <td>jpg (jpg 需要传入jpeg)</td>
        <td>jpeg || png || webp</td>
    </tr>
    <tr>
        <td>info</td>
        <td>裁剪框的大小信息</td>
        <td>true</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>canScale</td>
        <td>图片是否允许滚轮缩放</td>
        <td>true</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>autoCrop</td>
        <td>是否默认生成截图框</td>
        <td>false</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>autoCropWidth</td>
        <td>默认生成截图框宽度</td>
        <td>容器的80%</td>
        <td>0~max</td>
    </tr>
    <tr>
        <td>autoCropHeight</td>
        <td>默认生成截图框高度</td>
        <td>容器的80%</td>
        <td>0~max</td>
    </tr>
    <tr>
        <td>fixed</td>
        <td>是否开启截图框宽高固定比例</td>
        <td>true</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>fixedNumber</td>
        <td>截图框的宽高比例</td>
        <td>[1 : 1]</td>
        <td>[宽度 : 高度]</td>
    </tr>
    <tr>
        <td>full</td>
        <td>是否输出原图比例的截图</td>
        <td>false</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>fixedBox</td>
        <td>固定截图框大小 不允许改变</td>
        <td>false</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>canMove</td>
        <td>上传图片是否可以移动</td>
        <td>true</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>canMoveBox</td>
        <td>截图框能否拖动</td>
        <td>true</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>original</td>
        <td>上传图片按照原始比例渲染</td>
        <td>false</td>
        <td>true | false</td>
    </tr>
  </tbody>
</table>

## 通过添加预览函数，可以实时看到裁剪情况
``` html
@realTime="realTime"
// Real time preview function
realTime (data) {
  this.previews = data
}
<div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
    'margin': '5px'}">
  <div :style="previews.div">
    <img :src="option.img" :style="previews.img">
  </div>
</div>
```

## 内置方法  通过this.$refs.cropper 调用
##### this.$refs.cropper.startCrop()  开始截图
##### this.$refs.cropper.stopCrop()  停止截图
##### this.$refs.cropper.clearCrop()  清除截图
##### this.$refs.cropper.changeScale()  修改图片大小 正数为变大 负数变小
#####  获取截图信息
this.$refs.cropper.cropW  截图框宽度

this.$refs.cropper.cropH 截图框高度
``` js
// 获取截图的base64 数据
this.$refs.cropper.getCropData((data) => {
  // do something
  console.log(data)  
})

// 获取截图的blob数据
this.$refs.cropper.getCropBlob((data) => {
  // do something
  console.log(data)  
})
```

