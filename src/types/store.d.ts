// 存放跟 redux 相关的类型
import { ThunkAction } from 'redux-thunk'
import store from '@/store'
import { Token, User, ChannelList, EditUser, Channel } from './data.t'

// redux 状态的类型
export type RootState = ReturnType<typeof store.getState>

// redux dispatch的类型
// export type RootDispatch = typeof store.dispatch;
// 登录相关的
export type LoginAction =
  | { type: 'login/token'; payload: Token }
  | { type: 'login/quit' }
// 个人中心相关的
export type ProfileAction =
  | { type: 'profile/user'; payload: User }
  | { type: 'profile/editUser'; payload: EditUser }
// 首页相关的
export type ChannelAction = { type: 'channel/getChannel'; payload: Channel[] }

export type RootAction = LoginAction | ProfileAction | ChannelAction

// 类型参数1：ReturnType 用于指定函数的返回值类型 void
// 类型参数2： 指定RootState的类型
// 类型参数3： 指定额外的参数类型，一般为unkonwn或者any
// 类型参数4： 用于指定dispatch的Action类型
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
