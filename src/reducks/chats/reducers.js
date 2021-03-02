import * as Action from './actions'
import { initialState } from '../store/initialState.js'
/* ===================================================================== */

export const ChatRoomsReducter = (state = initialState.rooms, action) => {
  switch (action.type) {
    case Action.READ_ROOMS:
      return {
        ...state,
        list: action.payload,
      }
    case Action.DELETE_ROOM:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}
