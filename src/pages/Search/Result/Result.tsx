import ArticleItem from '@/pages/Home/components/ArticleItem'
import { getSearchResult } from '@/store/actions/search'
import { RootState } from '@/types/store'
import { InfiniteScroll, NavBar } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import styles from './index.module.scss'
let page = 1
function Result() {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch<any>()
  // 获取通过url地址传入到搜索详情页的查询字符串参数
  const params = new URLSearchParams(location.search)
  const key= params.get('q')!
  // key变化时 发起请求
  useEffect(() => {
      dispatch(getSearchResult(key))
  }, [key])
  const { results } = useSelector((state: RootState) => state.search.result)
  // 是否有更多数据
  const [hasMore, setHasMore] = useState(true)
  // 加载状态
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (loading) return
    setLoading(true)
    try {
      await dispatch(getSearchResult(key, page))
      page = page + 1
    } finally {
      setLoading(false)
    }
    if (page > 5) {
      setHasMore(false)
    }
  }
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        {results.map((it, idx) => (
          <ArticleItem article={it} key={it.art_id}></ArticleItem>
        ))}
        {/* <div className="article-item">文章列表</div>
        <ArticleItem article={it} key={index}></ArticleItem> */}
      </div>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}
export default Result
