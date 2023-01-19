import { Suggestion, SearchResult, SearchArticle } from '@/types/data'
import { SearchAction } from '@/types/store'

type state = {
  searchHistory: string[]
  suggestion: Suggestion
  result: SearchResult
}
const initialState: state = {
  searchHistory: ['javascript', 'js'],
  suggestion: [],
  result: {
    page: 1,
    per_page: 10,
    results: [],
    total_count: 0,
  },
  // result: {} as SearchResult,
}
const search = (state = initialState, action: SearchAction) => {
  if (action.type === 'search/suggestion') {
    return {
      ...state,
      suggestion: [
        'JAVA',
        'JAVA API的下载和中文查看API',
        'Java',
        'Java AES',
        'Java API',
      ],
    }
  } else if (action.type === 'search/history') {
    return { ...state, searchHistory: action.payload }
  } else if (action.type === 'search/result') {
    // return { ...state, result: action.payload }
    const old: SearchArticle[] = state.result.results||[]
    const { page, per_page, results, total_count } = action.payload
    return {
      ...state,
      result: {
        ...action.payload,
        results: [...old, ...results],
      },
    }
  }
  return state
}
export default search
