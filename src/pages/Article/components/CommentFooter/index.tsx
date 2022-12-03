import Icon from '@/components/Icon'
import { RootState } from '@/store'
import { collectArticle, likeAritcle } from '@/store/actions/article'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
// import { collectArticle, likeAritcle } from '@/store/actions/article'

type Props = {
  goComment?: () => void
  onShare?: () => void
  onComment?: () => void
}
const CommentFooter = ({ goComment, onShare, onComment }: Props) => {
  const { detail } = useSelector((state: RootState) => state.article)

  const dispatch = useDispatch<any>()
  const onLike = async () => {
    await dispatch(likeAritcle(detail.art_id, detail.attitude))
  }
  const collect = async () => {
    dispatch(collectArticle(detail.art_id, detail.is_collected))
  }

  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={onComment}>
        <Icon type="iconbianji" />
        <span>去评论</span>
      </div>

      <>
        <div className="action-item" onClick={goComment}>
          <Icon type="iconbtn_comment" />
          <p>评论</p>
          {/* <span className="bage">1212</span> */}
          <span className="bage">{detail.comm_count}</span>
        </div>
        {/* 'iconbtn_like2' */}
        <div className="action-item" onClick={onLike}>
          <Icon
            type={detail.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'}
          />
          {/* <Icon type={true ? 'iconbtn_like_sel' : 'iconbtn_like2'} /> */}
          <p>点赞</p>
        </div>
      </>
      <div className="action-item" onClick={collect}>
        {/* 'iconbtn_collect' */}
        <Icon
          type={detail.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'}
        />
        <p>收藏</p>
      </div>
      <div className="action-item" onClick={onShare}>
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
