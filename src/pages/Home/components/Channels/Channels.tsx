import Icon from '@/components/Icon'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'
import { differenceBy } from 'lodash'
// import differenceBy from 'lodash/differenceBy'
import classNames from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { addChannel, delChannel, getActiveChannel } from '@/store/actions/home'
import { Channel } from '@/types/data'
import { Toast } from 'antd-mobile'
type props = {
  hide: () => void
}
const Channels = ({ hide }: props) => {
  const dispatch = useDispatch<any>()
  const { useChannels, active } = useSelector(
    (state: RootState) => state.channel
  )
  const options = useSelector((state: RootState) => {
    const { useChannels, allChannels } = state.channel
    return differenceBy(allChannels, useChannels, 'id')
    // return allChannels.filter((item) => {
    //   const res = useChannels.find((it) => it.id === item.id)
    //   if (res) {
    //     return false
    //   } else {
    //     return true
    //   }
    // })
  })
  const [edit, setEdit] = useState(false)
  // 添加频道
  const add = (channel: Channel) => {
    // 这里出了报错’类型“RootThunkAction”的参数不能赋给类型“AnyAction”的参数‘ react需要降版本
    dispatch(addChannel(channel))
  }
  // 删除频道
  const del = (id: string) => {
    if (useChannels.length <= 4) {
      Toast.show('至少保留4个频道了啦')
      return
    }
    if(['0', active].includes(id.toString())) return
    // 这里出了报错’类型“RootThunkAction”的参数不能赋给类型“AnyAction”的参数‘ react需要降版本
    dispatch(delChannel(id))
  }

  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon
          type="iconbtn_channel_close"
          onClick={() => {
            hide()
          }}
        />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div
          className={classNames('channel-item', {
            edit: edit,
          })}
        >
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {false ? '点击删除频道' : '点击进入频道'}
            </span>
            <span className="channel-item-edit" onClick={() => setEdit(!edit)}>
              {edit ? '完成' : '编辑'}
            </span>
          </div>
          {active}
          <div className="channel-list">
            {useChannels.map((item, i) => {
              return (
                <span
                  key={item.id}
                  className={classNames('channel-list-item', {
                    actived: active === item.id.toString(),
                  })}
                  onClick={() => {
                    if (edit) {
                      // 这是编辑页面 做删除
                      del(item.id)
                    } else {
                      // 这是选择频道 关闭页面 回到主页选中当前页签
                      hide()
                      dispatch(getActiveChannel(item.id))
                    }
                  }}
                >
                  {item.name}
                  {!['0', active].includes(item.id.toString()) && (
                    <Icon
                      type="iconbtn_tag_close"
                      onClick={() => del(item.id)}
                    />
                  )}
                </span>
              )
            })}
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {options.map((item) => (
              <span
                key={item.id}
                className="channel-list-item"
                onClick={() => add(item)}
              >
                +{item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Channels
