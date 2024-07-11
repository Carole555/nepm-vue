<script setup>
import {onMounted, reactive, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axios from '../utils/axios'
import {provinceAndCityOption, getLabelById} from "../main.js";
import Aside from "../components/Layout.vue";
import {ElMessage} from "element-plus";

const allData = ref([])
const route = useRoute()
const router = useRouter()
const messageId = route.query.messageId
const initialSelection = ref([]);
const state = reactive({
    selection: [],
    griddler: '',
    options: [],
    isRemoteAssign: false
})
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
    console.log(messageId)
    axios.post(`http://localhost:8087/messagePublic/selectMessagePublic?messageId=${messageId}`).then(res => {
        console.log(res)
        const data = res.messagePublic;
        const publicData = res.apublic;
        initialSelection.value = [data.provinceId, data.cityId];
        state.selection = initialSelection.value;
        allData.value = [
            {label: "公众监督反馈信息编号", value: data.id},
            {label: "反馈者信息", value: `${publicData.name}，${publicData.gender === 0 ? '男' : '女'}，${publicData.birthday.split('T')[0]}`},
            {label: "反馈者联系电话", value: publicData.phone},
            {label: "反馈信息所在地址", value: `${getLabelById(data.provinceId)} ${getLabelById(data.cityId)} ${data.address}`},
            {label: "反馈信息描述", value: data.description},
            {label: "预估等级", value: level.find(l => l.value === data.level).label},
            {label: "反馈日期时间", value: `${data.date.split('T')[0]} ${data.date.split('T')[1].split('.')[0]}`}
        ];
        // 获取默认情况下的 griddler 数据
        fetchGriddlerOptions(initialSelection.value[0], initialSelection.value[1], false);
    }).catch(error => {
        ElMessage.error("数据获取出现问题，请联系开发人员进行检查")
        console.error('Error fetching data: ', error);
    })
})

// 监听开关状态变化，当开关关闭时重置级联选择器选项
watch(() => state.isRemoteAssign, (newValue) => {
    if (!newValue) {
        state.selection = initialSelection.value; // 重置为初始选项
        fetchGriddlerOptions(initialSelection.value[0], initialSelection.value[1], false);
    } else {
        fetchGriddlerOptions(state.selection[0], state.selection[1], true);
    }
})

// 监听级联选择器的变化
watch(() => state.selection, (newValue) => {
    state.options = []; // 清空指派给选择框
    state.griddler = ''; // 清空当前选中的指派对象
    if (state.isRemoteAssign) {
        fetchGriddlerOptions(newValue[0], newValue[1], true);
    }
});

const props1 = {
    checkStrictly: true,
}

const fetchGriddlerOptions = (provinceId, cityId, isRemote) => {
    const url = isRemote ? 'http://localhost:8082/griddler/selectPlaceGriddler' : 'http://localhost:8082/griddler/selectOneGriddlerAssign';
    const params = {
        provinceId,
        cityId,
        ...(isRemote && { offsiteStatus: 1 })
    };
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== '')
    );
    axios.get(url, {  params:filteredParams })
        .then(res => {
                state.options = res.map(item => ({
                    label: item.name,
                    value: item.id,
                    provinceId: item.provinceId,
                    cityId: item.cityId
                }));
        })
        .catch(error => {
            state.options = []; // 清空指派给选择框
            state.griddler = ''; // 清空当前选中的指派对象
            console.error('Error fetching griddler options: ', error);
        });
}

const assignGriddler = () => {
    if (state.griddler === '') {
        ElMessage.error("请先选择一个指派对象");
        return;
    }
    let assignData = {
        messageId: messageId,
        griddlerId: state.griddler,
        statusManager: state.isRemoteAssign ? 1 : 0,
        provinceId: state.selection[0], // 默认使用级联选择器中选中的省份ID
        cityId: state.selection[1], // 默认使用级联选择器中选中的城市ID
        status: 0
    };

    if (state.isRemoteAssign) {
        // 如果是异地指派，使用被指派人员自身的省份ID和城市ID
        const selectedGriddler = state.options.find(item => item.value === state.griddler);
        assignData.provinceId = selectedGriddler.provinceId;
        assignData.cityId = selectedGriddler.cityId;
    }

    axios.post('http://localhost:8086/messageManager/creatAssignedMessageManager', assignData)
        .then(() => {
            ElMessage.success("指派成功！");
            router.back(); // 返回上一级页面
        })
        .catch(error => {
            ElMessage.error("指派失败，请重试");
            console.error('Error assigning griddler: ', error);
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
                    style="width: 100%"
                    :show-header="false"
                >
                    <el-table-column
                        prop="label"
                        label="项目"
                        width="100"
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
                <div style="margin-top: 10px">
                    <el-text class="mx-1" style="margin-right: 10px;">是否异地指派</el-text>
                    <el-switch
                        v-model="state.isRemoteAssign"
                        class="mb-2"
                        style="margin-right: 15px"
                    />
                    <el-text class="mx-1" style="margin-right: 10px">省市区域</el-text>
                    <el-cascader
                        :options="provinceAndCityOption"
                        v-model="state.selection"
                        :props="props1"
                        placeholder=""
                        :disabled="!state.isRemoteAssign"
                        style="margin-right: 15px">
                    </el-cascader>
                    <el-text class="mx-1" style="margin-right: 10px">指派给</el-text>
                    <el-select v-model="state.griddler" style="width: 200px; margin-right: 10px" placeholder="">
                        <el-option
                            v-for="item in state.options"
                            :key="item.value"
                            :label="`${item.label} (${getLabelById(item.provinceId)}, ${getLabelById(item.cityId)})`"
                            :value="item.value"
                            style=" display: flex; justify-content: space-between; align-items: center;">
                            <template #default="{ label, value }">
                                <span>{{ item.label }}<span style="float: right;color: grey; font-size: 12px;">({{ getLabelById(item.provinceId) }}, {{ getLabelById(item.cityId) }})</span></span>
                            </template>
                        </el-option>
                    </el-select>

                    <el-button type="primary" style="margin-left: 10px" @click="assignGriddler">指派</el-button>
                </div>
            </el-card>
        </template>
    </Aside>
</template>

<style scoped>

</style>
