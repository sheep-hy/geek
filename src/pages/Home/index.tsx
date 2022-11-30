import Icon from '@/components/Icon'
import useInitialState from '@/Hooks/useInitialState'
import { getChannels } from '@/store/actions/home'
import { Channel } from '@/types/data'
import { Tabs } from 'antd-mobile'
// import ArticleList from './components/ArticleList'

import styles from './index.module.scss'

const Home = () => {
  const { useChannels } = useInitialState(getChannels, 'channel')
  console.log(useChannels,1111121)

  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
        {useChannels.length > 0 && (
          <Tabs className="tabs" activeLineMode="fixed">
            {useChannels.map((item) => {
              return (
                <Tabs.Tab title={item.name} key={item.id}>
                  {item.name}
                  {/* <ArticleList channelId={item.id} /> */}
                </Tabs.Tab>
              )
            })}
          </Tabs>
        )}

      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" />
      </div>
    </div>
  )
}

export default Home
