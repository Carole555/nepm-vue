<script setup>

import {onMounted} from "vue";
import axios from "../utils/axios.js";

let tableData = [];

onMounted(() => {
    getList()
})
// 获取列表方法
const getList = () => {
    axios.get('/distribution', {

    }).then(res => {
        tableData = res.list
    })
}

</script>

<template>
    <el-card class="public-container">
        <el-table
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%">
            <el-table-column
                    prop="level"
                    label="AQI指数等级"
            >
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="AQI指数等级描述"
            >
            </el-table-column>
            <el-table-column
                    prop="distribution"
                    label="AQI指数等级分布统计"
            >
            </el-table-column>
        </el-table>
    </el-card>
</template>

<style scoped>

</style>
