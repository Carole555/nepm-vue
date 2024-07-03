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
    axios.get('http://localhost:8085/messageGriddler/AqiLevelOver', {}).then(res => {
        allData.value = Object.keys(res).map((key, index) => ({
            id: index + 1,
            month: key,
            number: res[key]
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
