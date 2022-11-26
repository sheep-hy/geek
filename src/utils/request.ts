// 对axios进行封装
// 1. 基地址
// 2. 请求拦截器
// 3.响应拦截器
import axios, { AxiosError } from 'axios'
import { getTokenInfo, hasToken } from './storage'
const baseURL = 'http://geek.itheima.net/v1_0/'
const instance = axios.create({
  timeout: 5000,
  baseURL,
})

// 配置拦截器
instance.interceptors.request.use(
  (config) => {
    // 对config做点什么
    // 获取token
    const token = getTokenInfo().token
    if (token) {
      config.headers!.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error: AxiosError<{ message: string }>) => {
    // 对错误做点什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 在响应数据之前做些什么
    return response
  },
  // 在响应错误之前做些什么
  (error) => {
    return Promise.reject(error)
  }
)
export default instance
