<template>
  <div id="login">
    <div class="login-wrap">
        <ul class="menu-tab">
            <li v-for="(item,index) in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">
                {{item.txt}}<span v-if='index==1'>111</span>
            </li>
        </ul>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="medium" class="login-Form">
        <el-form-item prop="username" class="item-form">
            <label for='username'>邮箱</label>
            <el-input id='username' v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
            <label>密码</label>
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
            <label>验证码</label>
            <el-row :gutter="11">
                <el-col :span="15"><el-input v-model.number="ruleForm.code"></el-input></el-col>
                <el-col :span="9"><el-button class="block-btn" type="success" @click="getsms()">获取验证码</el-button></el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" class="block-btn submit-btn" @click="submitForm('ruleForm')" :disabled="test ==='login'">{{ test ==='login' ? '登录' : '注册'}}</el-button>
        </el-form-item>
        </el-form>
    </div>
    <div v-if='ceshi == 1'>111</div>
    <div v-else-if='ceshi == 2'>222</div>
    <div v-else>333</div>
  </div>
  
</template>
<script>
import { stripscript,stripscriptnew } from '@/utils/validate.js';
import { GetSms } from '@/api/login.js';
import { reactive ,ref, toRefs, onMounted  } from '@vue/composition-api'
// import axios from 'axios'

export default {
  name: 'login',
  setup(props,{refs,root}) {
      let ceshi = ref(2)
        var checkCode = (rule, value, callback) => {
        ruleForm.code = stripscript(value);
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else{
            callback();
        }
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字验证码'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('验证码错误'));
        //     } else {
        //       callback();
        //     }
        //   }
        // }, 1000);
      }
      var validateUsername = (rule, value, callback) => {
          console.log(value);
        ruleForm.username = stripscriptnew(value);
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (ruleForm.checkPass !== '') {
            refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        ruleForm.password = stripscript(value);
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      }
      const test = ref('login')
      const menuTab= reactive([
              {txt:'登录', current:true, type:'login'},
              {txt:'注册', current:false, type:'register'}
          ]);
          const ruleForm = reactive( {
          username: '',
          password: '',
          code: ''
        })
        const rules = reactive({
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          code: [
            { validator: checkCode, trigger: 'blur' }
          ]
        })
      onMounted(() => {
        
      })
      const toggleMenu = (data => {
        menuTab.forEach(element => {
              element.current = false;
        });
        data.current = true;
        test.value = data.type;
      })
      /**
       * 获取验证码
       */
      const getsms = (() => {
        //   if(ruleForm.username === ''){
        //       alert('xx');
        //       root.$message.error('邮箱不能为空，请输入邮箱信息！');
        //       return false;
        //   }
          let data = {
              test : ruleForm.username
          };
          GetSms(data).then(response =>{
              let res = response.data;
              console.log(response);
              console.log(res);
          }).catch(error =>{
              console.log('error:'+error);
          })
      })
      /**
       * 提交表单
       */
      const submitForm = (formName => {
          // 为给定 ID 的 user 创建请求
        // axios// 发送 POST 请求
        alert('111');
        // axios.request({
        //     method: 'get',
        //     url: '/user/12345',
        //     data: {
        //         firstName: 'Fred',
        //         lastName: 'Flintstone'
        //     }
        // })
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
        // context.refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      })
      const resetForm = (formName=> {
        refs[formName].resetFields();
      })
    return {
        menuTab,
        test,
        ruleForm,
        rules,
        toggleMenu,
        resetForm,
        getsms,
        submitForm,
        ceshi
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
