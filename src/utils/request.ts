import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

/**
 * 创建 Axios 实例
 */
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        // 禁止缓存
        config.headers['Cache-Control'] = 'no-cache';
        config.headers['Pragma'] = 'no-cache';
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const { code, msg, data } = response.data;
        if (code === 200) return data;
        // 如果没有code，可能是直接返回数据（根据后端约定调整）
        // 这里假设后端必须返回 {code, msg, data} 格式。
        // 如果是二进制流或者其他格式，需特殊处理。
        ElMessage.error(msg || '系统出错');
        return Promise.reject(new Error(msg || 'Error'));
    },
    (error) => {
        ElMessage.error(error.message || '网络异常');
        return Promise.reject(error);
    }
);

export default service;
