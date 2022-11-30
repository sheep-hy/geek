import { ApiRsponse, ChannelList } from '@/types/data.d'
import { LoginAction, RootThunkAction } from '@/types/store'
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
          '/channels'
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
