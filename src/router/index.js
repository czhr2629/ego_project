import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../pages/Layout'
import Content from "../pages/content"
import Params from "../pages/params"
import Product from "../pages/product"
import Login from "../pages/Login"
import store from "../store"



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect:{// 重定向到
      name:"Product"
    },   
    component: Layout,
    children:[
      {
        path: 'product',
        name: 'Product',
        component: Product,
        meta:{
          isLogin:true
        }
      },
      {
        path: 'params',
        name: 'Params',
        component: Params,
        meta:{
          isLogin:true
        }
      },
      {
        path: 'content',
        name: 'Content',
        component: Content,
        meta:{
          isLogin:true
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass:"active",//高亮改名active
  base: process.env.BASE_URL,
  routes
})

 router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){//判断是否需要登录

    var token = store.state.LoginModule.token
    if(token){//if登录过了  就继续
      next()
    }else{
      next({
        path:'/login'
      })
    }
  }else{
    next()
  }
}) 


export default router
