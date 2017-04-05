import Vue from 'vue'
import Router from 'vue-router'
import Publish from '@/components/Publish'
import CarPeople from '@/components/CarPeople.vue'
import PeopleCar from '@/components/PeopleCar.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CarPeople',
      component: CarPeople
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
