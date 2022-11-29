import { RootAction } from '@/types/store'

const initialState = {}
const login = (state = initialState, action: RootAction) => {
  if (action.type === 'login/token') {
    return action.payload
  } else if (action.type === 'login/quit') {
    return { token: '', refresh_token: '' }
  }
  return state
}
export default login
