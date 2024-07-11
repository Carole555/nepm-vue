<script setup>

import {onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'
import axios from '../utils/axios'
import Aside from "../components/Layout.vue";
import {ElMessage} from "element-plus";
import {getLabelById} from "../main.js";

const allData = ref([])
const route = useRoute()
const messageId = route.query.messageId
const status = route.query.status
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
    console.log(status)
    if(status !== "1"){
        getUnassignedTable()
    } else {
        getAssignedTable()
    }
})

//当该反馈未指派给网格员时显示表格内容
const getUnassignedTable = () =>{
    console.log("进入了未指派");
    axios.post(`http://localhost:8087/messagePublic/selectMessagePublic?messageId=${messageId}`).then(res => {
        console.log(res)
        const data = res.messagePublic;
        const publicData = res.apublic;
        allData.value = [
            {label: "公众监督反馈信息编号", value: data.id},
            {label: "反馈者信息", value: `${publicData.name}，${publicData.gender === 0 ? '男' : '女'}，${publicData.birthday.split('T')[0]}`},
            {label: "反馈者联系电话", value: publicData.phone},
            {label: "反馈信息所在地址", value: `${getLabelById(data.provinceId)} ${getLabelById(data.cityId)} ${data.address}`},
            {label: "反馈信息描述", value: data.description},
            {label: "预估等级", value: level.find(l => l.value === data.level).label},
            {label: "现场照片", value: data.photo},
            {label: "反馈日期时间", value: `${data.date.split('T')[0]} ${data.date.split('T')[1].split('.')[0]}`}
        ];
    }).catch(error => {
        ElMessage.error("数据获取出现问题，请联系开发人员进行检查")
        console.error('Error fetching data: ', error);
    })
}


//当该反馈已指派给网格员时显示表格内容
const getAssignedTable = () =>{
    console.log("进入了已指派");
    axios.post(`http://localhost:8087/messagePublic/selectMessagePublicAssigned?messageId=${messageId}`).then(res => {
        console.log(res)
        const data = res.messagePublic;
        const publicData = res.apublic;
        const assignData = res.viewPageDTO;
        const tableData = [
            {label: "公众监督反馈信息编号", value: data.id},
            {label: "反馈者信息", value: `${publicData.name}，${publicData.gender === 0 ? '男' : '女'}，${publicData.birthday.split('T')[0]}`},
            {label: "反馈者联系电话", value: publicData.phone},
            {label: "反馈信息所在地址", value: `${getLabelById(data.provinceId)} ${getLabelById(data.cityId)} ${data.address}`},
            {label: "反馈信息描述", value: data.description},
            {label: "预估等级", value: level.find(l => l.value === data.level).label},
            {label: "现场照片", value: data.photo},
            {label: "反馈日期时间", value: `${data.date.split('T')[0]} ${data.date.split('T')[1].split('.')[0]}`},
            {label: "负责网格员信息", value: `${assignData.griddler.name}，${assignData.griddler.phone}`},
            {label: "当前状态", value: assignData.s}
        ];

        if (assignData.messageGriddler) {
            tableData.push(
                { label: "确认AQI等级", value: level.find(l => l.value === assignData.messageGriddler.aqiLevel).label },
                { label: "确认时间", value: `${assignData.messageGriddler.time.split('T')[0]} ${assignData.messageGriddler.time.split('T')[1].split('.')[0]}` }
            );
        }

        allData.value = tableData;
    }).catch(error => {
        ElMessage.error("数据获取出现问题，请联系开发人员进行检查")
        console.error('Error fetching data: ', error);
    })
}

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
                <div v-if="scope.row.label === '现场照片'">
                    <img :src="scope.row.value" alt="现场照片" style="width: 100px; height: 100px;" />
                </div>
                <div v-else>
                    {{ scope.row.value }}
                </div>
            </template>
        </el-table-column>
    </el-table>
    </el-card>
        </template>
    </Aside>
</template>

<style scoped>

</style>
