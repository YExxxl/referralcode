// utils/http.ts

// 定义基础响应数据结构
interface BaseResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 扩展请求配置
interface CustomRequestConfig {
  headers?: Record<string, string>;
  [key: string]: any;
}

// 定义HTTP方法接口
export interface IHttpClient {
  get<T = any>(url: string, params?: Record<string, any>, config?: CustomRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: Record<string, any>, config?: CustomRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: Record<string, any>, config?: CustomRequestConfig): Promise<T>;
  delete<T = any>(url: string, params?: Record<string, any>, config?: CustomRequestConfig): Promise<T>;
}

// 基础请求方法
const request = <T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  config?: CustomRequestConfig
): Promise<T> => {
  return new Promise((resolve, reject) => {
    // 获取token
    const token = wx.getStorageSync('token') || '';
    
    // 合并headers
    const headers = {
      'Content-Type': 'application/json',
      'token': token,
      ...config?.headers
    };

    wx.request({
      url: `http://119.29.119.100:8083${url}`,
      method: method,
      data: method === 'GET' ? undefined : data,
      header: headers,
      success: (res) => {
        const response = res.data as BaseResponse<T>;
        if (response.code === 200) {
          resolve(response.data);
        } else {
          console.error(`Error ${response.code}: ${response.message}`);
          wx.showToast({
            title: response.message || '请求失败',
            icon: 'none'
          });
          reject(new Error(response.message));
        }
      },
      fail: (err) => {
        console.error('Request failed:', err);
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
};

// 实现HTTP方法
export const http: IHttpClient = {
  get: <T = any>(url: string, params?: Record<string, any>, config?: CustomRequestConfig) => {
    // 处理GET请求的查询参数
    const query = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return request<T>('GET', `${url}${query}`, undefined, config);
  },

  post: <T = any>(url: string, data?: Record<string, any>, config?: CustomRequestConfig) => {
    return request<T>('POST', url, data, config);
  },

  put: <T = any>(url: string, data?: Record<string, any>, config?: CustomRequestConfig) => {
    return request<T>('PUT', url, data, config);
  },

  delete: <T = any>(url: string, params?: Record<string, any>, config?: CustomRequestConfig) => {
    // 处理DELETE请求的查询参数
    const query = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return request<T>('DELETE', `${url}${query}`, undefined, config);
  },
};