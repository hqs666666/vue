import axios from 'axios'
import store from '@/store'
import { getToken } from './auth'

const service = axios.create({
    baseURL:"http://localhost:5001/api",
    timeout:30000
})

//不拦截的页面
const paths = ''

//request 拦截器
service.interceptors.request.use(
    config => {
        if(paths.indexOf(config.url) < 0){ //需要拦截的页面
            let originalRequest = config;
            if(store.getters.token){
                if(new Date(store.getters.expried) < new Date()){
                    return store.dispatch("Refresh",{ token: store.getters.refreshToken })
                    .then(() => {
                        originalRequest.headers.common['Authorization'] = "Bearer " + getToken();
                        return originalRequest;
                    }).catch(err => {
                        console.log(err);
                    })
                }else{
                    config.headers.common['Authorization'] = "Bearer " + getToken();
                }
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
            return data.error;
        }
    },
    error => {
        if (error.response && error.response.status === 401) {
            this.$Message.error("授权失败");
            return;
        } else {
            this.$Message.error(error.message)
        }
    }
)

export default service;
