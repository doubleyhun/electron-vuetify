import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main-page',
            component: require('@/pages/main/main').default
        },
        {
            path: '/menu/menulist',
            name: 'menu-menulist',
            component: require('@/pages/menu/menulist').default
        },
        {
            path: '/restaurant/restaurantlist',
            name: 'restaurant-restaurantlist',
            component: require('@/pages/restaurant/restaurantlist').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
