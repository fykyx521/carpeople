import Vue from 'vue'
import Router from 'vue-router'
import Publish from '@/components/Publish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Publish',
      component: Publish
    }
  ]
})
