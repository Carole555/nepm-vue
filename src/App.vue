<template>
    <div class="layout">
        <el-container class="container">
            <el-container class="content">
                <router-view />
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import {localGet, pathMap} from "./utils/index.js";

const router = useRouter()
const state = reactive({
    currentPath: '/',
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        // 如果路径是 /login 则正常执行
        next()
    } else {
        // 如果不是 /login，判断是否有 token
        if (!localGet('token')) {
            // 如果没有，则跳至登录页面
            next({ path: '/login' })
        } else {
            // 否则继续执行
            next()
        }
    }
    state.currentPath = to.path
    document.title = pathMap[to.name]
})
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

.content {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
}

</style>

<style>
 body {
     height: 100%;
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
