import { Input, List, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
// import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getTokenInfo } from '@/utils/storage'
import {io ,Socket}from 'socket.io-client'
import React from 'react'
// import { Socket } from 'dgram'

const Chat = () => {
  const user = useSelector((state: RootState) => state.profile.user)
  const [text, setText] = useState('')
  const history = useHistory()
  const [list, setList] = useState<{ type: 'user' | 'robot'; text: string }[]>([
    { type: 'robot', text: '你好' },
    { type: 'user', text: '你好' },
  ])
  // useRef 不止可以获取当前元素的dom 还可以保存当前元素的状态(因为页面变化时 函数组件是一直在触发的状态 )
  // 创建用来存储 socket 对象的ref
  const clientRef = useRef<Socket>(null)
  useEffect(() => {
    const client = io('http://geek.itheima.net', {
      query: {
        token: getTokenInfo().token,
      },
      transports: ['websocket'],
    })
    console.log(clientRef,  1111)
    clientRef.current
    // 当服务器建立连接成功这个事件就会触发
    // client.on('connect', () => {
    //   console.log('websocket连接成功')
    // })
  }, [])
  // 给机器人发送消息
  const sendMessage = () => {
    // 主动给服务器发消息
    // client.emit()
  }
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>
      {/* 聊天记录列表 */}
      <div className="chat-list">
        {list.map((it, index) => {
          if (it.type === 'robot') {
            return (
              // {/* 机器人的消息 */}
              <div key={index} className="chat-item">
                <Icon type="iconbtn_xiaozhitongxue"></Icon>
                <div className="message"> 你好！</div>
              </div>
            )
          } else {
            //  {/* 用户的消息 */}
            return (
              <div key={index} className="chat-item user">
                <img
                  src={
                    user.photo ||
                    'http://toutiao.itheima.net/images/user_head.jpg'
                  }
                ></img>
                <div className="message"> 你好?</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <List>
          <List.Item
            extra={
              <span style={{ fontSize: 14 }} onClick={sendMessage}>
                发送
              </span>
            }
          >
            <Input
              className="no-border"
              value={text}
              onChange={(str) => setText(str)}
              placeholder="请描述您的问题"
            />
          </List.Item>
        </List>
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
