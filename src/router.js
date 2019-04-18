import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from '@/views/Register'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path:'/shoppingcar',
            name:'shoppingcar',
           component: () => import(/* webpackChunkName: "about" */ './views/ShoppingCar.vue')
        },
        {
            path:'/ceshi',
            name:'ceshi',
            component: () => import(/* webpackChunkName: "about" */ './views/Ceshi.vue')
        },
        // {
        //     path: '/buyCar',
        //     name: 'buyCar',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: ShoppingCar
        // }
    ]
})
