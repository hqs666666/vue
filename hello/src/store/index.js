import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/utils/api.js'
import cookieHelper from '@/utils/cookieHelper.js';
import appsettings from '@/config.js';

Vue.use(Vuex)
//状态管理，用于存储全局变量
const store = new Vuex.Store({
    //参数
    state: {
        token: '',
        refreshToken: '',
        expireIn: 0,
    },
    //get方法
    getters: {
        getToken: (state) => state.token,
        getRefreshToken: (state) => state.refreshToken,
        getExpireIn: (state) => state.expireIn,
    },
    //set方法,对数据的同步更改,使用commit调用
    mutations: {
        setToken: (state, value) => state.token = value,
        setRefreshToken: (state, value) => state.refreshToken = value,
        setExpireIn: (state, value) => state.expireIn = value,
    },
    //对数据的异步更改,使用dispatch调用
    actions: {
        login({ commit }) {
            const sessionId = cookieHelper.get(appsettings.cookieNames.sessionId);
            if (!sessionId) window.location.href = appsettings.loginUrl;
            var data = JSON.parse(sessionId);
            commit('setToken', data.access_token);
            commit('setRefreshToken', data.refresh_token);
            commit('setExpireIn', data.expires_in);
        },
        loginOut({ commit }) {
            commit('setToken', '');
            commit('setRefreshToken', '');
            commit('setExpireIn', 0);
            localStorage.removeItem("store");
            cookieHelper.clearAll();
        },
        refreshToken({ commit }) {
            return new Promise((resolve) => {
                var formData = new FormData();
                formData.append('refreshToken', store.state.refreshToken);
                api.post('/oauth/refresh_token', formData).then(data => {
                    if (data) {
                        commit('setToken', data.access_token);
                        commit('setRefreshToken', data.refresh_token);
                        commit('setExpireIn', data.expires_in);
                        cookieHelper.remove(appsettings.cookieNames.sessionId);
                        cookieHelper.set(appsettings.cookieNames.sessionId, data, data.expires_in);
                        localStorage.setItem("store", JSON.stringify(store.state));
                    }
                });
                resolve();
            })
        }
    }
});

export default store;