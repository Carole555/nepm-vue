<template>
  <div class="global-container">
    <div class="navbar">
      <div class="back" @click="goBack">〈</div>
      <img src="../assets/info.png" alt="历史反馈" class="history-icon" @click="navigateToHistory">
      <span>选择网格</span>
    </div>
    <div class="card-container">
      <div v-for="row in 6" :key="'row-' + row" class="grid-row">
        <div class="grid-cell" v-for="col in 3" :key="'col-' + col" :class="{'wide-col': col === 3}">
          {{ getText(row, col) }}
        </div>
      </div>
    </div>

    <div class="air-quality-prompt">请预估当前空气质量指数等级：</div>
    <div class="quality-radios">
      <label v-for="(level, index) in levels" :key="'level-' + level"
             :style="{ backgroundColor: levelColors[index], color: 'black' }">
        <input type="radio" name="airQuality" :value="index + 1" v-model="selectedLevel">
        {{ level }}
      </label>
    </div>

    <div class="feedback-section">
      <label for="feedback">请输入反馈意见：</label>
      <textarea id="feedback" v-model="feedback" placeholder="请输入您的意见..."></textarea>
      <button @click="submitFeedback">提交反馈</button>
    </div>
  </div>
</template>







<script>
import {onMounted, ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {ElMessage} from "element-plus";

export default {
  name: "Select",
  setup() {

    const router = useRouter();  // 获取 router 实例
    const route = useRoute();
    const selectedLevel = ref(null);
    const levels = ['一', '二', '三', '四', '五', '六'];
    const levelColors = ['#02e202', '#fcfd01', '#fc7d05', '#fc0101', '#94024AFF', '#7C0323FF'];

    const feedback = ref('');
    const provinceId = ref('');
    const cityId = ref('');
    const detailAddress = ref('');
    const publicId = ref('');
    let userId = localStorage.getItem('userId');// 获取用户ID


    onMounted(() => {
      provinceId.value = route.params.provinceId || route.query.provinceId;
      cityId.value = route.params.cityId || route.query.cityId;
      detailAddress.value = route.params.address || route.query.address;
    });



    // 方法可以直接在 setup 中返回并在模板中使用
    function navigateToHistory() {
      router.push({
        name: 'FeedbackInfo',
      });
    }

    function goBack() {
      router.go(-1);  // 返回上一页
    }

    function getText(row, col) {
      // 返回每个单元格的具体内容
      const textMatrix = [
        ['一', '优', '空气质量令人满意，基本无污染'],
        ['二', '良', '空气质量可接受，但某些污染物能对极少数异常敏感人群健康有较弱影响'],
        ['三', '轻度污染', '易感人群症状有轻度加剧，健康人群出现刺激症状'],
        ['四', '中度污染', '进一步加剧易感人群症状，可能对健康人群心脏，呼吸系统有影响'],
        ['五', '重度污染', '心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状'],
        ['六', '严重污染', '健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病']
      ];
      return textMatrix[row - 1][col - 1]; // 根据行和列索引获取文本
    }


    function submitFeedback() {

      if (feedback.value.trim() === '') {
        alert('请输入有效的反馈意见！');
        return;
      }
      const feedbackData = {
        id: uuidv4(),
        publicId: userId,
        provinceId: provinceId.value,
        cityId: cityId.value,
        description: feedback.value,
        address: detailAddress.value,
        level: selectedLevel.value.toString(),
        status: 0,
        date: new Date().toISOString().slice(0, 19)  // 格式化为 YYYY-MM-DDTHH:mm:ss
      };

      localStorage.setItem('id', feedbackData.id);


      axios.post('http://localhost:8087/messagePublic/submitMessagePublic', feedbackData)
          .then(response => {
            ElMessage('提交成功，感谢您的反馈！');
            feedback.value = ''; // 清空反馈框
            selectedLevel.value = null; // 重置选定的等级
          })
          .catch(error => {
            console.error('提交反馈失败:', error);
            alert('提交失败，请稍后再试！');
          });
    }

  return {
    navigateToHistory,
    goBack,
    submitFeedback,
    getText,
    selectedLevel,
    feedback,
    levels,
    levelColors,
    publicId
  };
}

}
</script>

<style scoped>

[v-cloak] {
  display: none;
}
.global-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* 使用视窗高度确保全屏 */
  width: 100vw; /* 使用视窗宽度确保全屏 */

  font-family: 'SimSun', '宋体', sans-serif;
  background-color: #f4f4f4;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 调整内容为两端对齐 */
  height: 130px;
  width: 100%;
  background-color: #0a8b8f;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-size: 20px;
  color: white;
  border-bottom-left-radius: 30px; /* 左下角圆角 */
  border-bottom-right-radius: 30px; /* 右下角圆角 */
  z-index: 100;
}
.history-icon {
  position: absolute;
  right: 20px; /* 调整图标到右侧 */
  width: 24px; /* 图标宽度 */
  height: 24px; /* 图标高度 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  z-index: 1000;/*定位元素提高文档流层级防止被遮盖*/
  margin-top: -80px;
}

.back {
  position: absolute;
  font-size: 18px;
  font-weight: bold;
  left: 15px;
  width: 24px;
  height: 24px;
  z-index: 1000;/*定位元素提高文档流层级防止被遮盖*/
  margin-top: -73px;
}
.navbar span {
  flex: 1;
  text-align: center;
  position: relative; /* 相对定位 */
  left: -5px; /* 根据返回图标的宽度调整 */
  margin-top: -80px;
}

.grid-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px dashed #0a8a8e; /* 使用虚线作为分隔线 */
  font-family: 楷体;
  font-size: 13px;
  font-weight: bold;
}

.grid-row:last-child {
  border-bottom: none; /* 最后一行不显示分隔线 */
}

.grid-cell {
  flex: 1;
  text-align: center;
  padding: 5px;
}

.grid-cell.wide-col {
  flex: 7; /* 让宽列占据更多空间 */
}




.air-quality-prompt,
.feedback-section label {
  text-align: left;
  margin-right: 145px;
  margin-top: -5px;
  color: #333;
  padding-left: 15px; /* 与表格左对齐 */
  font-size: 15px;
  font-weight: bold;


}

.quality-radios {
  margin-top: 10px;
  text-align: left;
  padding-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: space-around;
}

.quality-radios label {
  margin-right: 10px;
  padding: 3px 8px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  font-size: 10px;
}

#feedback {
  width: calc(95% - 30px); /* 保证与表格宽度相同，并且适应新的边距 */
  height: 70px;
  margin-top: 10px;
  margin-left: 15px; /* 左边距与表格对齐 */
  margin-right: 10px; /* 右边距 */
  padding: 8px;
  border: 1px solid #0a8a8e;
  border-radius: 10px;
}
.feedback-section {
  margin-top: 10px; /* 增加反馈输入区与单选框之间的距离 */
}
button {
  width: 150px; /* 设置按钮宽度 */
  padding: 5px 15px; /* 调整内边距 */
  font-size: 14px; /* 文字大小 */
  margin-top: 10px; /* 上边距 */
  margin-left: 110px;
  background-color: #0a8a8e; /* 绿色背景 */
  color: white; /* 白色文字 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #096b6e; /* 鼠标悬停时的深绿色 */
}


.card-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 调整对齐方式为顶部对齐 */
  align-items: center;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 10px;
  margin-top: 50px; /* 调整上边距 */
  width: calc(95% - 20px);
  z-index: 500;
  min-width: 360px;
  height: auto; /* 高度自适应内容 */
  font-size: 12px;
}

</style>

