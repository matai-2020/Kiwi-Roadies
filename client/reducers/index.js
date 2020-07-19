import { combineReducers } from 'redux'

import dataSet from './dataSet'
import error from './error'
import name from './name'
import campsites from './campsites'
import waiting from './waiting'
import roadieform from './roadieform'
import tripstatus from './tripstatus'

export default combineReducers({
  dataSet,
  error,
  name,
  campsites,
  waiting,
  roadieform,
  tripstatus
})
