import axios from 'axios'
import store from '@/store'
import { getToken } from './auth'
import { apiSetting } from '@/config'
import { md5 } from '@/utils/secret'

const service = axios.create({
    baseURL: apiSetting.baseUrl,
    timeout: apiSetting.timeout,
})

//不拦截的页面
const paths = apiSetting.notFilterPaths;

//request 拦截器
service.interceptors.request.use(
    config => {
        setHeaders(config);
        if(paths.indexOf(config.url) < 0){ //需要拦截的页面
            if(getToken()){
                config.headers.common['Authorization'] = "Bearer " + getToken();
            }
            return config;
        }else{  //不需要拦截的页面
            return config;
        }
    },
    error => {  
        console.log(error);
    }
)

//response拦截器
service.interceptors.response.use(
    response => {
        var data = response.data;
        if(response.status === 200){
            return data;
        }else{
            return data;
        }
    },
    error => {
        if (error.response && error.response.status === 401) {
            return error.data;
        } else {
            return error.data;
        }
    }
)

function setHeaders(config){
    var nonce = generateNonce(45);
    var stamp = new Date().getTime();
    config.headers['X-Ca-Key'] = apiSetting.clientId;
    config.headers['X-Ca-Nonce'] = nonce;
    config.headers['X-Ca-Timestamp'] = stamp;
    config.headers['X-Ca-Signature'] = generateSignature(config);
}

function generateSignature(config){
    var data = {};
    if(config.method !== 'get'){
        data = eval(config.data)
    }else{
        data = eval(config.params)
    }
    var json = objectSort(data);
    var jsonStr = JSON.stringify(json);
    var signature = md5(jsonStr).toUpperCase();
    return signature;
}

function generateNonce(length){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$^&*";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function objectSort(arys){
    var newkey = Object.keys(arys).sort();
    var newObj = {};
    for(var i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj[newkey[i]] = arys[newkey[i]]; 
        //向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;
}

export default service;
