import { Suggestion } from '@/types/data'
import { SearchAction } from '@/types/store'

type state = {
  searchHistory: string[]
  suggestion: Suggestion
}
const initialState: state = {
  searchHistory: ['javascript', 'js'],
  suggestion: [],
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
  }
  return state
}
export default search
