<template>
    <body id="paper">
    <div class="login-body" >
        <div class="login-container">
            <div class="head">
                <img class="logo" src="../assets/white.png" />
                <div class="name">
                    <div class="title">东软环保</div>
                    <div class="tips">公众监督平台管理系统</div>
                </div>
            </div>
            <el-form label-position="top" :rules="state.rules" :model="state.ruleForm" ref="loginForm" class="login-form">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model.trim="state.ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.trim="state.ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <div class="form-spacing"></div>
                <el-form-item>
                    <el-button style="width: 100%" color="#1AA8A8" type="primary" @click="submitForm">立即登录</el-button>
                </el-form-item>
              <!-- 注册链接 -->
              <div class="register-link">
                <router-link to="/register">没有账号？注册新账号</router-link>
              </div>
            </el-form>
        </div>
    </div>
    </body>
</template>

<script setup>
import axios from '../utils/axios'
import { reactive, ref } from 'vue'
import { localSet } from '../utils'

const loginForm = ref(null)
const state = reactive({
    ruleForm: {
        username: '',
        password: ''
    },
    checked: true,
    rules: {
        username: [
            { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
            { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
    }
})
const submitForm = async () => {
    loginForm.value.validate((valid) => {
        if (valid) {
            console.log(state.ruleForm.username)
            axios.post('http://localhost:8083/user/login',state.ruleForm
            ).then(res => {
                localSet('token', res)
                //身份为管理员进入管理员主页面
                if(res.dname === 'manager'){
                    console.log(res.dname)
                    window.location.href = '/'
                }
                //


            })
                .catch(error => {
                    console.error('登录请求失败:', error)
                    console.error('登录请求失败:', state.ruleForm)
                })
        } else {
            console.log('error submit!!')
            return false;
        }
    })
}
</script>


<style scoped>
#paper {
    background:  url("../assets/login.png") no-repeat;
}
.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    //background-color: #fff;
}
.login-container {
    width: 420px;
    height: 480px;
    background-color: #fff;
    margin-top: 100px;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
}
.head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
}
.head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
}
.head .tips {
    font-size: 12px;
    color: #999;
}
.login-form {
    width: 70%;
    margin: 0 auto;
}

.form-spacing {
    height: 20px;
}

.register-link {
  text-align: center;
  margin-top: 15px;
}

.register-link a {
  color: #1BAEAE;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
