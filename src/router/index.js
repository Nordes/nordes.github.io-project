import Vue from 'vue'
import Router from 'vue-router'
import Projects from '@/components/Projects'
import ReachMe from '@/components/ReachMe'
import Resume from '@/components/Resume'
import Tech from '@/components/Tech'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/Projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/ReachMe',
      name: 'ReachMe',
      component: ReachMe
    },
    {
      path: '/Tech',
      name: 'Tech',
      component: Tech
    },
    {
      path: '/Resume',
      name: 'Resume',
      component: Resume
    }
  ]
})
