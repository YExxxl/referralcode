// 引入axios库
import axios from "axios";

// 创建一个axios实例，可以在这里配置一些全局的请求设置
const service = axios.create({
  baseURL: "https://api.example.com", // 你的API基础URL
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加token
    // config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么，比如处理错误码
    const res = response.data;
    if (res.code !== 200) {
      // 这里可以根据你的错误码做相应的处理
      console.error(`Error: ${res.message}`);
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    // 对响应错误做点什么
    console.error("response error:", error);
    return Promise.reject(error);
  }
);

// 导出HTTP方法
export const http = service;

// 具体的请求方法
export function get(url, params = {}) {
  return service.get(url, { params });
}

export function post(url, data = {}) {
  return service.post(url, data);
}
