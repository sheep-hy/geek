import { ApiRsponse, EditUser, User } from '@/types/data.d'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'
// 获取个人信息展示
export function getUserInfo(): RootThunkAction {
  return async (dispatch) => {
    // 后端返回的类型 <ApiRsponse<Token>
    const res = await request.get<ApiRsponse<User>>('/user')
    // if (!res) return
    console.log(res, 'user')
    dispatch({
      type: 'profile/user',
      payload: res.data.data,
    })
  }
}
// 修改个人信息展示
export function editUserInfo(): RootThunkAction {
  return async (dispatch) => {
    // 后端返回的类型 <ApiRsponse<Token>
    // const res = await request.get<ApiRsponse<any>>('/user')
    const res = await request.get<ApiRsponse<EditUser>>('/user/profile')
    console.log(res, 'profile/edit')
    dispatch({
      type: 'profile/editUser',
      payload: res.data.data,
    })
  }
}
// 名称和简介修改
export function getUserProfile(type: string, value: string): RootThunkAction {
  return async (dispatch) => {
    // 后端返回的类型 <ApiRsponse<Token>
    const res = await request.patch<ApiRsponse<EditUser>>('/user/profile', {
      [type]: value,
    })
    // 修改成功 直接调个人信息接口
    dispatch(editUserInfo())
  }
}
