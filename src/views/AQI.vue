<script setup>
import { onMounted, reactive, ref} from 'vue'
import axios from '../utils/axios'
import {provinceAndCityOption} from "../main.js";

const props1 = {
    checkStrictly: true,
}


const date = ref('')
new Date();
const state = reactive({
    loading: false,
    tableData: [], // 数据列表
    selection: '', // 选中省市
    total: 0, // 总条数
    currentPage: 1, // 当前页
    pageSize: 10, // 分页大小
    id: '', // 编号
    description: '', // 预估等级
    date:'', //确认日期
    status: '', //是否指派
    options: [{
        value: '',
        label: '全部'
    }, {
        value: 1,
        label: '优（一）'
    }, {
        value: 2,
        label: '良（二）'
    }, {
        value: 3,
        label: '轻度污染（三）'
    }, {
        value: 4,
        label: '中度污染（四）'
    }, {
        value: 5,
        label: '重度污染（五）'
    }, {
        value: 6,
        label: '严重污染（六）'
    }]
})

// 初始化获取列表
onMounted(() => {
    getList()
})
// 获取列表方法
const getList = () => {
    state.loading = true
    axios.get('/public', {
        params: {
            pageNumber: state.currentPage,
            pageSize: state.pageSize,
            selection: state.selection,
            description: state.description,
            date: state.date
        }
    }).then(res => {
        state.tableData = res.list
        state.total = res.totalCount
        state.currentPage = res.currPage
        state.loading = false
    })
}

const handleQuery = () => {
    state.currentPage = 1
    getList()
}

// 翻页方法
const changePage = (val) => {
    state.currentPage = val
    getList()
}

// const handleChange = (selectedOptions) => {
//     console.log(selectedOptions)
//     state.selection = selectedOptions
// }

const handleDelete = () => {
    state.selection = ''
    state.description =''
    state.date = ''
    getList()
}

</script>

<template>
    <el-card class="public-container">
        <template #header>
            <div class="header">
                <el-text class="mx-1" style="margin-right: 10px">省市区域</el-text>
                <el-cascader
                        :options="provinceAndCityOption"
                        v-model="state.selection"
                        :props="props1"
                        placeholder="全部"
                        style="margin-right: 15px"
                        clearable>
                </el-cascader>
                <el-text class="mx-1" style="margin-right: 10px">确认日期</el-text>
                <el-date-picker
                        v-model="state.date"
                        type="date"
                        placeholder="确认日期"
                        style="margin-right: 20px"
                />
                <el-button type="danger" :@click="handleDelete()">重置</el-button>
                <el-button type="primary" :@click="handleQuery()">查询</el-button>
            </div>
        </template>
        <el-table
                :load="state.loading"
                :data="state.tableData"
                tooltip-effect="dark"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="编号"
            >
            </el-table-column>
            <el-table-column
                    prop="province"
                    label="所在省"
            >
                <!--                <template #default="scope">-->
                <!--                    <span>{{ $filters.orderMap(scope.row.orderStatus) }}</span>-->
                <!--                </template>-->
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="所在市"
            >
                <!--                <template #default='scope'>-->
                <!--                    <span v-if="scope.row.payType == 1">微信支付</span>-->
                <!--                    <span v-else-if="scope.row.payType == 2">支付宝支付</span>-->
                <!--                    <span v-else>未知</span>-->
                <!--                </template>-->
            </el-table-column>
            <el-table-column
                    prop="level"
                    label="AQI等级"
            >
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="确认日期"
            >
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="确认时间"
            >
            </el-table-column>
            <el-table-column
                prop="griddler"
                label="网格员"
            >
            </el-table-column>
            <el-table-column
                prop="publicName"
                label="反馈者"
            >
            </el-table-column>
            <el-table-column
                    label="操作"
            >
                <template #default="scope">
                    <router-link :to="{ path: '/aqi_detail', query: { id: scope.row.id }}">查看详情</router-link>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="state.total"
                :page-size="state.pageSize"
                :current-page="state.currentPage"
                @current-change="changePage"
        />
    </el-card>
</template>

<style scoped>

</style>
