import { createSelector } from 'reselect'
/* ===================================================================== */

const doingTasksSelector = (state) => state.doing_tasks
export const getDoingTasksLists = createSelector(
  [doingTasksSelector],
  (state) => state.list
)

const completedTasksSelector = (state) => state.completed_tasks
export const getCompletedTasksLists = createSelector(
  [completedTasksSelector],
  (state) => state.list
)
