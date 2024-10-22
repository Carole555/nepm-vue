import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
    history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import(/* webpackChunkName: "index" */  '../views/Index.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
        },{
            path: '/public',
            name: 'public',
            component: () => import(/* webpackChunkName: "public" */ '../views/Public.vue')
        },
        {
            path: '/public_detail',
            name: 'public_detail',
            component: () => import(/* webpackChunkName: "public_detail" */ '../views/PublicDetail.vue')
        },
        {
            path: '/assign',
            name: 'assign',
            component: () => import(/* webpackChunkName: "assign" */ '../views/Assign.vue')
        },
        {
            path: '/aqi',
            name: 'aqi',
            component: () => import(/* webpackChunkName: "aqi" */ '../views/AQI.vue')
        },
        {
            path: '/aqi_detail',
            name: 'aqi_detail',
            component: () => import(/* webpackChunkName: "aqi_detail" */ '../views/AQIDetail.vue')
        },
        {
            path: '/province',
            name: 'province',
            component: () => import(/* webpackChunkName: "province" */ '../views/Province.vue')
        },
        {
            path: '/distribution',
            name: 'distribution',
            component: () => import(/* webpackChunkName: "distribution" */ '../views/Distribution.vue')
        },
        {
            path: '/other',
            name: 'other',
            component: () => import(/* webpackChunkName: "other" */ '../views/Other.vue')
        },
        {
            path: '/trend',
            name: 'trend',
            component: () => import(/* webpackChunkName: "trend" */ '../views/Trend.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import(/* webpackChunkName: "trend" */ '../views/Register.vue')
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import(/* webpackChunkName: "trend" */ '../views/Home.vue')
        },
        {
            path: '/select/:provinceId/:cityId/:address',
            name: 'Select',
            component: () => import(/* webpackChunkName: "trend" */ '../views/Select.vue')
        },
        {
            path: '/feedbackInfo',
            name: 'FeedbackInfo',
            component: () => import(/* webpackChunkName: "trend" */ '../views/FeedbackInfo.vue')
        },
        {
            path: '/feedbackTask',
            name: 'FeedbackTask',
            component: () => import(/* webpackChunkName: "trend" */ '../views/FeedbackTask.vue')
        },
        {
            path: '/detailedInfo',
            name: 'DetailedInfo',
            component: () => import(/* webpackChunkName: "trend" */ '../views/DetailedInfo.vue')
        },


    ]
})

export default router
