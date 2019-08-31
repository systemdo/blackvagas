import axios from 'axios';
import AuthManagerUtil from '../utils/AuthManagerUtil';

const Service = axios.create({
    baseURL: 'https://blackvagasapi.herokuapp.com/api/v1/'
})

Service.interceptors.request.use(async (config) => {
    if (!config.url.endsWith('signup')) {
        //const token = AuthManagerUtil.getAuthToken();
        config.headers['Content-Type'] ='application/json';
       // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(error) => {
    return Promise.reject(error);
});

export default Service;
