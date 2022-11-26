import { Link, useHistory } from 'react-router-dom'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '@/store/actions/profile1'
import { RootAction } from '@/types/store'
import { RootState } from '@/store'
import useInitialState from '@/Hooks/useInitialState'
// import { getUser } from '@/store/slices/profile'
// import { useInitialState } from '@/utils/use-initial-state'

const Profile = () => {
  // const dispatch = useDispatch<any>()
  const history = useHistory()
  // 使用 useInitialState hook 来实现复用
  // const { user } = useInitialState(getUser, 'profile')

  // 页面一进入，就需要发送请求，获取用户信息
  // useEffect(() => {
  //   dispatch(getUserInfo())
  // }, [dispatch])
  // const user = useSelector((state: RootState) => state.profile.user)
  const { user } = useInitialState(getUserInfo, 'profile')
  const EditUser = () => {
    history.push('/profile/edit')
  }
  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 个人信息 */}
        <div className="user-info">
          <div className="avatar">
            <img
              src={
                user.photo
                  ? user.photo
                  : 'http://toutiao.itheima.net/images/user_head.jpg'
              }
              alt=""
            />
          </div>
          <div className="user-name">{user.name}</div>
          <Link to="/profile/edit" onClick={EditUser}>
            个人信息 <Icon type="iconbtn_right" />
          </Link>
        </div>

        {/* 今日阅读 */}
        <div className="read-info">
          <Icon type="iconbtn_readingtime" />
          今日阅读
          <span>{user.intro}</span>
          分钟
        </div>

        {/* 动态 - 对应的这一行 */}
        <div className="count-list">
          <div className="count-item">
            <p>{user.like_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{user.follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{user.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{user.art_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 消息通知 - 对应的这一行 */}
        <div className="user-links">
          <div className="link-item">
            <Icon type="iconbtn_mymessages" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_mycollect" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_history1" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_myworks" />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div className="service-item">
            <Icon type="iconbtn_feedback" />
            <div>用户反馈</div>
          </div>
          <div className="service-item">
            <Icon type="iconbtn_xiaozhitongxue" />
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
