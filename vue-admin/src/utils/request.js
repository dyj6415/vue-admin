/**
 * 拦截器
 */

import axios from 'axios'
import { Message } from 'element-ui';

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : '/api';

const service = axios.create({
    baseURL: BASE_URL,
    // timeout: 1000
});

// console.log(process.env.VUE_APP_Title)

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    console.log(response);
    if(response.status === 200){
        Message({
            message: '请求成功！',
            type: 'success'
          });
    }else{
        Message.error('请求失败！');
    }
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default service;