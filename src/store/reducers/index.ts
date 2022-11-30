import { combineReducers } from 'redux'
import login from './login'
import profile from './profile1'
import channel from './home'

// const { combineReducers } = require('redux')
const reducer = combineReducers({
  login,
  profile,
  channel
})

export default reducer
