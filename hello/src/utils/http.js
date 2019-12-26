import appsettings from '@/config.js';
import axios from "axios";
import cookieHelper from '@/utils/cookieHelper.js';
import { Message } from 'element-ui';

var instance = axios.create({
    baseURL: appsettings.baseUrl,
    timeout: 10000,
});

//请求拦截器
instance.interceptors.request.use(
    config => {
        var sessionId = cookieHelper.get(appsettings.cookieNames.sessionId);
        if(!sessionId) toLogin();
        var token = JSON.parse(sessionId).access_token;
        token && (config.headers.common['Authorization'] = "Bearer " + token);
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    })

// 响应拦截器
instance.interceptors.response.use(
    response => {
        var data = response.data;
        if (data.success) {
            return Promise.resolve(data.data);
        };
        showErrorMsg(data.message);
        return Promise.reject(data);
    },
    error => {
        let response = error.response;
        if (response && response.status) {
            switch (response.status) {
                // 401: 未登录
                case 401:
                    toLogin();
                    return;
                default:
                    showErrorMsg("系统错误：" + response.status);
                    break;
            }
        } else {
            console.log(error);
        }
        return Promise.reject(error)
    });

const showErrorMsg = (msg) => Message({ message: msg, type: 'error' });
const toLogin = () => window.location.href = appsettings.loginUrl;

export default instance