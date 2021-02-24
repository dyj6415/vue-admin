<template>
  <div id="login">
    <div class="login-wrap">
        <ul class="menu-tab">
            <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
        </ul>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="medium" class="login-Form">
        <el-form-item prop="username" class="item-form">
            <label>邮箱</label>
            <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
            <label>密码</label>
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
            <label>验证码</label>
            <el-row :gutter="11">
                <el-col :span="15"><el-input v-model.number="ruleForm.code"></el-input></el-col>
                <el-col :span="9"><el-button class="block-btn" type="success" @click="resetForm('ruleForm')">获取验证码</el-button></el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" class="block-btn submit-btn" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import { stripscript } from '@/utils/validate.js';
export default {
  name: 'login',
  data(){
      var checkCode = (rule, value, callback) => {
        this.ruleForm.code = stripscript(value);
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字验证码'));
          } else {
            if (value < 18) {
              callback(new Error('验证码错误'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validateUsername = (rule, value, callback) => {
        this.ruleForm.username = stripscript(value);
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        this.ruleForm.password = stripscript(value);
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
          menuTab: [
              {txt:'登录', current:true},
              {txt:'注册', current:false}
          ],
          ruleForm: {
          username: '',
          password: '',
          code: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          code: [
            { validator: checkCode, trigger: 'blur' }
          ]
        }
      };
  },
  mounted(){
    //   this.menuTab.forEach(element => {
    //       console.log(element.txt);
    //   });
  },
  methods: {
      toggleMenu(data){
        this.menuTab.forEach(element => {
              element.current = false;
        });
        data.current = true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>
<style lang="scss" scoped>
#login {
    height: 100vh;
    background-color: #344A5E;
}
.login-wrap {
    width: 300px;
    margin: auto;
}
.menu-tab {
    text-align: center;
    li {
        display: inline-block;
        width: 80px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2;
        cursor: pointer;
    }
}
.current {
    background-color: rgba(0,0,0,.1);
}
.block-btn {
    width: 100%;
    display: block;
}
.item-form {
    color: #fff;
    margin-bottom: 3px;
    margin-top: 19px;
    font-size: 14px;
}
.submit-btn {
    margin-top: 19px;
}
</style>
