<template>
  <div class="global-container">
    <div class="navbar">
      <div class="back" @click="goBack">〈</div>
      <span class="navbar-title">反馈任务详细信息</span>
    </div>
    <!-- 页面其他内容 -->
    <table class="details-table">
      <tr>
        <td class="col1">反馈用户</td>
        <td class="col2">{{ details.phone }}  {{ details.name }}</td>
      </tr>
      <tr>
        <td class="col1">网格</td>
        <td class="col2">{{ locationNames.province }}{{ locationNames.city }}</td>
      </tr>
      <tr>
        <td class="col1">详细地址</td>
        <td class="col2">{{ details.address }}</td>
      </tr>
      <tr>
        <td class="col1">预估等级</td>
        <td class="col2">{{ levelDescription}}</td>
      </tr>
      <tr>
        <td class="col1">信息描述</td>
        <td class="col2">{{ details.description }}</td>
      </tr>
    </table>
    <div class="input-container">
      <div class="input-group" v-for="pollutant in pollutants" :key="pollutant.name">
        <label class="input-label">{{ pollutant.label }}：</label>
        <input v-model.trim="pollutant.value" :placeholder="'请输入' + pollutant.label">
        <span class="unit">ug/m3</span>
        <div class="color-box" :style="colorStyle(pollutant)">
          {{ pollutant.level }}
        </div>
      </div>
      <div class="aqi-level-display" :style="aqiStyle">
        最终AQI等级：{{ finalAQILevelDescription}}
      </div>
      <button @click="submitData">提交</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import {ref,reactive, computed, onMounted} from "vue";
import axios from 'axios';
import {ElMessage} from "element-plus";
import {provinceAndCityOption} from "../main.js";


export default {
  name: "DetailedInfo",
  setup() {
    const router = useRouter();


    const pollutants = reactive([
      {
        name: 'so2',
        label: 'SO₂浓度',
        value: '',
        level: '',
        thresholds: [
          { min: 0, max: 35, color: '#58D68D', level: '一' },
          { min: 36, max: 75, color: '#F4D03F', level: '二' },
          { min: 76, max: 185, color: '#DC7633', level: '三' },
          { min: 186, max: 304, color: '#CB4335', level: '四' },
          { min: 305, max: 604, color: '#900C3F', level: '五' },
          { min: 605, max: 1000, color: '#641E16', level: '六' }
        ]
      },
      {
        name: 'co',
        label: 'CO浓度',
        value: '',
        level: '',
        thresholds: [
          { min: 0, max: 5, color: '#58D68D', level: '一' },
          { min: 6, max: 10, color: '#F4D03F', level: '二' },
          { min: 11, max: 35, color: '#DC7633', level: '三' },
          { min: 36, max: 60, color: '#CB4335', level: '四' },
          { min: 61, max: 90, color: '#900C3F', level: '五' },
          { min: 91, max: 150, color: '#641E16', level: '六' }
        ]
      },
      {
        name: 'pm25',
        label: 'PM2.5',
        value: '',
        level: '',
        thresholds: [
          { min: 0, max: 35, color: '#58D68D', level: '一' },
          { min: 36, max: 75, color: '#F4D03F', level: '二' },
          { min: 76, max: 115, color: '#DC7633', level: '三' },
          { min: 116, max: 150, color: '#CB4335', level: '四' },
          { min: 151, max: 250, color: '#900C3F', level: '五' },
          { min: 251, max: 500, color: '#641E16', level: '六' }
        ]
      }
    ]);
    const details = ref({});

    const levelColors = {
      1: '#58D68D', // 优
      2: '#F4D03F', // 良
      3: '#DC7633', // 轻度污染
      4: '#CB4335', // 中度污染
      5: '#900C3F', // 重度污染
      6: '#641E16'  // 严重污染
    };





    const finalAQILevel = computed(() => {
      const levelMap = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6 };
      const levels = pollutants.map(p => levelMap[p.level] || 0);
      const maxLevel = Math.max(...levels);
      return maxLevel; // 返回最高污染等级的数字
    });

    const finalAQILevelDescription = computed(() => {
      const descriptions = {
       1: '一级-优',
       2: '二级- 良',
       3: '三级- 轻度污染',
       4: '四级- 中度污染',
       5:'五级- 重度污染',
       6:'六级- 严重污染',
    };
      return descriptions[finalAQILevel.value] || ' ';
    });



    const aqiStyle = computed(() => {
      return {
        backgroundColor: levelColors[finalAQILevel.value] || '#FFF', // 如果没有等级匹配，默认白色背景
        color: '#2b2b2b' // 文字颜色
      };
    });

    const findLocationById = (provinceId, cityId) => {
      let province = provinceAndCityOption.find(p => p.value === provinceId);
      let city = province && province.children ? province.children.find(c => c.value === cityId) : null;
      return { province: province ? province.label : '', city: city ? city.label : '' };
    };

    const locationNames = computed(() => {
      if (details.value.provinceId && details.value.cityId) {
        return findLocationById(details.value.provinceId, details.value.cityId);
      }
      return { province: '', city: '' };
    });


    const levelDescription = computed(() => {
      const levelMap = {
        1: '一级 优',
        2: '二级 良',
        3: '三级 轻度污染',
        4: '四级 中度污染',
        5: '五级 重度污染',
        6: '六级 严重污染',
      };
      // 将数字等级转换为文字描述，如果没有匹配则返回空字符串
      return levelMap[details.value.level] || '';
    });







    async function fetchMessageDetails() {
      let messageId = localStorage.getItem('messageId');  // 从 localStorage 获取 messageId
      console.log(messageId);
      try {
        const response = await axios.post('http://localhost:8087/messagePublic/selectMessagePublic', null,{
          params: { messageId: messageId }
        });
        console.log(response);
          details.value = {
            publicId: response.messagePublic.publicId,
            provinceId: response.messagePublic.provinceId,
            cityId: response.messagePublic.cityId,
            level: response.messagePublic.level,
            address: response.messagePublic.address,
            date: response.messagePublic.date,
            description: response.messagePublic.description,
            name: response.apublic.name,
            phone: response.apublic.phone,

          };


      } catch (error) {
        console.error('请求失败:', error);
      }
    }

    onMounted(fetchMessageDetails);


    const submitData = async () => {
      let griddlerId = localStorage.getItem('userId');  // 这里假设网格员 ID 是已知的，你可以根据实际情况修改或动态获取
      let messageId =  details.value.publicId; // 从 details 对象获取消息发布 ID
      console.log(messageId)

      const coValue = parseInt(pollutants.find(p => p.name === 'co').value, 10);
      const so2Value = parseInt(pollutants.find(p => p.name === 'so2').value, 10);
      const pmValue = parseInt(pollutants.find(p => p.name === 'pm25').value, 10);


      if (isNaN(coValue) || isNaN(so2Value) || isNaN(pmValue)) {
        ElMessage.error('请输入有效的污染物浓度值');
        return; // 如果值不是有效的数字，则不提交
      }

      const aqiNumericLevel = finalAQILevel.value || 0; // 使用映射表转换AQI等级



      if (aqiNumericLevel === 0) {
        ElMessage.error('无效的AQI等级');
        return; // 如果映射失败或AQI等级无效
      }

      const params = new URLSearchParams();
      params.append('co', coValue);
      params.append('pm', pmValue);
      params.append('so2', so2Value);
      params.append('message_public_id', messageId);
      params.append('aqi_level', aqiNumericLevel);
      params.append('griddler_id', griddlerId);





      try {
        const response = await axios.post('http://localhost:8085/messageGriddler/creatMessageGriddler', params);
        console.log(response);
        ElMessage('提交成功！')

      } catch (error) {
        console.error('提交失败:', error);
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          ElMessage.error(`提交失败: ${error.response.data.message}`);
        } else if (error.request) {
          // 请求已发出，但没有收到响应
          console.log(error.request);
          ElMessage.error('无响应收到');
        } else {
          // 发送请求时出了点问题
          console.log('Error', error.message);
          ElMessage.error('请求错误');
        }
      }
    };





    function goBack() {
      router.back();  // 返回上一个页面
    }




    function colorStyle(pollutant) {
      // 判断是否有输入且输入是有效数字
      if (!pollutant.value || isNaN(parseFloat(pollutant.value))) {
        // 重置污染物等级
        pollutant.level = '';
        return {}; // 返回空对象，不显示任何颜色或等级
      }

      const num = parseFloat(pollutant.value);
      const found = pollutant.thresholds.find(threshold => num >= threshold.min && num <= threshold.max);
      if (found) {
        pollutant.level = found.level;
        return {
          backgroundColor: found.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px'
        };
      } else {
        // 如果数值超出所有定义范围
        pollutant.level = '超出范围';
        return {
          backgroundColor: '#343a40', // 暗灰色背景
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        };
      }
    }

    return { details,goBack,pollutants,colorStyle,finalAQILevel,aqiStyle,submitData,locationNames,finalAQILevelDescription,levelDescription};
  }
}
</script>

<style scoped>
.global-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/b2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'SimSun', '宋体', sans-serif;
}

.navbar {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #0a8b8f;
  color: white;
  font-size: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.back {
  cursor: pointer;
  font-size: 15px;
  margin-left: -5px;
}

.navbar-title {
  flex-grow: 1;
  text-align: center;
  margin-right: 50px;
}

.details-table {
  width: 90%; /* 表格宽度相对于视口宽度 */
  margin-top: 70px; /* 表格与导航栏的间距 */
  border-collapse: collapse;
  border: 1px solid #0a8b8f; /* 加强外部边框并使用绿色 */
}

.details-table td {
  border: 1px solid #0a8b8f; /* 加强单元格边框并使用绿色 */
  padding: 10px;
  text-align: left;
}

.col1 {
  width: 30%; /* 第一列宽度 */
}

.col2 {
  width: 70%; /* 第二列宽度 */
}

.input-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 20px;
  margin-left: -40px;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 调整为两端对齐，使内容分布在两侧 */
  width: 100%;
  margin-bottom: 20px;
}

.input-group label {
  width: 30%; /* 与表格第一列对齐 */
  margin-left: 50px; /* 与输入框的间距 */
  margin-top: -10px;
  font-weight: bold;
  font-size: 13px;
  white-space: nowrap;
}

.input-group input {
  width: 80%;
  padding: 5px;
  margin-bottom: 10px; /* 每个输入框之间的间距 */
  border: 1px solid #ccc;
  border-radius: 20px;
  box-sizing: border-box;
}

.unit {
  margin-left: 5px;
  font-size: 12px;
  margin-top: -10px;
}

.color-box {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  margin-top: -10px;
}

.aqi-level-display {
  width: 70%;
  padding: 10px;
  text-align: center;
  font-size: 16px;
  color: #333;
  border-radius: 10px;
  margin-top: -5px;
  margin-left: 61px;
}

button {
  width: 30%;
  padding: 10px 20px;
  margin-top: 20px;
  margin-left: 130px;
  background-color:#0a8b8f;
  color: #f4f4f4;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

</style>
