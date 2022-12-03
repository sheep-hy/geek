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
//文章列表数据
export type Article = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top: number
  cover: {
    type: number
    images: string[]
  }
}
export type ArticleDetial={
  art_id: string;
  title: string;
  pubdate: string;
  aut_id: string;
  content: string;
  aut_name: string;
  aut_photo: string;
  is_followed: boolean;
  is_collected: boolean;
  attitude: number;
  comm_count: number;
  read_count: number;
  like_count: number;
}
