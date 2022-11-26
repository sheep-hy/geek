import { ApiRsponse, LoginFrom, Token } from '@/types/data.d'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'
import { setTokenInfo } from '@/utils/storage'
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
export const getCode = (mobile: string) => {
  return async () => {
    await request({
      url: '/sms/codes/' + mobile,
      method: 'get',
    })
    //
  }
}
