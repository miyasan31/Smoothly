import { createSelector } from 'reselect'
/* ===================================================================== */

const roomsSelector = (state) => state.rooms
export const getRoomLists = createSelector(
  [roomsSelector],
  (state) => state.list
)
