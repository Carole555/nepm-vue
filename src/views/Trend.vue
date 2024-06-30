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
    axios.get('/trend', {

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
                    prop="id"
                    label="序号"
            >
            </el-table-column>
            <el-table-column
                    prop="month"
                    label="月份"
            >
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="AQI空气质量指数超标数量"
            >
            </el-table-column>
        </el-table>
    </el-card>
        </template>
    </Aside>
</template>

<style scoped>

</style>
