import Vue from 'vue'
import Vuex from 'vuex'
import {login,refreshToken} from "@/api/login"
import {setToken} from "@/utils/auth"

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        token:"",
        name:"",
        id:"",
        expried:"",
        refreshToken:""
    },
    getters:{
        token(state){
            return state.token;
        },
        name(state){
            return state.name;
        },
        id(state){
            return state.id;
        },
        expried(state){
            return state.expried;
        },
        refreshToken(state){
            return state.refreshToken;
        }
    },
    mutations:{
        SET_TOKEN(state,token){
            state.token = token;
        },
        SET_NAME(state,name){
            state.name = name;
        },
        SET_ID(state,id){
            state.id = id;
        },
        SET_EXPRIED(state,expried){
            state.expried = expried;
        },
        SET_REFRESHTOKEN(state,refreshToken){
            state.expried = refreshToken;
        }
    },
    actions:{
        Login({commit},userInfo){
            return new Promise((resolve,reject) => {
                login(userInfo).then(response => {
                    //解析token
                    var Base64 = require("js-base64").Base64;
                    var tokenArray = response.access_token.split('.');
                    var decode = Base64.decode(tokenArray[1]);
                    var json = JSON.parse(decode);

                    //获取过期时间
                    var exp = json.exp;
                    //转化为时间格式
                    var expDate = new Date(exp * 1000);
                    commit('SET_EXPRIED', expDate);
                    //赋值姓名
                    var name = json.name;
                    commit('SET_NAME', name);
                    var id = json.sub;
                    commit('SET_ID', id);
                    var refreshToken = json.refresh_token;
                    commit('SET_REFRESHTOKEN', refreshToken);
                    //设置token
                    setToken(response.access_token);
                    commit('SET_TOKEN', response.access_token);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        Refresh({commit},userInfo){
            return new Promise((resolve,reject) => {
                refreshToken(userInfo).then(response => {
                    //解析token
                    var Base64 = require("js-base64").Base64;
                    var tokenArray = response.access_token.split('.');
                    var decode = Base64.decode(tokenArray[1]);
                    var json = JSON.parse(decode);

                    //获取过期时间
                    var exp = json.exp;
                    //转化为时间格式
                    var expDate = new Date(exp * 1000);
                    commit('SET_EXPRIED', expDate);
                    var refreshToken = json.refresh_token;
                    commit('SET_REFRESHTOKEN', refreshToken);
                    //设置token
                    setToken(response.access_token);
                    commit('SET_TOKEN', response.access_token);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                })
            }) 
        }
    }
})

export default store