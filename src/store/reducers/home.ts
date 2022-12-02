import { ChannelList } from '@/types/data'
import { ChannelAction } from '@/types/store'
type state = {
  allChannels: ChannelList
  useChannels: ChannelList
  active: string
}
const initialState: state = {
  allChannels:[],
  useChannels: [],
  active: '0', // 当前高亮的频道
}
const channel = (state = initialState, action: ChannelAction) => {
  if (action.type === 'channel/getChannel') {
    return { ...state, useChannels: action.payload }
  } else if (action.type === 'channel/activeChannel') {
    return { ...state, active: action.id }
  }else if(action.type ==='channel/saveAllChannels'){
    return { ...state, allChannels: action.payload }
  }
  return state
}
export default channel
