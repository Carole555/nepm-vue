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
    axios.get('/other', {

    }).then(res => {
        tableData = res.list
    })
}

const TableHeader = [
    {
        prop: "total",
        label: "空气质量检测总数量",
    },
    {
        prop: "fine",
        label: "空气质量检测良好数量",
    },
    {
        prop: "provinceCover",
        label: "省会城市网格覆盖范围",
    },
    {
        prop: "cityCover",
        label: "大城市网格覆盖范围",
    }
]

</script>

<template>
    <Aside>
        <template #default>
    <el-card class="public-container">
        <el-table
            :data="state.tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :show-header="false"
        >
            <el-table-column
                v-for="(item, index) in TableHeader"
                :key="index"
                :prop="item"
            >
            </el-table-column>
        </el-table>
    </el-card>
        </template>
    </Aside>
</template>

<style scoped>

</style>
