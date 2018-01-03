import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ReachMe from '@/components/ReachMe'
import Resume from '@/components/Resume'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ReachMe',
      name: 'ReachMe',
      component: ReachMe
    },
    {
      path: '/Resume',
      name: 'Resume',
      component: Resume
    }
  ]
})
