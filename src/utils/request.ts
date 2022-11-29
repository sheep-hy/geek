// 对axios进行封装
// 1. 基地址
// 2. 请求拦截器
// 3.响应拦截器
import store from '@/store'
import { saveToken } from '@/store/actions/login'
import { Toast } from 'antd-mobile'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import history from './history'
import { getTokenInfo, removeTokenInfo } from './storage'
const baseURL = 'http://geek.itheima.net/v1_0/'

// const history = useHistory() useuseHistory是一个hooks不能在普通函数中使用 中能在函数组件或自定义hooks使用
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
  // AxiosError<类型参数> 类型参数用于指定 data的类型
  async (error: AxiosError<{ message: string }>) => {
    // 如果因为网络原因，response没有，给提示消息
    if (!error.response) {
      Toast.show('网络繁忙，请稍后重试')
      return Promise.reject(error)
    }
    console.log(error, 'response响应的错误数据')
    const { response, config } = error
    // 网络没问题，有response 状态码不是401
    if (response.status !== 401) {
      // 不是token失效的问题
      Toast.show(response.data.message)
      return Promise.reject(error)
    }

    // 网络没问题，且是401 token失效的问题
    // 1. 判断有没有刷新token
    const { refresh_token } = getTokenInfo()
    if (!refresh_token) {
      // 清空token
      removeTokenInfo()
      // 跳转到登录页
      // window.location.href = '/login'
      history.replace({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        },
      })
      return Promise.reject(error)
    }
    try {
      if (refresh_token) {
        // 有token 1.用refresh_token请求新的token  3 重新发送请求
        const res = await axios.put(baseURL + 'authorizations', null, {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        })
        console.log('新的token', res.data.data.token)
        // 2保存新token
        store.dispatch(saveToken({ refresh_token, token: res.data.data.token }))
        // 3 重新发送请求
        // token刷新成功后，重新把最开始失败的请求重新发一次
        //  AxiosRequestConfig
        return instance(config as AxiosRequestConfig)
      }
    } catch {
      // 清空token
      removeTokenInfo()
      // 跳转到登录页
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        },
      })
      return Promise.reject(error)
    }
  }
)
export default instance
