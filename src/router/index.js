import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `../views/${view}.vue`)
}

function loadDashboardView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `../views/dashboard/${view}.vue`)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    component: loadView('Dashboard'),
    children: [
      {
        path: '/',
        name: 'home',
        component: loadDashboardView('Main'),
        meta: { requiresAuth: true }
      },
      {
        path: 'owner/:id',
        name: 'ownerDetail',
        component: loadDashboardView('Detail'),
        meta: { requiresAuth: true }
      },
      {
        path: 'user',
        name: 'user',
        component: loadDashboardView('User'),
        meta: { requiresAuth: true }
      },
      {
        path: 'map',
        name: 'map',
        component: loadDashboardView('Maps'),
        meta: { requiresAuth: true }
      },
      {
        path: 'house/:id/:house',
        name: 'houseDetail',
        component: loadDashboardView('Housedetail'),
        meta: { requiresAuth: true }
      },
      {
        path: 'house',
        name: 'newHouse',
        component: loadDashboardView('Formhouse'),
        meta: { requiresAuth: true }
      },
      {
        path: 'logistic',
        name: 'logistic',
        component: loadDashboardView('Logistic'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component: loadView('Login')
  },
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
