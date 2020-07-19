import { ADD_NAME, TURN_OFF_WAIT } from '../actions'

export default function waiting (state = false, action) {
  console.log(state)
  switch (action.type) {
    case ADD_NAME:
      return true
    case TURN_OFF_WAIT:
      return false

    default:
      return state
  }
}