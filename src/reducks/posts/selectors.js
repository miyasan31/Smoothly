import { createSelector } from "reselect";
/* ===================================================================== */

const postsSelector = (state) => state.posts;

export const getPostLists = createSelector(
  [postsSelector],
  (state) => state.list
);
