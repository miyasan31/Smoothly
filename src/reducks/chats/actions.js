export const READ_ROOMS = 'READ_ROOMS'
export const readChatRoomsAction = (rooms) => {
  return {
    type: 'READ_ROOMS',
    payload: rooms,
  }
}
export const DELETE_ROOM = 'DELETE_ROOM'
export const deleteChatRoomAction = (rooms) => {
  return {
    type: 'DELETE_ROOM',
    payload: rooms,
  }
}
