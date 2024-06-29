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
                <el-text class="mx-1" style="margin-right: 10px">预估等级</el-text>
                <el-select v-model="state.description" style="width: 200px; margin-right: 15px" placeholder="全部">
                    <el-option
                            v-for="item in state.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"

                    />
                </el-select>
                <el-text class="mx-1" style="margin-right: 10px">反馈日期</el-text>
                <el-date-picker
                        v-model="state.date"
                        type="date"
                        placeholder="反馈日期"
                        style="margin-right: 15px"
                />
                <el-button type="danger" :@click="handleDelete()">重置</el-button>
                <el-button type="primary" :@click="handleQuery()">查询</el-button>
                <el-radio-group v-model="state.status" style="margin-left: 40px">
                    <el-radio-button label="未指派" value="0" />
                    <el-radio-button label="已指派" value="1" />
                </el-radio-group>
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
                    prop="publicName"
                    label="反馈者姓名"
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
                    label="预估污染等级"
            >
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="反馈日期"
            >
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="反馈时间"
            >
            </el-table-column>
            <el-table-column
                    label="操作"
            >
                <template #default="scope">
                    <router-link :to="{ path: '/public_detail', query: { id: scope.row.id }}">查看详情</router-link>
                    <router-link :to="{ path: '/assign', query: { id: scope.row.id }}">指派</router-link>
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

<script setup>
import { onMounted, reactive, ref} from 'vue'
import axios from '../utils/axios'
import {provinceAndCityOption} from '../main.js'

const selectedOptions = ref([])

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
    date:'', //反馈日期
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



<style scoped>
.demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-date-picker .block:last-child {
    border-right: none;
}

.demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>
