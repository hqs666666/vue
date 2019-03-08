import Vue from 'vue'
import Vuex from 'vuex'
import {login,refreshToken} from "@/api/login"
import {setToken} from "@/utils/auth"

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{     //定义数据的结构个初始值
        user:{
            token:"",
            name:"",
            id:"",
            expried:"",
            refreshToken:"",
            nextRefreshMillisecond:1000 * 60 * 19,
        }
    },
    getters:{   //获取state的值，不做修改操作
        user(state){
            return state.user;
        }
    },
    mutations:{    //定义state的修改操作
        setUser(state,user){
            state.user = user;
            state.user.nextRefreshMillisecond = (user.expried.getTime() - new Date().getTime()) - 60 * 1000;
            if(state.user.nextRefreshMillisecond === undefined || state.user.nextRefreshMillisecond <= 0){
                state.user.nextRefreshMillisecond = 1000 * 60 *19;
            }
        }
    },
    actions:{   //提交状态，调用mutations修改state
        Login({commit},userInfo){
            return new Promise((resolve,reject) => {
                login(userInfo).then(response => {
                    if(response.hasOwnProperty("error")){
                        resolve(response);
                        return;
                    }
                    var json = getJson(response.access_token);

                    //获取过期时间
                    var exp = json.exp;
                    //转化为时间格式
                    var expDate = new Date(exp * 1000);
                    commit('setUser',{token:response.access_token,name:json.name,id:json.sub,expried:expDate,refreshToken:response.refresh_token});
                    //设置token
                    setToken(response.access_token);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        Refresh({commit},userInfo){
            return new Promise((resolve,reject) => {
                refreshToken(userInfo).then(response => {
                    if(response.hasOwnProperty("error")){
                        resolve(response);
                        return;
                    }
                    var json = getJson(response.access_token);

                    //获取过期时间
                    var exp = json.exp;
                    //转化为时间格式
                    var expDate = new Date(exp * 1000);
                    commit('setUser',{token:response.access_token,name:json.name,id:json.sub,expried:expDate,refreshToken:response.refresh_token});
                    //设置token
                    setToken(response.access_token);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            }) 
        }
    }
})

function getJson(str) {
    var Base64 = require("js-base64").Base64;
    var tokenArray = str.split('.');
    var decode = Base64.decode(tokenArray[1]);
    var json = JSON.parse(decode);
    return json;
}

export default store