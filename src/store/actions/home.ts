import { ApiRsponse, Channel, ChannelList } from '@/types/data.d'
import {
  ChannelAction,
  LoginAction,
  RootAction,
  RootThunkAction,
} from '@/types/store'
import request from '@/utils/request'
import { getLocalChannels, hasToken, setLocalChannels } from '@/utils/storage'

export function getChannels(): RootThunkAction {
  return async (dispatch) => {
    // 后端返回的类型 <ApiRsponse<{ channels: ChannelList }>>
    if (hasToken()) {
      // 1.发请求
      const res = await request.get<ApiRsponse<{ channels: ChannelList }>>(
        'user/channels'
      )
      console.log(res.data.data.channels, '用户登录后 获取频道数据')
      // 2. 保存频道数据到本地
      dispatch({
        type: 'channel/getChannel',
        payload: res.data.data.channels,
      })
    } else {
      const channels = getLocalChannels()
      if (channels) {
        // 本地存在缓存数据
        dispatch({
          type: 'channel/getChannel',
          payload: channels,
        })
      } else {
        // 1.发请求
        const res = await request.get<ApiRsponse<{ channels: ChannelList }>>(
          'user/channels'
        )
        console.log(res.data.data.channels, '用户没有登录，本地缓存没有数据')
        // 2. 保存频道数据到本地
        dispatch({
          type: 'channel/getChannel',
          payload: res.data.data.channels,
        })
        // 3.持久化
        setLocalChannels(res.data.data.channels)
      }
    }
  }
}
export function saveAllChannels(): RootThunkAction {
  return async (dispatch) => {
    // 1.发请求
    const res = await request.get<ApiRsponse<{ channels: ChannelList }>>(
      '/channels'
    )
    console.log(res.data.data.channels, '获取所有频道数据')
    // 2. 保存频道数据到本地
    dispatch({
      type: 'channel/saveAllChannels',
      payload: res.data.data.channels,
    })
  }
}
// 删除频道delChannel
// 1.登录用户 正常发请求 调用接口做删除
// 2.没有登录 从本地取频道 做删除
export function delChannel(id: string): RootThunkAction {
  return async (dispatch, getState) => {
    const { useChannels } = getState().channel
    if (hasToken()) {
      // 1.发请求
      await request.delete('user/channels/' + id)
    } else {
      setLocalChannels(useChannels.filter((item) => item.id !== id))
    }
    dispatch(getChannels())
  }
}
// 添加频道
export function addChannel(channel: Channel): RootThunkAction {
  return async (dispatch, getState) => {
    const { useChannels } = getState().channel
    if (hasToken()) {
      // 1.发请求
      await request.patch('user/channels/', {
        channels: [channel],
      })
    } else {
      setLocalChannels([...useChannels, channel])
    }
    dispatch(getChannels())
  }
}

// 选择当前高亮
export function getActiveChannel(key: string): RootAction {
  return {
    type: 'channel/activeChannel',
    id: key,
  }
}
