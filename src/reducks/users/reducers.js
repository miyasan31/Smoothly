import * as Action from './actions'
import { initialState } from '../store/initialState.js'
/* ===================================================================== */

export const UsersReducter = (state = initialState.users, action) => {
  switch (action.type) {
    case Action.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      }
    case Action.SIGN_OUT:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
