import { combineReducers } from 'redux'

import auth from './auth/reducers'

import hours from './hours/reducers'

import users from './users/reducers'

import kanban from './kanban/reducers'
// Combine all reducers
const rootReducer = combineReducers({
  auth,
  hours,
  users,
  kanban
})

export default rootReducer
