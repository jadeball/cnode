import axios from 'axios';
import userSvc from '../service/user';
axios.defaults.baseURL = 'https://cnodejs.org/api/v1/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(config => {
    let accessToken = userSvc.getAccessToken();
    if (accessToken) {
        if (config.method == "get") {
            if (config.url.endsWith("?")) {
                config.url += `&accesstoken=${accessToken}`;
            } else {
                config.url += `?accesstoken=${accessToken}`;
            }
        }
    }
    return config;
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response.data;
}, error => {})

export default axios;