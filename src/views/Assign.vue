<script setup>

import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import axios from '../utils/axios'
import {provinceAndCityOption} from "../main.js";

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
        <div style="margin-top: 10px">
            <el-text class="mx-1" style="margin-right: 10px;">是否异地指派</el-text>
            <el-switch
                v-model="value1"
                class="mb-2"
                style="margin-right: 15px"
            />
            <el-text class="mx-1" style="margin-right: 10px">省市区域</el-text>
            <el-cascader
                :options="provinceAndCityOption"
                v-model="state.selection"
                :props="props1"
                placeholder="全部"
                style="margin-right: 15px">
            </el-cascader>
            <el-text class="mx-1" style="margin-right: 10px">指派给</el-text>
            <el-select v-model="state.griddler" style="width: 200px; margin-right: 10px" placeholder="全部">
                <el-option
                    v-for="item in state.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    style="margin-right: 20px"
                />
            </el-select>
            <el-button style="margin-left: 10px">指派</el-button>
        </div>
    </el-card>
</template>

<style scoped>

</style>
