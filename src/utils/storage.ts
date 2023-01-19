import { Token } from '@/types/data'

// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-hy'
const CHANNEL_KEY = 'geek-itcast-hy-channels'
const SEARCH_HIS_KEY = 'geek-itast-hy-search'

type Channels = {
  id: number
  name: string
}[]
// /**
//  *
//  * @param {Object} tokenInfo 从后端获取到的 Token 信息
//  */
// 设置Token
export const setTokenInfo = (tokenInfo: Token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

// 从本地缓存中获取 Token 信息
export const getTokenInfo = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)!) || {}
  // return JSON.parse(localStorage.getItem(TOKEN_KEY) || {})
}

// 删除本地缓存中的 Token 信息
export const removeTokenInfo = () => {
  localStorage.removeItem(TOKEN_KEY)
}

// 判断本地缓存中是否存在 Token 信息
export const hasToken = (): boolean => {
  return !!getTokenInfo().token
}

/**
 * 保存频道数据到本地
 * @param {*} channels
 */
export const setLocalChannels = (channels: Channels) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

/**
 * 获取本地的频道数据，，，，，，，如果没有数据，不要默认为空数组
 * @returns
 */
export const getLocalChannels = () => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY)!) || []
}

/**
 * 删除本地的频道数据
 */
export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY)
}

/**
 * 从缓存获取搜索历史关键字
 */
export const getLocalHistories = (): string[] => {
  return JSON.parse(localStorage.getItem(SEARCH_HIS_KEY)!) || []
}

/**
 * 将搜索历史关键字存入本地缓存
 * @param {Array} histories
 */
export const setLocalHistories = (histories: string[]) => {
  localStorage.setItem(SEARCH_HIS_KEY, JSON.stringify(histories))
}

/**
 * 删除本地缓存中的搜索历史关键字
 */
export const removeLocalHistories = () => {
  localStorage.removeItem(SEARCH_HIS_KEY)
}
