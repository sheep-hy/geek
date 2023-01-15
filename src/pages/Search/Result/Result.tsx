import { getSearchResult } from '@/store/actions/search'
import { NavBar } from 'antd-mobile'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        <div className="article-item">文章列表</div>
      </div>
    </div>
  )
}
export default Result
