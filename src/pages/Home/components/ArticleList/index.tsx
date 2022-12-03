import { RootState } from '@/store'
import { getArticleList, getNewArticleList } from '@/store/actions/article'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleItem from '../ArticleItem'
import styles from './index.module.scss'
type props = {
  channelId: string
}
export default function ArticleList({ channelId }: props) {
  const dispatch = useDispatch<any>()
  const res = useSelector((state: RootState) => state.article.list[channelId])
  const { articles = [], timestamp } = res || {}
  console.log(channelId, articles, timestamp, '-----------articles')
  // 因为第一次进入页面 无线加载请求就已经拿到数据了
  // useEffect(() => {
  //   dispatch(getArticleList(channelId, Date.now()))
  // }, [])
  const [hasMore, setHasMore] = useState(true)
  const loadMore = async () => {
    // console.log('拉取更多的数据')
    // 需要把当前的事件戳传过去 +把字符串转number
    await dispatch(
      getArticleList(channelId, timestamp ? +timestamp : Date.now())
    )
    console.log('获取更多的数据回来了')
  }
  const onRefresh = async () => {
    console.log('拿新的数据')
    await dispatch(getNewArticleList(channelId, Date.now()))
  }
  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
        <div className="article-item">
          {articles.length &&
            articles.map((it, index) => {
              return <ArticleItem article={it} key={index}></ArticleItem>
            })}
          {/* <ArticleItem></ArticleItem> */}
        </div>
      </PullToRefresh>
      <InfiniteScroll loadMore={loadMore} hasMore={articles.length < 50} />
    </div>
  )
}
