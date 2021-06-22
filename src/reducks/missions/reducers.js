import * as Action from "./actions";
import { initialState } from "../store/initialState.js";
/* ===================================================================== */

export const MissionsReducter = (state = initialState.missions, action) => {
  switch (action.type) {
    case Action.READ_MISSIONS:
      return {
        ...state,
        list: [...action.payload],
      };
    case Action.DELETE_MISSIONS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
