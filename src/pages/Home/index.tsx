import Icon from '@/components/Icon'
import useInitialState from '@/Hooks/useInitialState'
import {
  getActiveChannel,
  getChannels,
  saveAllChannels,
} from '@/store/actions/home'
import { Popup, Tabs } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Channels from './components/Channels/Channels'
import ArticleList from './components/ArticleList'

import styles from './index.module.scss'

const Home = () => {
  const dispatch = useDispatch()
  const { useChannels, active } = useInitialState(getChannels, 'channel')
  const { allChannels } = useInitialState(saveAllChannels, 'channel')
  const [visible, setVisible] = useState(false)
  const hide = () => {
    setVisible(false)
  }
  // 选择当前高亮的频道
  const onChangeActive = (key: string) => {
    dispatch(getActiveChannel(key))
  }
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {useChannels.length > 0 && (
        <Tabs
          activeKey={active}
          className="tabs"
          activeLineMode="fixed"
          onChange={onChangeActive}
        >
          {useChannels.map((item) => {
            return (
              <Tabs.Tab title={item.name} key={item.id}>
                {/* {item.name} */}
                <ArticleList channelId={active} />
              </Tabs.Tab>
            )
          })}
        </Tabs>
      )}

      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon
          type="iconbtn_channel"
          onClick={() => {
            setVisible(true)
          }}
        />
      </div>
      <Popup visible={visible} position="left" destroyOnClose>
        <Channels hide={hide}></Channels>
      </Popup>
    </div>
  )
}

export default Home
