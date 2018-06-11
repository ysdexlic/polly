import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/auth'
import { reducer as home } from '../modules/home'

const rootReducer = combineReducers({ auth, home })

export default rootReducer
