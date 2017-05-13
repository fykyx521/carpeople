import Vue from 'vue'
import Router from 'vue-router'
import Publish from '@/components/Publish.vue'
// import CarPeople from '@/components/CarPeople.vue'
// import PeopleCar from '@/components/PeopleCar.vue'

import Search from '@/components/Search.vue'
import SearchView from '@/components/SearchView.vue'
import Free from '@/components/Free.vue'

// import Login from '@/components/Login.vue'
// import Register from '@/components/Register.vue'
// import My from '@/components/My.vue'  
// import Hello from '@/components/Hello.vue'

Vue.use(Router)

let routemap={
  'linkActiveClass':'weui-bar__item_on',
  routes: [
    {
       path:'/',
       name:'search',
       component:Search
    },
    {
      path:'/searchview',
      name:'searchview',
      component:SearchView
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    },
    {
       path:'/free',
       name:'free',
       component:Free
    }
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    // {
    //   path: '/carpeople',
    //   name: 'carpeople',
    //   component: CarPeople
    // },
    //  {
    //   path: '/peoplecar',
    //   name: 'peoplecar',
    //   component: PeopleCar
    // },
    //  {
    //   path: '/register',
    //   name: 'register',
    //   component: Register
    // },
    //  {
    //   path: '/my',
    //   name: 'my',
    //   component: My
    // }
  ]
};
let router=new Router(routemap);
// router.beforeEach(function (to,from,next) {
//    if(to.path=='/login')
//    {
//       next();
//       return;
//    }

//    if (!Bmob.User.current()&&to.path=='/publish') {
//       next({
//         path: '/login'
//       })
//     } else {
//       next()
//     }   
// })


export default router;
