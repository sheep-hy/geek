import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useHistory } from 'react-router'
import classNames from 'classnames'
import { ReactElement } from 'react'
// import { withRouter } from 'react-router-dom'
// 1. withRouter的使用
// history match location: 这个组件必须是通过路由配置的  <Route></Route>
// 自己渲染的组件，无法获取到路由信息  <NavBar></NavBar>

// 2. 路由提供了几个和路由相关的hook
// useHistory  useLocation  useParams
type Props = {
  children: string | ReactElement
  extra?: string | ReactElement
  className?: string
  onLeftClick?: () => void
}
function NavBar({ children, extra, onLeftClick, className }: Props) {
  const history = useHistory()
  const back = () => {
    // 跳回上一页
    if (onLeftClick) {
      onLeftClick()
    } else {
      history.go(-1)
    }
  }
  return (
    <div className={classNames(styles.root, className)}>
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="iconfanhui" onClick={back} />
      </div>
      {/* 居中标题 */}
      <div className="title">{children}</div>

      {/* 右侧内容 */}
      <div className="right">{extra}</div>
    </div>
  )
}

export default NavBar
