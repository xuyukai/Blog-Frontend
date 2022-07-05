import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import LoginHome from '@/pages/LoginHome'
import account from '@/pages/account'
import myBlog from "@/pages/myBlog"
import searchBlog from '@/pages/searchBlog'
import blog from '@/pages/blog'
import Newblog from "@/pages/Newblog";

import test from "../pages/test";
Vue.use(Router)

export default new Router({
  routes: [
    {
    path:'/t',
    name:'test',
    component:test
  },
    {
      path:'/blog/:blogId',
      name:'blog',
      component: blog
    },
    {
      path:'/myBlog',
      name: 'myBlog',
      component: myBlog
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/searchBlog/:searchTxt',
      name: 'searchBlog',
      component: searchBlog
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/index',
      name: 'LoginHome',
      component: LoginHome
    },
    {
      path: '/newblog',
      name: 'Newblog',
      component: Newblog
    }
  ]
})
