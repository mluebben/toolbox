import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Hashes from '../views/Hashes'
import HashStrings from '../views/HashStrings'
import HashFiles from '../views/HashFiles'
import Base64 from '../views/Base64'
import About from '../views/About'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/hashes',
    name: 'hashes',
    component: Hashes
  },
  {
    path: '/hashstrings',
    name: 'hashstrings',
    component: HashStrings
  },
  {
    path: '/hashfiles',
    name: 'hashfiles',
    component: HashFiles
  },
  {
    path: '/base64',
    name: 'base64',
    component: Base64
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
