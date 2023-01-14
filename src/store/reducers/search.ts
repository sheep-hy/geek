import { Suggestion } from '@/types/data'
import { SearchAction } from '@/types/store'

type state = {
  suggestion: Suggestion
}
const initialState: state = {
  suggestion: [],
}
const search = (state = initialState, action: SearchAction) => {
  if (action.type === 'search/suggestion') {
    return { ...state, suggestion: ['JAVA','JAVA API的下载和中文查看API', 'Java','Java AES','Java API'] }
  }
  return state
}
export default search
