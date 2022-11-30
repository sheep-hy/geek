import { EditUser, User } from '@/types/data'
import { ProfileAction, RootAction } from '@/types/store'
type ProfileProps = {
  user: User
  profileEdit: EditUser
}
const initialState = {
  user: {},
  profileEdit: {},
} as ProfileProps
const profile = (state = initialState, action: ProfileAction) => {
  if (action.type === 'profile/user') {
    // console.log({ user: action.payload }, 1)
    return { ...state, user: action.payload }
  } else if (action.type === 'profile/editUser') {
    return { ...state, profileEdit: action.payload }
  }
  return state
}
export default profile
