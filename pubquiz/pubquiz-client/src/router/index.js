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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/new',
    name: 'new',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "new" */ '../views/New.vue')
  },
  {
    path: '/join',
    name: 'join',
    component: () => import(/* webpackChunkName: "join" */ '../views/Join.vue')
  },
  {
    path: '/game/:id/waitingroom',
    name: 'waitingRoom',
    component: () => import(/* webpackChunkName: "waitingroom" */ '../views/WaitingRoom.vue')
  },
  {
    path: '/game/:id/chaptertitle',
    name: 'chapterTitle',
    component: () => import(/* webpackChunkName: "chaptertitle" */ '../views/ChapterTitle.vue')
  },
  {
    path: '/game/:id/question',
    name: 'question',
    component: () => import(/* webpackChunkName: "question" */ '../views/Question.vue')
  },
  {
    path: '/game/:id/solution',
    name: 'solution',
    component: () => import(/* webpackChunkName: "solution" */ '../views/Solution.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
