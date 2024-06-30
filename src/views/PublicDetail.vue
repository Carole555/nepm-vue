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
    axios.get(`/public/${id}`).then(res => {
        console.log(res)
        state.data = res
        state.tableData = res.publicData
    })
})

const TableHeader = [
    {
        prop: "id",
        label: "公众监督反馈信息编号",
    },
    {
        prop: "information",
        label: "反馈者信息",
    },
    {
        prop: "tel",
        label: "反馈者联系电话",
    },
    {
        prop: "address",
        label: "反馈信息所在地址",
    },
    {
        prop: "description",
        label: "反馈信息描述",
    },
    {
        prop: "level",
        label: "预估等级",
    },
    {
        prop: "datetime",
        label: "反馈日期时间",
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
