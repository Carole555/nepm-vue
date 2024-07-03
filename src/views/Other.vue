<script setup>

import {onMounted, ref} from "vue";
import axios from "../utils/axios.js";
import Aside from "../components/Layout.vue";

const allData = ref([])

onMounted(() => {
    getList()
})
// 获取列表方法
const getList = () => {
    axios.get('http://localhost:8085/messageGriddler/elseData', {}).then(res => {
        allData.value = [
            {label: "空气质量检测总数量", value: res["空气质量检测总数量"]},
            {label: "空气质量检测良好数量", value: res["空气质量检测良好数量"]},
            {label: "省会城市网格覆盖范围", value: formatPercentage(res["省会城市网格覆盖范围"])},
            {label: "大城市覆盖范围", value: formatPercentage(res["大城市覆盖范围"])}
        ];
    }).catch(error => {
        console.error('Error fetching data: ', error);
    });
}

const formatPercentage = (value) => {
    return value < 1 ? `${(value * 100).toFixed(2)}%` : value;
};
</script>

<template>
    <Aside>
        <template #default>
    <el-card class="public-container">
        <el-table
            :data="allData"
            tooltip-effect="dark"
            style="width: 100%"
            :show-header="false"
        >
            <el-table-column
                prop="label"
                label="项目"
            >
                <template #default="scope">
                    {{ scope.row.label }}
                </template>
            </el-table-column>
            <el-table-column
                prop="value"
                label="值"
            >
                <template #default="scope">
                    {{ scope.row.value }}
                </template>
            </el-table-column>
        </el-table>

    </el-card>
        </template>
    </Aside>
</template>

<style scoped>

</style>
