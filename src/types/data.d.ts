export type LoginFrom = { mobile: string; code: string }

export type Token = {
  token: string;
  refresh_token: string;
}
// 泛型函数 接口 类
export interface ApiRsponse<T> {
  massage: string;
  data: T;
}
export type user = {
  id: string;
  name: string;
  photo: string;
  intro: string;
  art_count: number;
  follow_count: number;
  fans_count: number;
  like_count: number;
}
export type editUser = {
  id: string;
  photo: string;
  name: string;
  mobile: string;
  gender: null;
  birthday: string;
  intro: string;
}

