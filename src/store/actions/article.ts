import { ApiRsponse, Article, ArticleDetial, LoginFrom, Token } from '@/types/data.d'
import { LoginAction, RootThunkAction } from '@/types/store'
import request from '@/utils/request'
import { removeTokenInfo, setTokenInfo } from '@/utils/storage'

export function getArticleList(
  channelId: string,
  timestamp: number
): RootThunkAction {
  return async (dispatch) => {
    // 后端返回的类型 <ApiRsponse<Token>
    const res = await request.get<
      ApiRsponse<{ results: Article[]; pre_timestamp: string }>
    >('/articles', {
      params: {
        channel_id: channelId,
        timestamp,
      },
    })
    console.log(res, 'res-----article')
    dispatch({
      type: 'article/getAriticleList',
      payload: {
        channelId,
        timestamp: res.data.data.pre_timestamp,
        articles: res.data.data.results,
      },
    })
  }
}
export function getNewArticleList(
  channelId: string,
  timestamp: number
): RootThunkAction {
  return async (dispatch) => {
    // 后端返回的类型 <ApiRsponse<Token>
    const res = await request.get<
      ApiRsponse<{ results: Article[]; pre_timestamp: string }>
    >('/articles', {
      params: {
        channel_id: channelId,
        timestamp,
      },
    })
    dispatch({
      type: 'article/getNewAriticleList',
      payload: {
        channelId,
        timestamp: res.data.data.pre_timestamp,
        articles: res.data.data.results,
      },
    })
  }
}
export function getArticleById(id: string): RootThunkAction {
  return async (dispatch) => {
    // 后端返回的类型 <ApiRsponse<Token>
    const res = await request.get<ApiRsponse<ArticleDetial>>('/articles/' + id)
    console.log(res.data.data, '----------详情页面')
    dispatch({
      type: 'article/getArticleById',
      payload: res.data.data,
    })
  }
}
// 点赞
export function likeAritcle(id: string, attitude: number): RootThunkAction {
  return async (dispatch) => {
    if (attitude === 1) {
      // 取消点赞
      await request.delete('/article/likings/' + id)
    } else {
      // 点赞
      await request.post('/article/likings', { target: id })
    }
    // 更新
    await dispatch(getArticleById(id))
  }
}

// 收藏
export function collectArticle(
  id: string,
  is_collected: boolean
): RootThunkAction {
  return async (dispatch) => {
    if (is_collected) {
      // 取消收藏
      await request.delete('/article/collections/' + id)
    } else {
      // 收藏
      await request.post('/article/collections', {
        target: id,
      })
    }
    await dispatch(getArticleById(id))
  }
}