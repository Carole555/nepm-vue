<script setup>

import {onMounted} from "vue";
import axios from "../utils/axios.js";
import Aside from "../components/Layout.vue";

let tableData = [];

onMounted(() => {
    getList()
})
// 获取列表方法
const getList = () => {
    axios.get('/province', {

    }).then(res => {
        tableData = res.list
    })
}

</script>

<template>
    <Aside>
        <template #default>
    <el-card class="public-container">
        <el-table
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%">
            <el-table-column
                    prop="provinceId"
                    label="省编号"
            >
            </el-table-column>
            <el-table-column
                    prop="nickName"
                    label="省简称"
            >
            </el-table-column>
            <el-table-column
                    prop="provinceName"
                    label="省名称"
            >
            </el-table-column>
            <el-table-column
                    prop="so2"
                    label="SO2超标累计"
            >
            </el-table-column>
            <el-table-column
                    prop="co"
                    label="CO超标累计"
            >
            </el-table-column>
            <el-table-column
                    prop="pm2.5"
                    label="PM2.5超标累计"
            >
            </el-table-column>
            <el-table-column
                    prop="aqi"
                    label="AQI超标累计"
            >
            </el-table-column>
        </el-table>
    </el-card>
        </template>
    </Aside>
</template>

<style scoped>

</style>
