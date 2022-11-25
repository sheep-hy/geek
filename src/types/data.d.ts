export type LoginFrom = { mobile: string; code: string };

export type Token = {
  token: string;
  refresh_token: string;
};
// 泛型函数 接口 类
export interface ApiRsponse<T>{
    massage: string;
    data: T;
  };
  