import Vue from 'vue'
import Router from 'vue-router'
import Publish from '@/components/Publish.vue'
import CarPeople from '@/components/CarPeople.vue'
import PeopleCar from '@/components/PeopleCar.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
     {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
