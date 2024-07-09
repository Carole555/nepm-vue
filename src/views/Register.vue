<template>
  <div class="register-container">
    <header class="header">
      <div class="back" @click="goBack">〈</div>
      <h1>注册</h1>
    </header>
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';

export default {
  name: 'Register',
  components: {
    RegisterForm,
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 返回上一页
    },
  },
};
</script>

<style>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(to right, #ffffff, #ffffff);
  color: #ffffff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to right, #10a274, #0370b3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
}

.back {
  cursor: pointer;
  font-size: 14px;
  color: #ffffff;
  margin-left: 10px;
}

h1 {
  margin: 0;
  font-size: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-family: 'SimSun', '宋体', sans-serif;
}
</style>
