import Vue from 'vue'
import Router from 'vue-router'
import Projects from '@/components/Projects'
import ReachMe from '@/components/ReachMe'
import Resume from '@/components/Resume'
import Tech from '@/components/Tech'
import article from '@/components/articles/article'
import articles from '@/components/articles/articles'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
    },
    {
      path: '/articles/:id',
      name: 'Article',
      component: article
    },
    {
      path: '/articles',
      name: 'Articles',
      component: articles
    }
  ]
})
