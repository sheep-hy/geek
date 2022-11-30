import { ChannelList } from '@/types/data'
import { ChannelAction } from '@/types/store'
type state = {
  useChannels: ChannelList
}
const initialState: state = {
  useChannels: [],
}
const channel = (state = initialState, action: ChannelAction) => {
  if (action.type === 'channel/getChannel') {
    return { ...state, useChannels: action.payload }
  }
  return state
}
export default channel
