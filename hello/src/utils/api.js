import axios from '@/utils/http.js'

const api = {
    get: function (url, params) {
        return axios.get(url, { params: params })
    },
    post: function (url, form) {
        return axios.post(url, form);
    },
}

export default api;