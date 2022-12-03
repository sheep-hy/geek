import { NavBar, InfiniteScroll } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/Icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'

import { useEffect } from 'react'
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

    // 忽略警告
    hljs.configure({
      ignoreUnescapedHTML: true,
    })

    // 1 获取 pre code 标签
    const codes = dgHtmlDOM.querySelectorAll<HTMLElement>('pre code')
    if (codes.length > 0) {
      codes.forEach((code) => {
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

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{detail.title}</h1>

            <div className="info">
              <span>{detail.pubdate}</span>
              <span>{detail.read_count} 阅读</span>
              <span>{detail.comm_count} 评论</span>
            </div>
            <div className="author">
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
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(detail.content),
              }}
            ></div>

            {/* dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(detail.content),
              }} */}
            {/* dangerouslySetInnerHTML={{
                // 使用 DOMPurify 包来对 HTML 格式字符串进行“消毒”，消毒后就没有风险了
                __html: DOMPurify.sanitize(detail.content),
              }} */}
            {/* // 注意： HTML5 中明确规定，不执行由 innerHTML 设置的 script 标签
                // __html: `<script>alert('你能看到我吗？')</script>`,

                // 但，下面示例中的代码就会执行，如果不处理的话，就可能让我们的网站遭受 XSS 攻击
                // __html: `<img src="x" onerror="alert('你能看到我吗？')" />`,
                // __html: DOMPurify.sanitize(
                //   `<img src="x" onerror="alert(localStorage.getItem('geek-h5-1478'))" />`
                // ), */}

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
          {true && (
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
