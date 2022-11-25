// 对axios进行封装
// 1. 基地址
// 2. 请求拦截器
// 3.响应拦截器
import axios from 'axios'
import { getTokenInfo, hasToken } from './storage'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (hasToken()) {
      // if (config.headers) {
      //   config.headers.Authorzation = 'Bearer' + getTokenInfo().Token
      // }
      // 非空断言
      config.headers!.Authorzation = 'Bearer' + getTokenInfo().Token
    }
    return config
  },
  function (error) {
    // 在请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 在响应数据之前做些什么
    return response
  },
  // 在响应错误之前做些什么
  (error) => {
    return Promise.reject(error)
  }
)
export default request
