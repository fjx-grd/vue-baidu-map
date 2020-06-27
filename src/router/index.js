import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/v2',
    name: 'v2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/V2.vue')
  },
  {
    path: '/v3',
    name: 'v3',
    component: () => import(/* webpackChunkName: "about" */ '../views/V3.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
