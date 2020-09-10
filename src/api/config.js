//导入axios
import axios from 'axios';
import router from '../router/router';
import {Toast} from 'vant';
import store from '../store/carStore';
import { sleep } from "@/util/tool.js";


// 配置请求的基准URL地址
const instance = axios.create({
    baseURL:'http://api.w0824.com/api'
})

// 添加请求拦截器
instance.interceptors.request.use(async function (config) {
    // 在发送请求之前做些什么

    var token = localStorage.getItem('token') || '';
    token && ( config.headers.token = token )

    //开启loading，为false则修改为true
    !store.state.isPending && store.commit('changeIsPending',true);
    //延迟0.8秒
    await sleep(800);

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    store.commit('changeIsPending',false)

    return response.data;
}, function (error) {

    //对响应错误做点什么
    var status = error.response.status;
    var message = error.response.data.message;
    switch (status) {
        case 401:
            Toast('用户信息过期，请重新登录');
            router.push('/login');
            break;
        default:
            Toast('网络错误，请稍后再试');
            break;
    }

    // 对响应错误做点什么
    // return Promise.reject(error);
});

export default instance;
