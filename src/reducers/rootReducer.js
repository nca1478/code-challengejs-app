import { combineReducers } from 'redux'
import { filesReducer } from './filesReducer'

export const rootReducer = combineReducers({
  files: filesReducer,
})
