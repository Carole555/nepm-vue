<script setup>

import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import axios from '../utils/axios'
import Aside from "../components/Layout.vue";

const route = useRoute()
const { id } = route.query
const state = reactive({
    data: {},
    tableData: []
})
onMounted(() => {
    axios.get(`/aqi/${id}`).then(res => {
        console.log(res)
        state.data = res
        state.tableData = res.aqiData
    })
})

const TableHeader = [
    {
        prop: "id",
        label: "确认AQI数据编号",
    },
    {
        prop: "address",
        label: "确认信息所在地址",
    },
    {
        prop: "level",
        label: "确认AQI等级",
    },
    {
        prop: "datetime",
        label: "确认日期时间",
    },
    {
        prop: "griddler",
        label: "网格员信息",
    },
    {
        prop: "information",
        label: "公众监督员信息",
    },
    {
        prop: "description",
        label: "公众监督员反馈信息描述",
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
