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
                <el-text class="mx-1" style="margin-right: 10px">预估等级</el-text>
                <el-select v-model="state.level" style="width: 200px; margin-right: 15px" placeholder="全部">
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
                <el-button type="danger" @click="reset">重置</el-button>
                <el-button type="primary" @click="handleQuery">查询</el-button>
                <el-radio-group v-model="state.status" style="margin-left: 40px" @change="handleStatusChange">
                    <el-radio-button label="未指派" value="0"/>
                    <el-radio-button label="已指派" value="1"/>
                </el-radio-group>
            </div>
        </template>
        <el-table
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
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="所在市"
            >
            </el-table-column>
            <el-table-column
                    prop="level"
                    label="预估污染等级">
                <template #default="scope">
                    <span :style="{ color: findOptionByValue(scope.row.level).color, fontWeight: 'bold' }">
                        {{ findOptionByValue(scope.row.level).label }}
                    </span>
                </template>
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
                    <router-link :to="{ path: '/public_detail', query: { id: scope.row.id }}" style="margin-right: 10px">查看详情</router-link>
                    <router-link v-if="scope.row.status !== 1" :to="{ path: '/assign', query: { id: scope.row.id }}">指派</router-link>
                    <span v-else style="color: #ccc; cursor: not-allowed;">指派</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :key="totalRecords"
                background
                layout="prev, pager, next"
                :total="totalRecords"
                :page-size="state.pageSize"
                :current-page="currentPageRef.value"
                @current-change="handlePageChange"
        />
    </el-card>
    </template>
    </Aside>
</template>

<script setup>
import { onMounted, reactive, ref} from 'vue'
import axios from '../utils/axios'
import {provinceAndCityOption} from '../main.js'
import Aside from "../components/Layout.vue";

const selectedOptions = ref([])

const props1 = {
    checkStrictly: true,
}

const totalRecords = ref(0);
const allData = ref([]); // 用于存储从服务器加载的全部数据
const date = ref('');
const currentPageRef = ref(1);
new Date();
const state = reactive({
    tableData: [], // 数据列表
    selection: [], // 选中省市
    pageSize: 11, // 分页大小
    id: '', // 编号
    level: '', // 预估等级
    date:'', //反馈日期
    status: '', //是否指派
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
const isDataQueried = ref(false);

// 初始化获取列表
onMounted(() => {
    console.log('这里是初始化');
    if (!isDataLoaded.value) {
        getList();
    }
});


const findOptionByValue = (value) => {
    const option = state.options.find(option => option.value === value);
    return option || { label: '未知', color: '#000000' };  // 提供默认值防止未找到时报错
};


// 获取列表方法
const getList = () => {
    if (isDataLoaded.value) return;
    console.log('触发了getList方法！');
    axios.post('http://localhost:8087/messagePublic/viewSomeMessagePublic', {
        params: {
            current:currentPageRef.value,
            size:state.pageSize
        }
    }).then(res => {
        console.log(Array.isArray(res) ? 'array' : 'not array');
        allData.value = res.map(item => ({
            id: item.messagePublic.id,
            publicName: item.apublic ? item.apublic.name : '未知',
            province: item.provinceName,
            city: item.cityName,
            level: item.messagePublic.level,
            date: item.messagePublic.date.split('T')[0],
            time: item.messagePublic.date.split('T')[1].split('.')[0],
            status: item.messagePublic.status
        }));
        totalRecords.value = allData.value.length;
        handlePageChange(1); // 初始化设置第一页数据
        isDataLoaded.value = true; // 标记数据已加载
    }).catch(error => {
        console.error('Error fetching data: ', error);
    });
}

const handleStatusChange = (value) => {
    console.log('触发了handleStatusChange方法，状态值为：', value);
    state.status = value;
    handleQuery();
}


//查询方法
const handleQuery = () => {
    console.log('触发了handleQuery方法！');
    console.log(typeof state.date)
    currentPageRef.value = 1;
    const  provinceId = state.selection[0]
    const  cityId = state.selection[1]
    axios.get('http://localhost:8087/messagePublic/viewSomeMessagePublic', {
        params: {
            provinceId: provinceId ? provinceId : null,
            cityId: cityId ? cityId : null,
            level: state.level ? state.level : null,
            date: state.date ? state.date : null,
            status: state.status ? state.status : null
            current:currentPageRef.value,
            size:state.pageSize
        }
    }).then(res => {
        allData.value = res.map(item => ({
            id: item.messagePublic.id,
            publicName: item.apublic ? item.apublic.name : '未知',
            province: item.provinceName,
            city: item.cityName,
            level: item.messagePublic.level,
            date: item.messagePublic.date.split('T')[0],
            time: item.messagePublic.date.split('T')[1].split('.')[0],
            status: item.messagePublic.status
        }));
        totalRecords.value = allData.value.length;
        handlePageChange(1); // 初始化设置第一页数据
        isDataQueried.value = true; // 标记数据已查到
    }).catch(error => {
        console.error('Error fetching data: ', error);
    });
}


// 翻页方法
const handlePageChange  = (currentPage) => {
    console.log("Changing to page: ", currentPage);
    currentPageRef.value = currentPage
    const startIndex = (currentPage - 1) * state.pageSize;
    const endIndex = startIndex + state.pageSize;
    state.tableData = allData.value.slice(startIndex, endIndex); // 获取当前页的数据片段
    console.log("New data slice: ", state.tableData);
}


const reset = () => {
    console.log('触发了reset方法！')
    state.selection = '';
    state.level = '';
    state.date = '';
    state.status = '';
    isDataLoaded.value = false; // 重置数据加载状态
    currentPageRef.value = 1; // 重置分页组件的选中项到第一页
    getList();
        // handlePageChange(1); // 手动触发分页变化，加载第一页数据
        //

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
