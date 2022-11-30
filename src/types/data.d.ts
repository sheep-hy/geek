export type LoginFrom = { mobile: string; code: string }

export type Token = {
  token: string
  refresh_token: string
}
// 泛型函数 接口 类
export interface ApiRsponse<T> {
  massage: string
  data: T
}
export type User = {
  id: string
  name: string
  photo: string
  intro: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}
export type EditUser = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: null
  birthday: string
  intro: string
}
// 首页频道列表数据
export type Channel = {
  id: number
  name: string
}
export type ChannelList = Channel[]
