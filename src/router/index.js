import Vue from 'vue'
import Router from 'vue-router'
import ShowCropper from '@/components/show-cropper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ShowCropper
    }
  ],
  mode: 'history'
})
