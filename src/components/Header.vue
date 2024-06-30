<template>
    <div class="header">
        <div class="left">
            <el-icon class="back" v-if="state.hasBack" @click="back"><Back /></el-icon>
            <span style="font-size: 20px">{{ state.name }}</span>
        </div>
        <div class="right">
            <el-popover
                    placement="bottom"
                    :width="320"
                    trigger="click"
                    popper-class="popper-user-box"
            >
                <template #reference>
                    <div class="author">
                        <el-icon><user-filled /></el-icon>
                        {{ state.userInfo && state.userInfo.user && state.userInfo.user.managerCode || '' }}
                        <el-icon><arrow-down /></el-icon>
                    </div>
                </template>
                <div class="nickname">
                    <p>ID：{{ state.userInfo && state.userInfo.user && state.userInfo.user.id || '' }}</p>
                    <p>登录名：{{ state.userInfo && state.userInfo.user && state.userInfo.user.managerCode || '' }}</p>
                    <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {localGet, localRemove, pathMap} from '../utils'
import {ArrowDown, UserFilled} from "@element-plus/icons-vue";

const router = useRouter()
const state = reactive({
    name: '',
    userInfo: null, // 用户信息变量
    hasBack: false, // 是否展示返回icon
})
// 初始化执行方法
onMounted(() => {
    const routeName = router.currentRoute.value.name;  // 获取当前路由名
    state.name = pathMap[routeName] || '首页';  // 设置初始的state.name
    state.hasBack = ['public_detail', 'assign','aqi_detail'].includes(routeName)
    const pathname = window.location.hash.split('/')[1] || ''
    if (!['login'].includes(pathname)) {
        getUserInfo()
    }
})
// 获取用户信息
const getUserInfo = async () => {
    const userInfo = localGet('token')
    console.log(userInfo)
    console.log(userInfo.user)
    state.userInfo = userInfo
}
// 退出登录
const logout = () => {
        // 退出之后，将本地保存的 token  清理掉
        localRemove('token')
        // 回到登录页
        router.push({ path: '/login' })
}

router.afterEach((to) => {
    const { id } = to.query
    state.name = pathMap[to.name]
    // 需要展示返回icon
    console.log('to.name', to.name)
    state.hasBack = ['public_detail', 'assign','aqi_detail'].includes(to.name)
})

// 返回方法
const back = () => {
    router.back()
}
</script>

<style scoped>
.header {
    height: 50px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
.header .left .back{
    border: 1px solid #e9e9e9;
    padding: 5px;
    border-radius: 50%;
    margin-right: 5px;
    cursor: pointer;
}
.right > div > .icon{
    font-size: 18px;
    margin-right: 6px;
}
.author {
    margin-left: 10px;
    cursor: pointer;
}
</style>

<style>
.popper-user-box {
    background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat!important;
    background-size: cover!important;
    border-radius: 0!important;
}
.popper-user-box .nickname {
    position: relative;
    color: #ffffff;
}
.popper-user-box .nickname .logout {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}
</style>
