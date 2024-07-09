<template>
  <div class="form-container">
    <img src="../assets/logo.png" alt="Logo" class="logo"/>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="fullname">真实姓名:</label>
        <input type="text" id="fullname" v-model="form.name" placeholder="请输入真实姓名" required />
      </div>
      <div class="form-group">
        <label for="phone">手机号码:</label>
        <input type="tel" id="phone" v-model="form.phone" placeholder="请输入11位手机号码" required />

      </div>
      <div class="form-group birthday-container">
        <label class="birthday">生日:</label>
        <select v-model="form.birthdayYear">
          <option disabled value="">年</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
        <select v-model="form.birthdayMonth">
          <option disabled value="">月</option>
          <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
        </select>
        <select v-model="form.birthdayDay">
          <option disabled value="">日</option>
          <option v-for="day in daysInMonth" :key="day" :value="day">{{ day }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>性别:</label>
        <div class="radio-group">
          <input type="radio" id="male" value="male" v-model="form.gender" required />
          <label for="male" class="radio-label">男</label>
          <input type="radio" id="female" value="female" v-model="form.gender" required />
          <label for="female" class="radio-label">女</label>
        </div>
      </div>
      <div class="form-group">
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="form.password" placeholder="请输入密码" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">确认密码:</label>
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" placeholder="请再次确认密码" required />
      </div>
      <button type="submit">注册</button>
    </form>
  </div>
</template>




<script>
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

export default {
  name: 'RegisterForm',
  setup() {

    const router = useRouter(); // 获取router实例
    const form = ref({
      name: '',
      phone: '',
      birthday: '',
      gender: null,
      password: '',
      confirmPassword: '',
      birthdayYear: '',
      birthdayMonth: '',
      birthdayDay: ''
    });


    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    const daysInMonth = computed(() => {
      if (!form.value.birthdayYear || !form.value.birthdayMonth) return [];
      return new Date(form.value.birthdayYear, form.value.birthdayMonth, 0).getDate();
    });

    watch([() => form.value.birthdayYear, () => form.value.birthdayMonth], () => {
      if (form.value.birthdayDay > daysInMonth.value) {
        form.value.birthdayDay = '';
      }
    });


    const isPhoneValid = computed(() => form.value.phone.length === 11);


    const handleSubmit = async () => {
      if (!isPhoneValid.value) {
        ElMessage.error("手机号必须为11位数字！");
        return;
      }

      if (form.value.password !== form.value.confirmPassword) {
        ElMessage.error("密码不匹配！");
        return;
      }

      if (form.value.birthdayYear && form.value.birthdayMonth && form.value.birthdayDay) {
        form.value.birthday = `${form.value.birthdayYear}-${form.value.birthdayMonth.toString().padStart(2, '0')}-${form.value.birthdayDay.toString().padStart(2, '0')}`;
      }

      const payload = {
        name: form.value.name,
        phone: form.value.phone,
        password: form.value.password,
        birthday: form.value.birthday,
        gender: form.value.gender === 'male' ? 0 : 1
      };

      console.log("Sending data to server:", payload);  // Debugging line


      try {
        const response = await axios.post('http://localhost:8089/public/addPublic', payload);
        console.log(response);
        console.log(response.data.success);
        if (response.data.success) {
          ElMessage.success('注册成功！');
          router.push('/login')
        }
      } catch (error) {
        console.error('注册失败:', error);
        ElMessage('注册公众监督员失败，请稍后再试！错误详情：' + error.message);
      }
    };


    return { form, handleSubmit, years, daysInMonth,isPhoneValid };
  }
};
</script>


<style>
.form-container {
  width: 90%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333333;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  font-size: 15px;
  margin-left: 20px;
}




.radio-group {
  flex: 2;
  display: flex;
  align-items: center;
  margin-right: 58px;
}

.radio-label {
  margin-right: 40px;
}

label {
  flex: 1;
  margin-right: 10px;
  text-align: right;
}

.birthday-container {
  display: flex;
  align-items: center;
}





input[type="text"],
input[type="tel"],
input[type="number"],
input[type="password"] {
  flex: 3;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

select {
  flex: 0;
  width: 70px; /* 特别为年份设置更窄的宽度 */
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
  margin-right: 5px;
  font-size: 13px;

}

select#birthdayMonth,
select#birthdayDay {
  width: 80px; /* 为月和日设置适当的宽度 */
}

input[type="text"]:focus,
input[type="tel"]:focus,
input[type="number"]:focus,
input[type="password"]:focus,
select:focus {
  border-color: #50904f;
}

input[type="radio"] {
  margin-right: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background: linear-gradient(to right, #11a86c, #036eb5);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

}

button:hover {
  background-color: #0578a8;
}

.logo {
  max-width: 120px;
  height: auto;
  margin-bottom: 20px;
}
</style>
