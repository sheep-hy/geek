import { NavBar, InfiniteScroll } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/Icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'

import { useEffect, useRef, useState } from 'react'
// 使用dompurify 防止XSS攻击
import * as DOMPurify from 'dompurify'
import hljs from 'highlight.js'
// highlightElement(DOM) 就可以让代码高亮
import 'highlight.js/styles/github-dark.css'
import { getArticleById } from '@/store/actions/article'
import { RootState, RootThunkAction } from '@/types/store'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '@/assets/img/yjx.jpg'
import { config } from 'antd-mobile/es/components/toast/methods'

const Article = () => {
  const history = useHistory()
  const params = useParams<{ id: string }>()
  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(getArticleById(params.id))
  }, [dispatch])
  const detail = useSelector((state: RootState) => state.article.detail)

  const loadMoreComments = async () => {
    console.log('加载更多评论')
  }

  useEffect(() => {
    const dgHtmlDOM = document.querySelector('.dg-html')
    if (!dgHtmlDOM) return

    // 忽略警告 忽略未经转义的HTML字符
    hljs.configure({
      ignoreUnescapedHTML: true,
    })

    // 1 获取 pre code 标签
    const codes = dgHtmlDOM.querySelectorAll<HTMLElement>('pre code')
    if (codes.length > 0) {
      codes.forEach((code) => {
        // 让code进行高亮
        hljs.highlightElement(code)
      })
      return
    }

    // 2 获取 pre 标签
    const pres = dgHtmlDOM.querySelectorAll('pre')
    pres.forEach((pre) => {
      hljs.highlightElement(pre)
    })
  }, [detail])

  const [showAuthor, setShowAuthor] = useState(false)
  // 监听 作者dom 距离顶部的距离
  // <50px 设置为setShowAuthor(true)
  // 1. 添加滚动条事件监听
  // 2. 在回调中， 获取作者dom 距离顶部的距离 判断是否小于50px
  const refAuthor = useRef<HTMLDivElement>(null)
  const refWrapper = useRef<HTMLDivElement>(null)
  //.有第二个参数但数组为空，则副作用仅在组件挂载和卸载时执行。useEffect( ()=>{doSomeThing}, [])
  useEffect(() => {
    const onScroll = () => {
      const rect = refAuthor.current?.getBoundingClientRect()
      console.log(rect, 'scroll')
      if (rect!.top < 10) {
        setShowAuthor(true)
      } else {
        setShowAuthor(false)
      }
    }
    // 找到wrapper元素，添加Scroll事件监听
    refWrapper.current?.addEventListener('scroll', onScroll)
    return () => {
      // 找到wrapper元素，移除Scroll事件监听
      refWrapper.current?.removeEventListener('scroll', onScroll)
    }
  }, [])
  const renderArticle = () => {
    // 文章详情
    return (
      <div ref={refWrapper} className="wrapper">
        {/* onScroll={() => {
          const rect = refAuthor.current?.getBoundingClientRect()
          console.log(rect, 'scroll')
          if (rect!.top < 10) {
            setShowAuthor(true)
          } else {
            setShowAuthor(false)
          }
        }} */}
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{detail.title}</h1>

            <div className="info">
              <span>{detail.pubdate}</span>
              <span>{detail.read_count} 阅读</span>
              <span>{detail.comm_count} 评论</span>
            </div>
            <div className="author" ref={refAuthor}>
              <img src={detail.aut_photo || avatar} alt="" />
              <span className="name">{detail.aut_name}</span>
              <span
                className={classNames(
                  'follow',
                  detail.is_followed ? 'followed' : ''
                )}
              >
                {detail.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          </div>
          <div className="content">
            {/* // 使用这个 有风险 xss攻击 */}
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(detail.content),
              }}
            ></div>
            <div className="date">发布文章时间：{detail.pubdate}</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（{detail.comm_count}）</span>
            <span>{detail.like_count} 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll hasMore={false} loadMore={loadMoreComments} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {showAuthor && (
            <div className="nav-author">
              <img src={detail.aut_photo || avatar} alt="" />
              <span className="name">{detail.aut_name}</span>
              <span
                className={classNames(
                  'follow',
                  detail.is_followed ? 'followed' : ''
                )}
              >
                {detail.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  )
}

export default Article
