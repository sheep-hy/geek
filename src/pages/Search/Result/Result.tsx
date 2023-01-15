import ArticleItem from '@/pages/Home/components/ArticleItem'
import { getSearchResult } from '@/store/actions/search'
import { RootState } from '@/types/store'
import { NavBar } from 'antd-mobile'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import styles from './index.module.scss'

function Result() {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch<any>()
  // 获取通过url地址传入到搜索详情页的查询字符串参数
  const params = new URLSearchParams(location.search)
  const key = params.get('q')
  // key变化时 发起请求
  useEffect(() => {
    if (key) {
      dispatch(getSearchResult(key))
    }
  }, [key])
  const { results } = useSelector((state: RootState) => state.search.result)
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        {
          results.map((it,idx)=>(
          <ArticleItem article={it} key={it.art_id}></ArticleItem>
          ))
        }
        {/* <div className="article-item">文章列表</div>
        <ArticleItem article={it} key={index}></ArticleItem> */}
      </div>
    </div>
  )
}
export default Result
