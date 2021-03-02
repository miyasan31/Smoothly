export const READ_MISSIONS = 'READ_MISSIONS'
export const readMissionsAction = (missions) => {
  return {
    type: 'READ_MISSIONS',
    payload: missions,
  }
}

export const DELETE_MISSIONS = 'DELETE_MISSIONS'
export const deleteMissionsAction = (missions) => {
  return {
    type: 'DELETE_MISSIONS',
    payload: missions,
  }
}
