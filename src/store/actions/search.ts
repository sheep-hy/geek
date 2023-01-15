import { ApiRsponse, Suggestion } from '@/types/data.d'
import {  RootThunkAction } from '@/types/store'
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
// 添加搜素记录
export const addHistory=(keyWord:string):RootThunkAction=>{
  return (dispatch,getState)=>{
    let oldHistory=getState().search.searchHistory
    oldHistory=oldHistory.filter(i=>i!==keyWord)
    const newHistory=[keyWord,...oldHistory]
    dispatch({
     type:'search/history',
     payload:newHistory
    })
  }

}
// 清空历史数据
export const delAllHistory=():RootThunkAction=>{
  return (dispatch)=>{
    dispatch({
     type:'search/history',
     payload:[]
    })
  }
}
// 搜索页面结果 
export const getSearchResult=(keyword:string):RootThunkAction=>{
  return async(dispatch)=>{
   // 后端返回的类型 <ApiRsponse<Token>
   const res = await request.get('/search', {
    params: {
      q: keyword,
    },
  })
  console.log(res, 'res-----search/result')
  dispatch({
    type: 'search/suggestion',
    payload: res.data.data.options,
  })
}
}

