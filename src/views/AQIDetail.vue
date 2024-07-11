<script setup>

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from '../utils/axios'
import Aside from "../components/Layout.vue";
import {ElMessage} from "element-plus";

const allData = ref([])
const route = useRoute()
const id = route.query.id
const level=[{
    value: 1,
    label: '一级 优'
}, {
    value: 2,
    label: '二级 良'
}, {
    value: 3,
    label: '三级 轻度污染'
}, {
    value: 4,
    label: '四级 中度污染'
}, {
    value: 5,
    label: '五级 重度污染'
}, {
    value: 6,
    label: '六级 严重污染'
}]

onMounted(() => {
    axios.get(`http://localhost:8085/messageGriddler/viewOneMessageGriddler?id=${id}`).then(res => {
        console.log(res)
        allData.value = [
            {label: "确认AQI数据编号", value: res.id},
            {label: "确认信息所在地址", value: `${res.provinceName} ${res.cityName} ${res.address}`},
            {label: "确认AQI等级", value: level.find(l => l.value === res.aqiLevel).label},
            {label: "确认日期时间", value: `${res.time.split('T')[0]} ${res.time.split('T')[1].split('.')[0]}`},
            {label: "网格员信息", value: `${res.griddlerName}，${res.griddlerPhone}`},
            {label: "公众监督员信息", value: `${res.publicName}，${res.publicPhone}`},
            {label: "公众监督员反馈信息描述", value: res.description},
            {label: "现场照片", value: 'http://10.25.41.249:9000/nep/b1.png'}//value应为对应的照片地址
        ];
    }).catch(error => {
        ElMessage.error("数据获取出现问题，请联系开发人员进行检查")
        console.error('Error fetching data: ', error);
    })
})

</script>

<template>
    <Aside>
        <template #default>
    <el-card class="public-container">
        <el-table
                :data="allData"
                tooltip-effect="dark"
                style="width: 100%"
                :show-header="false"
        >
            <el-table-column
                prop="label"
                label="项目"
            >
                <template #default="scope">
                    {{ scope.row.label }}
                </template>
            </el-table-column>
            <el-table-column
                prop="value"
                label="信息"
            >
                <template #default="scope">
                    {{ scope.row.value }}
                </template>
            </el-table-column>
        </el-table>
    </el-card>
        </template>
    </Aside>
</template>

<style scoped>

</style>
