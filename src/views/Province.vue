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
    axios.get('http://localhost:8085/messageGriddler/viewProvinceSubgroup', {}).then(res => {
        console.log(Array.isArray(res) ? 'array' : 'not array');
        console.log('这里是res',res)
        allData.value = res.map(item => ({
            provinceId: item.provinceId,
            nickName: item.provinceShortTitle,
            provinceName: item.provinceName,
            so2: item.soNum,
            co: item.coNum,
            pm25: item.pmNum,
            aqi: item.aqinum
        })).sort((a, b) => {
            return parseInt(a.provinceId) - parseInt(b.provinceId);
        });
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
                    prop="pm25"
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
