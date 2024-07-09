<script setup>
import { onMounted, reactive, ref} from 'vue'
import axios from '../utils/axios'
import {getLabelById, provinceAndCityOption} from "../main.js";
import Aside from "../components/Layout.vue";

const props1 = {
    checkStrictly: true,
}

new Date();
const state = reactive({
    tableData: [], // 数据列表
    selection: '', // 选中省市
    total: 0, // 总条数
    currentPage: 1, // 当前页
    pageSize: 11, // 分页大小
    id: '', // 编号
    description: '', // AQI等级
    date: '', //确认日期
    griddler: '', //网格员
    public: '', //反馈者
    startIndex: 1, // 编号起始索引
    options: [{
        value: '',
        label: '全部'
    }, {
        value: 1,
        label: '优（一）',
        color: '#00E400'
    }, {
        value: 2,
        label: '良（二）',
        color: '#C9C847'
    }, {
        value: 3,
        label: '轻度污染（三）',
        color: '#f08f30'
    }, {
        value: 4,
        label: '中度污染（四）',
        color: '#dd5449'
    }, {
        value: 5,
        label: '重度污染（五）',
        color: '#b04773'
    }, {
        value: 6,
        label: '严重污染（六）',
        color: '#762841'
    }]
})

const isDataLoaded = ref(false);

// 初始化获取列表
onMounted(() => {
    if (!isDataLoaded.value) {
        getList();
    }
})

const findOptionByValue = (value) => {
    const option = state.options.find(option => option.value === value);
    return option || { label: '未知', color: '#000000' };  // 提供默认值防止未找到时报错
};

// 获取列表方法
const getList = () => {
    if (isDataLoaded.value) return;
    const  provinceId = state.selection[0]
    const  cityId = state.selection[1]
    console.log('state.currentPage',state.currentPage);
    console.log('provinceId和cityId',provinceId,cityId);
    const params = {
        provinceId: provinceId,
        cityId: cityId,
        date: state.date,
        current:state.currentPage,
        size:state.pageSize
    };
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== '')
    );
    console.log("filteredParams",filteredParams)
    axios.get('http://localhost:8085/messageGriddler/viewAllMessageGriddler', {
        params:filteredParams
    }).then(res => {
        console.log(res)
        console.log(Array.isArray(res.data) ? 'array' : 'not array');
        state.startIndex = (state.currentPage - 1) * state.pageSize + 1; // 计算编号起始索引
        state.tableData = res.data.map((item,index) => ({
            id: item.messageGriddler.id,
            publicName: item.publicName,
            province: getLabelById(item.provinceId),
            city: getLabelById(item.cityId),
            level: item.messageGriddler.aqiLevel,
            date: item.messageGriddler.time.split('T')[0],
            time: item.messageGriddler.time.split('T')[1].split('.')[0],
            griddler: item.griddlerName,
            number: state.startIndex + index // 增加编号字段
        }));
        state.total = res.result;
        isDataLoaded.value = true; // 标记数据已加载
    }).catch(error => {
        console.error('Error fetching data: ', error);
    });
}

const handleQuery = () => {
    isDataLoaded.value = false;
    state.currentPage = 1;
    getList()
}

// 翻页方法
const handlePageChange = (currentPage) => {
    state.currentPage = currentPage
    isDataLoaded.value = false;
    getList()
}

const reset = () => {
    state.selection = '';
    state.date = '';
    isDataLoaded.value = false; // 重置数据加载状态
    state.currentPage = 1; // 重置分页组件的选中项到第一页
    getList();
}


</script>

<template>
    <Aside>
        <template #default>
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
                <el-button type="danger" @click="reset">重置</el-button>
                <el-button type="primary" @click="handleQuery">查询</el-button>
            </div>
        </template>
        <el-table
                :data="state.tableData"
                tooltip-effect="dark"
                style="width: 100%">
            <el-table-column
                    prop="number"
                    label="编号"
            >
            </el-table-column>
            <el-table-column
                    prop="province"
                    label="所在省"
            >
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="所在市"
            >
            </el-table-column>
            <el-table-column
                    prop="level"
                    label="AQI等级">
                <template #default="scope">
                    <span :style="{ color: findOptionByValue(scope.row.level).color, fontWeight: 'bold' }">
                        {{ findOptionByValue(scope.row.level).label }}
                    </span>
                </template>
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
                @current-change="handlePageChange"
        />
    </el-card>
        </template>
    </Aside>
</template>

<style scoped>

</style>
