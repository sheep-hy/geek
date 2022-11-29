import { ApiRsponse, LoginFrom, Token } from '@/types/data.d'
import { LoginAction, RootThunkAction } from '@/types/store'
import request from '@/utils/request'
import { removeTokenInfo, setTokenInfo } from '@/utils/storage'
// 登录
export function login(value: LoginFrom): RootThunkAction {
  return async (dispatch) => {
    // 后端返回的类型 <ApiRsponse<Token>
    const res = await request.post<ApiRsponse<Token>>('/authorizations', value)
    console.log(res, 'token')
    // 发请求
    // 保存token
    dispatch({
      type: 'login/token',
      payload: res.data.data,
    })
    // 本地持久化
    setTokenInfo(res.data.data)
  }
}
export function saveToken(value: Token): LoginAction {
  setTokenInfo(value)
  return {
    type: 'login/token',
    payload: value,
  }
}
// 退出
export const logout = (): LoginAction => {
  //1, 清空token
  // 2，清空redux
  removeTokenInfo()
  return {
    type: 'login/quit',
  }
}
export const getCode = (mobile: string) => {
  return async () => {
    await request({
      url: '/sms/codes/' + mobile,
      method: 'get',
    })
    //
  }
}
