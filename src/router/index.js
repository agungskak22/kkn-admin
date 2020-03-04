import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    name: 'dashboard',
    children: [
      {
        path: '/',
        name: 'DashboardMaps',
        component: () => import('../views/DashboardMaps.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('../views/User.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'Building',
        name: 'building',
        component: () => import('../views/Building.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/',
    name: 'HomeLogin',
    component: Home
  },
  {
    path: '/DashboardMaps',
    name: 'DashboardMaps',
    component: () => import('../views/DashboardMaps.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth) && !store.state.isLoggedIn) {
    next({ name: 'HomeLogin' })
    return
  }
  if ((to.name === 'login') && store.state.isLoggedIn) {
    next({ name: 'home' })
    return
  }
  next()
})

export default router
