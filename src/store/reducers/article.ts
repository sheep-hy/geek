import { Article, ArticleDetial } from '@/types/data'
import { ArticleAction } from '@/types/store'

type state = {
  list: {
    [key: string]: {
      timestamp: string
      articles: Article[]
    }
  }
  detail: ArticleDetial
}

const initialState: state = {
  list: {},
  detail: {},
} as state
const article = (state = initialState, action: ArticleAction) => {
  if (action.type === 'article/getAriticleList') {
    const { channelId, articles, timestamp } = action.payload
    let oldArticle: Article[] = []
    if (state.list[channelId]) {
      oldArticle = state.list[channelId].articles
    }

    return {
      ...state,
      list: {
        [channelId]: { articles: [...oldArticle, ...articles], timestamp },
      },
    }
  } else if (action.type === 'article/getNewAriticleList') {
    const { channelId, articles, timestamp } = action.payload
    let oldArticle: Article[] = []
    if (state.list[channelId]) {
      oldArticle = state.list[channelId].articles
    }

    return {
      ...state,
      list: {
        [channelId]: { articles: [...articles, ...oldArticle], timestamp },
      },
    }
  } else if (action.type === 'article/getArticleById') {
    console.log(action, 199999999999)
    return { ...state, detail: action.payload }
  }
  return state
}
export default article
