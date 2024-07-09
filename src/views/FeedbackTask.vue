<template>
  <div class="global-container">
    <div class="navbar">
      <div class="back" @click="goBack">〈</div>
      <span class="navbar-title">待做任务列表</span>
    </div>
    <div class="tasks-container">
      <div v-for="(task, index) in tasks" :key="index" class="task-item">
        <div class="task-aqi" :style="{ backgroundColor:getAqiColor(task.level) }">
          {{ task.level }}
        </div>
        <div class="task-details">
          <p>{{ task.provinceName }} {{ task.cityName }} - {{ task.date }}</p>
          <p>{{ task.address }}</p>
        </div>
        <span class="go-to-details" @click="goToDetails(task)">去检测☞</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";

export default {
  name: "FeedbackTask",
  setup() {
    const router = useRouter();
    const tasks = ref([]);  // 初始化空的任务列表




    function goToDetails(tasks) {
      localStorage.setItem('messageId', tasks.taskId);  // 存储 messageId 到 localStorage
      console.log(tasks.taskId);
      router.push('/detailedInfo').catch(err =>{
        console.error("路由跳转错误",err)
      });
    }



    function goBack() {
      router.go(-1);  // 返回上一页
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





    async function fetchTasks() {
      const griddlerId = localStorage.getItem('userId');
      if (!griddlerId) {
        console.error('无法获取网格员ID');
        return;
      }
      const url = `http://localhost:8086/messageManager/viewOneGriddlerAssigned/${griddlerId}`;
      try {
        const response = await axios.get(url);
        console.log(response);
        tasks.value = response.map(item => ({
          provinceName: item.provinceName,
          cityName: item.cityName,
          level: item.level,
          address: item.address,
          date: item.date.split('T')[0],
          time: item.date.split('T')[1].split('.')[0],
          taskId: item.messageId
        }));
      } catch (error) {
        console.error('请求失败：', error.response ? error.response.data : '服务器无响应');
        alert('网络错误，请稍后再试');
      }

    }

    onMounted(fetchTasks);









    return { tasks, goBack, goToDetails,getAqiColor,convertLevelToChinese };
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
  font-family: 'SimSun', '宋体', sans-serif;
  background-image: url('../assets/b1.png'); /* 修改此处的路径 */
  background-size: cover;
  background-position: center;
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.tasks-container {
  margin-top: 230px; /* 调整与导航栏的距离 */
  width: 80%; /* 缩小容器宽度为80% */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  font-family: 华文楷体;
}



.back {
  cursor: pointer;
  margin-left: -5px;
  z-index: 1000;
  font-size: 18px;
}

.navbar-title {
  flex-grow: 1;
  text-align: center;
  margin-left: -50px;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 任务项宽度填充容器宽度 */
  margin: 15px 0;
  padding: 10px;
  border: 1px solid #0a8a8e;
  border-radius: 10px;
  background-color: #fdfdfd;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* 轻微的阴影 */
}

.task-aqi {
  width: 30px; /* 设置宽度 */
  height: 30px; /* 设置高度与宽度相等，形成正方形 */
  display: flex; /* 使用flex布局来居中内容 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  margin-left: -5px;
  margin-right: 5px;
}

.task-details {
  flex-basis: 70%; /* 增加详细信息显示区域的空间 */
  display: flex;
  flex-direction: column;
  margin-top: -5px; /* 减小与上方元素的间距 */
  margin-bottom: -5px; /* 减小与下方元素的间距 */

}

.task-details p {
  margin: 2px 0; /* 减少段落间的上下间距 */
}

.go-to-details {
  flex-basis: 20%; /* 分配20%的空间给去检测链接 */
  color: #0a8a8e;
  cursor: pointer;
  text-decoration: underline;
  text-align: right;
  font-size: 15px;
}

.go-to-details:hover {
  color: #367c39;
}

</style>
