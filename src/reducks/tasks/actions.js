export const READ_DOING_TASKS = 'READ_DOING_TASKS'
export const readDoingTasksAction = (tasks) => {
  return {
    type: 'READ_DOING_TASKS',
    payload: tasks,
  }
}

export const UPDATE_DOING_TASK = 'UPDATE_DOING_TASK'
export const updateDoingTaskAction = (tasks) => {
  return {
    type: 'UPDATE_DOING_TASK',
    payload: tasks,
  }
}

export const READ_COMPLETED_TASKS = 'READ_COMPLETED_TASKS'
export const readCompletedTasksAction = (tasks) => {
  return {
    type: 'READ_COMPLETED_TASKS',
    payload: tasks,
  }
}
export const UPDATE_COMPLETED_TASK = 'UPDATE_COMPLETED_TASK'
export const updateCompletedTaskAction = (tasks) => {
  return {
    type: 'UPDATE_COMPLETED_TASK',
    payload: tasks,
  }
}
