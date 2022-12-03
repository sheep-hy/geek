import { combineReducers } from 'redux'
import login from './login'
import profile from './profile1'
import channel from './home'
import article from './article'

// const { combineReducers } = require('redux')
const reducer = combineReducers({
  login,
  profile,
  channel,
  article,
})

export default reducer
