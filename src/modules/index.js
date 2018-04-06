import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import cointracker from './cointracker'

export default combineReducers({
  routing: routerReducer,
  cointracker
})
