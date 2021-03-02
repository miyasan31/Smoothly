import * as Action from './actions'
import { initialState } from '../store/initialState.js'
/* ===================================================================== */

export const doingTasksReducter = (
  state = initialState.doing_tasks,
  action
) => {
  switch (action.type) {
    case Action.READ_DOING_TASKS:
      return {
        ...state,
        list: action.payload,
      }
    case Action.UPDATE_DOING_TASK:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

export const completedTasksReducter = (
  state = initialState.completed_tasks,
  action
) => {
  switch (action.type) {
    case Action.READ_COMPLETED_TASKS:
      return {
        ...state,
        list: action.payload,
      }
    case Action.UPDATE_COMPLETED_TASK:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}
