import { combineReducers } from 'redux'
import login from './login'
import profile from './profile1'

// const { combineReducers } = require('redux')
const reducer = combineReducers({
  login,
  profile,
})

export default reducer
