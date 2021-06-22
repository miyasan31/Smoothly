import * as Action from "src/reducks/missions/actions";
import { initialState } from "src/reducks/store/initialState";
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
