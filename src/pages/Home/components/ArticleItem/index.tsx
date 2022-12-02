import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import dayjs from 'dayjs'
// import Img from '@/components/Img'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
// import { setMoreAction } from '@/store/actions/home'
import { useHistory } from 'react-router'

const ArticleItem = () => {
  const dispatch = useDispatch()
  return (
    <div className={styles.root}>
      {/* t3: 三图结构 none-mt没有图片结构  */}
      <div className={classnames('article-content')}>
        <h3>11</h3>
        <div className="article-imgs">
          <div className="article-img-wrapper">
            <img src={''} alt="" />
          </div>
        </div>
      </div>
      <div className={classnames('article-info', '')}>
        <span>21</span>
        <span>23 评论</span>
        {/* fromNow: 距离现在的时间 */}
        <span>12313</span>
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
