import { createSelector } from "reselect";
/* ===================================================================== */

const missionsSelector = (state) => state.missions;
export const getMissionLists = createSelector(
  [missionsSelector],
  (state) => state.list
);
