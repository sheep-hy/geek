import Icon from '@/components/Icon'
// import NavBar from '@/components/NavBar'
import styles from './index.module.scss'

import { Input, NavBar } from 'antd-mobile'
import { useHistory } from 'react-router-dom'

const Chat = () => {
  const history = useHistory()
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={()=>history.go(-1)}>小智同学</NavBar>
      {/* 聊天记录列表 */}
      <div className="chat-list">
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
