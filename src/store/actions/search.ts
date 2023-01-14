import { ApiRsponse, Article, Suggestion } from '@/types/data.d'
import { LoginAction, RootThunkAction } from '@/types/store'
import request from '@/utils/request'

// 搜索 获取建议
export function getSuggests(keyword: string): RootThunkAction {
  return async (dispatch) => {
    // 后端返回的类型 <ApiRsponse<Token>
    const res = await request.get<ApiRsponse<{options:Suggestion}>>('/suggestion', {
      params: {
        q: keyword,
      },
    })
    console.log(res.data.data.options, 'res-----suggestion')
    dispatch({
      type: 'search/suggestion',
      payload: res.data.data.options,
    })
  }
}
