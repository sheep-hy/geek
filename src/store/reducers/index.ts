import { combineReducers } from 'redux'
import login from './login'
import profile from './profile1'
import channel from './home'
import article from './article'
import search from './search'

// const { combineReducers } = require('redux')
const reducer = combineReducers({
  login,
  profile,
  channel,
  article,
  search
})

export default reducer
