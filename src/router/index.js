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
        path: 'public',
        name: 'public',
        component: loadDashboardView('Public'),
        meta: { requiresAuth: true }
      },
      {
        path: 'public/new',
        name: 'newPublic',
        component: loadDashboardView('PublicForm'),
        meta: { requiresAuth: true }
      },
      {
        name: 'publicEdit',
        path: 'public/:public',
        meta: { requiresAuth: true },
        component: loadDashboardView('PublicForm')
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
        path: 'owner/house/:id/:house',
        name: 'houseEdit',
        component: loadDashboardView('Formhouse'),
        meta: { requiresAuth: true }
      },
      {
        path: 'house/:id',
        name: 'newHouse',
        component: loadDashboardView('Formhouse'),
        meta: { requiresAuth: true }
      },
      {
        path: 'land/:id/:land',
        name: 'landDetail',
        component: loadDashboardView('Landdetail'),
        meta: { requiresAuth: true }
      },
      {
        path: 'owner/land/:id/:land',
        name: 'landEdit',
        component: loadDashboardView('Formland'),
        meta: { requiresAuth: true }
      },
      {
        path: 'land/:id',
        name: 'newLand',
        component: loadDashboardView('Formland'),
        meta: { requiresAuth: true }
      },
      {
        path: 'livestock/:id/:land',
        name: 'livestockDetail',
        component: loadDashboardView('Livestockdetail'),
        meta: { requiresAuth: true }
      },
      {
        path: 'owner/livestock/:id/:land',
        name: 'livestockEdit',
        component: loadDashboardView('Formlivestock'),
        meta: { requiresAuth: true }
      },
      {
        path: 'livestock/:id',
        name: 'newLivestock',
        component: loadDashboardView('Formlivestock'),
        meta: { requiresAuth: true }
      },
      {
        path: 'logistic/:type',
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
