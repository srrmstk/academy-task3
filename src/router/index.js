import Vue from 'vue'
import VueRouter from 'vue-router'
import Tasks from '../components/Tasks'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/list/:id',
    name: 'tasks',
    component: Tasks,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
