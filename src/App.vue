<template>
    <div class="layout">
        <el-container v-if="state.showMenu" class="container">
            <el-aside class="aside">
                <div class="head">
                    <div>
                        <img src="./assets/blue2.png" alt="logo">
                        <span>东软环保</span>
                    </div>
                </div>
                <div class="line" />
                <el-menu
                    background-color="#222832"
                    text-color="#fff"
                    :router="true"
                    :default-openeds="state.defaultOpen"
                    :default-active='state.currentPath'
                >
                    <el-sub-menu index="1">
                        <template #title>
                            <span>公众监督数据管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/public"><el-icon><User /></el-icon>公众监督数据列表</el-menu-item>
                            <el-menu-item index="/aqi"><el-icon><List /></el-icon>确认AQI数据列表</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <span>统计数据管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/province"><el-icon><Menu /></el-icon>省分组检查统计</el-menu-item>
                            <el-menu-item index="/distribution"><el-icon><DataAnalysis /></el-icon>AQI指数分布统计</el-menu-item>
                            <el-menu-item index="/trend"><el-icon><DataLine /></el-icon>AQI指数趋势统计</el-menu-item>
                            <el-menu-item index="/other"><el-icon><More /></el-icon>其他数据统计</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-container class="content">
                <Header />
                <div class="main">
                    <router-view />
                </div>
            </el-container>
        </el-container>
        <el-container v-else class="container">
            <router-view />
        </el-container>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import { localGet, pathMap } from './utils'
import {DataAnalysis, DataLine, List, Menu, More, User} from "@element-plus/icons-vue";

const noMenu = ['/login']
const router = useRouter()
const state = reactive({
    showMenu: true,
    defaultOpen: ['1', '2', '3', '4'],
    currentPath: '/',
})

router.afterEach((to, from) => {
    state.showMenu = !noMenu.includes(to.path)
})

// router.beforeEach((to, from, next) => {
//     if (to.path == '/login') {
//         // 如果路径是 /login 则正常执行
//         next()
//     } else {
//         // 如果不是 /login，判断是否有 token
//         if (!localGet('token')) {
//             // 如果没有，则跳至登录页面
//             next({ path: '/login' })
//         } else {
//             // 否则继续执行
//             next()
//         }
//     }
//     state.currentPath = to.path
//     document.title = pathMap[to.name]
// })
</script>

<style scoped>
.layout {
    min-height: 100vh;
    background-color: #ffffff;
}
.container {
    height: 100vh;
}
.aside {
    width: 210px!important;
    background-color: #222832;
}
.head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
}
.head > div {
    display: flex;
    align-items: center;
}

.head img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
}
.head span {
    font-size: 20px;
    color: #ffffff;
}
.line {
    border-top: 1px solid hsla(0,0%,100%,.05);
    border-bottom: 1px solid rgba(0,0,0,.2);
}
.content {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
}
.main {
    height: calc(100vh - 100px);
    overflow: auto;
    padding: 10px;
}
</style>

<style>
 body {
     padding: 0;
     margin: 0;
     box-sizing: border-box;
 }
.el-menu {
    border-right: none!important;
}
.el-submenu {
    border-top: 1px solid hsla(0, 0%, 100%, .05);
    border-bottom: 1px solid rgba(0, 0, 0, .2);
}
.el-submenu:first-child {
    border-top: none;
}
.el-submenu [class^="el-icon-"] {
    vertical-align: -1px!important;
}
a {
    color: #409eff;
    text-decoration: none;
}
.el-pagination {
    text-align: center;
    margin-top: 20px;
}
.el-popper__arrow {
    display: none;
}
</style>
