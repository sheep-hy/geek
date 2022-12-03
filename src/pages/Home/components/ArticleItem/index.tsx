import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import dayjs from 'dayjs'
// import Img from '@/components/Img'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
// import { setMoreAction } from '@/store/actions/home'
import { useHistory } from 'react-router'
import { Article } from '@/types/data'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import Image from '@/components/Image'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
type props = {
  article: Article
}
// 注意 三张图片和2张图片的格式不一样
// 0表示无图，1表示单张图片, 3表示3图
const ArticleItem = ({ article }: props) => {
  const history = useHistory()
  const { type, images = [] } = article.cover
  const dispatch = useDispatch()
  return (
    <div
      className={styles.root}
      onClick={() => history.push('/article/' + article.art_id)}
    >
      {/* t3: 三图结构 none-mt没有图片结构  */}
      <div
        className={classnames(
          'article-content',
          type === 3 && 't3',
          type === 0 && 'none-mt'
        )}
      >
        <h3>{article.title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item) => {
              return (
                <div key={item} className="article-img-wrapper">
                  <Image src={item} alt="" />
                </div>
              )
            })}
            {/* <div className="article-img-wrapper">
              <img src={''} alt="" />
            </div> */}
          </div>
        )}
      </div>
      <div className={classnames('article-info', '')}>
        <span>{article.aut_name}</span>
        <span>{article.comm_count} 评论</span>
        {/* fromNow: 距离现在的时间 */}
        <span>{dayjs(article.pubdate).fromNow()}</span>
        {/* <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs(pubdate).fromNow()}</span> */}

        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
