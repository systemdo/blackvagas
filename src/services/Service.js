import axios from 'axios';
import AuthManagerUtil from '../utils/AuthManagerUtil';

   const api = axios.create({
    baseURL: 'https://api-iddog.idwall.co'
})

api.interceptors.request.use(async (config) => {
    if (!config.url.endsWith('signup')) {
        const token = AuthManagerUtil.getAuthToken();
        config.headers.Authorization = `Bearer ${token}`;
        //config.headers['Content-Type'] = 'application/json';
    
    }
    return config;
},(error) => {
    return Promise.reject(error);
});

export default api;
