<template>
    <el-container>
            <el-aside class="aside" v-if="showMenu">
                <div class="head">
                    <div>
                        <img src="../assets/blue2.png" alt="logo">
                        <span>东软环保</span>
                    </div>
                </div>
                <div class="line" />
                <el-menu
                        background-color="#222832"
                        text-color="#fff"
                        :router="true"
                        :default-openeds="defaultOpen"
                        :default-active='currentPath'
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
            <el-main class="main">
                <slot></slot>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import Header from './Header.vue';
import {DataAnalysis, DataLine, List, Menu, More, User} from "@element-plus/icons-vue";

const router = useRouter();
const showMenu = ref(true);
const currentPath = ref('/');
const defaultOpen = ref(['1', '2', '3', '4']);


</script>

<style scoped>
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
