import * as Action from "./actions";
import { initialState } from "../store/initialState.js";
/* ===================================================================== */

export const PostsReducter = (state = initialState.posts, action) => {
  switch (action.type) {
    case Action.READ_POSTS:
      return {
        ...state,
        list: [...action.payload],
      };
    case Action.DELETE_POSTS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
