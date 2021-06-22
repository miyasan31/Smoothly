import * as Action from "src/reducks/posts/actions";
import { initialState } from "src/reducks/store/initialState";
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
