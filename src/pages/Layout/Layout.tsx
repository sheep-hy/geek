import Icon from '@/components/Icon'
import { TabBar, Tabs } from 'antd-mobile'
import React from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'
import Home from '../Home'
import Profile from '../Profile/Profile'
import Question from '../Question'
import Video from '../Video/Video'
import style from './index.module.scss'
import classNames from 'classnames'
function Layout() {
  const location = useLocation()
  const history = useHistory()
  const tabs = [
    { path: '/home', icon: 'iconbtn_home', text: '首页' },
    { path: '/home/question', icon: 'iconbtn_qa', text: '问题' },
    { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
    { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
  ]
  const handleActive = (value: string) => {
    history.push(value)
  }

  console.log(location.pathname, 111)
  return (
    <div className={style.root}>
      {/*
        配置子路由
          1. 子路由 path 必须以父路由的 path 开头
          2. 子路由 path 可以与父路由的 path 相同
      */}
      <Route exact path="/home" component={Home} />
      <Route path="/home/question" component={Question} />
      <Route path="/home/video" component={Video} />
      <Route path="/home/profile" component={Profile} />
      <TabBar
        className="tab-bar"
        activeKey={location.pathname}
        onChange={handleActive}
      >
        {tabs.map((item) => (
          <TabBar.Item
            className="tabbar-item"
            key={item.path}
            icon={(active) => (
              <Icon type={active ? `${item.icon}_sel` : item.icon} />
            )}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
