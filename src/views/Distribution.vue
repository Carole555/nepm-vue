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
    axios.get('http://localhost:8085/messageGriddler/viewAQILevel', {}).then(res => {
        allData.value = res.map(item => ({
            level: item.aqiLevel,
            description: item.description,
            distribution: item.countNum
        }));
    }).catch(error => {
        console.error('Error fetching data: ', error);
    });
}

</script>

<template>
    <Aside>
        <template #default>
    <el-card class="public-container">
        <el-table
                :data="allData"
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
    </Aside>
</template>

<style scoped>

</style>
