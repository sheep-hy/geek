// 存放跟 redux 相关的类型
import { ThunkAction } from 'redux-thunk'
import store from '@/store'
import { Token, User, ChannelList, EditUser, Channel } from './data.t'
import { Article, ArticleDetial, Suggestion, SearchResult } from './data'

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
// 频道相关的action
export type ChannelAction =
  | { type: 'channel/getChannel'; payload: Channel[] }
  | { type: 'channel/activeChannel'; id: string }
  | { type: 'channel/saveAllChannels'; payload: Channel[] }
export type ArticleAction =
  | {
      type: 'article/getAriticleList'
      payload: { channelId: string; articles: Article[]; timestamp: string }
    }
  | {
      type: 'article/getNewAriticleList'
      payload: { channelId: string; articles: Article[]; timestamp: string }
    }
  | {
      type: 'article/getArticleById'
      payload: ArticleDetial
    }

export type SearchAction =
  | { type: 'search/suggestion'; payload: Suggestion }
  | { type: 'search/history'; payload: string[] }
  | { type: 'search/result'; payload: SearchResult }

export type RootAction =
  | LoginAction
  | ProfileAction
  | ChannelAction
  | AriticleAction
  | SearchAction

// 类型参数1：ReturnType 用于指定函数的返回值类型 void
// 类型参数2： 指定RootState的类型
// 类型参数3： 指定额外的参数类型，一般为unkonwn或者any
// 类型参数4： 用于指定dispatch的Action类型
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
