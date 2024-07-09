<template>
  <div class="global-container">
    <div class="navbar">
      <div class="back" @click="goBack">〈</div>
      <span class="title">历史反馈信息列表</span>
    </div>
    <div class="feedback-container">
      <div v-for="(feedback, index) in feedbacks" :key="index" class="feedback-item">
        <div class="feedback-section level-color" :style="{ backgroundColor: getAqiColor(feedback.level) }">
          {{ convertLevelToChinese(feedback.level) }}
        </div>
        <div class="feedback-section">
          {{ feedback.date }}
          {{ feedback.time }}
        </div>
        <div class="feedback-section">
          {{ feedback.provinceName }}
        </div>
        <div class="feedback-section">
          {{ feedback.cityName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "FeedbackInfo",
  setup() {
    const router = useRouter();
    const feedbacks = ref([]);
    const userId = localStorage.getItem('userId'); // 从本地存储获取用户ID

    function goBack() {
      router.back(); // 返回上一个页面
    }

    function getAqiColor(level) {
      const levels = {
        1: '#02E300', // 优
        2: '#FFFF00', // 良
        3: '#FF7E00', // 轻度污染
        4: '#FE0000', // 中度污染
        5: '#98004B', // 重度污染
        6: '#7E0123'  // 严重污染
      };
      return levels[level] || '#7E0123';
    }

    function convertLevelToChinese(level) {
      const levels = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六'
      };
      return levels[level] || '未知';
    }

    async function fetchFeedbacks() {
      if (!userId) {
        alert('用户ID不存在，请重新登录或注册。');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8087/messagePublic/ViewMyMessagePublic/${userId}`);

          feedbacks.value = response.map(item => ({
            id: item.messagePublic.id,
            level: item.messagePublic.level,
            date: item.messagePublic.date.split('T')[0],
            time: item.messagePublic.date.split('T')[1].split('.')[0],
            provinceName: item.provinceName,
            cityName: item.cityName,
            status: item.messagePublic.status
          }));

      } catch (error) {
        console.error('请求失败:', error);
        alert('网络错误，请稍后再试');
      }
    }

    onMounted(fetchFeedbacks);

    return { goBack, feedbacks, getAqiColor, convertLevelToChinese };
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
  background-color: #f4f4f4;
 font-family: 'SimSun', '宋体', sans-serif;
  background-image: url('../assets/b2.png'); /* 设置背景图片 */
  background-size: cover; /* 覆盖整个容器 */
  background-position: center; /* 中心对齐背景图片 */
  background-repeat: no-repeat; /* 不重复背景图片 */
}

.navbar {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #0a8b8f;
  color: white;
  font-size: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.back {
  position: absolute;
  font-size: 15px;
  font-weight: bold;
  left: 15px;

  cursor: pointer;

}

.title {
  position: relative;
  margin-left: -40px;
}

.feedback-container {
  margin-top: 70px; /* 增加间距，使其位于导航栏下方 */
  width: 90%; /* 调整宽度与文本框一致 */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 华文楷体;
}

.feedback-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #0a8a8e;
  border-radius: 5px;
  background: white;
  font-size: 14px;
}

.feedback-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}

.level-color {
  width: 15px;  /* 定义宽度30px */
  height: 15px; /* 高度与宽度相同，形成正方形 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px; /* 圆角设计 */
  margin-right: 10px; /* 和其他部分的间隔 */
}

</style>
