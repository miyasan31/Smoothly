import { push } from 'connected-react-router'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

import { storage, db, FirebaseTimestamp } from '../../firebase/firebase'
import { readChatRoomsAction, deleteChatRoomAction } from './actions.js'
/* ===================================================================== */

const chatsRef = db.collection('chats')

export const readChatRoom = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    chatsRef
      .where('members', 'array-contains', userId)
      .onSnapshot((snapshots) => {
        const roomList = []
        snapshots.forEach((snapshots) => {
          const myRoom = snapshots.data()
          const num = myRoom.members.length
          const timeStamp = myRoom.update_time
          const redate = timeStamp.toDate()
          const date = format(redate, 'yyyy年M月dd日 H:mm', { locale: ja })
          const userData = {
            rid: myRoom.rid,
            room_name: myRoom.room_name,
            update_time: date,
            memberNum: num,
          }
          if (myRoom.icon !== '') {
            userData.icon = myRoom.icon.path
          }
          roomList.push(userData)
        })
        roomList.sort((a, b) => {
          if (a.update_time > b.update_time) return -1
          if (a.update_time < b.update_time) return 1
          return 0
        })
        dispatch(readChatRoomsAction(roomList))
      })
  }
}

export const createChatRoom = (roomName, userName, checked, blob) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    const memberName = state.users.user_name
    const className = state.users.class_name

    if (roomName === '') {
      alert(`項目：【ルーム名】を入力してください。`)
      return false
    }
    if (checked.length === 0) {
      alert(`項目：ユーザーを選択してください。`)
      return false
    }

    userName.unshift(`${memberName}　ー　${className}`)
    checked.unshift(userId)

    const timestamp = FirebaseTimestamp.now()
    const ref = chatsRef.doc()
    const rid = ref.id

    const data = {
      rid: rid,
      icon: '',
      room_name: roomName,
      members: checked,
      members_name: userName,
      update_time: timestamp,
      created_time: timestamp,
    }

    return chatsRef
      .doc(rid)
      .set(data, { merge: true })
      .then(() => {
        if (blob === null) {
          return dispatch(push('/chat/room/' + rid))
        } else {
          dispatch(createChatRoomIcon(rid, blob))
        }
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const editChatRoom = (rid, roomName, userName, checked, blob) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid

    if (roomName === '') {
      alert(`項目：【ルーム名】を入力してください。`)
      return false
    }
    if (checked.length === 0) {
      alert(`項目：ユーザーを選択してください。`)
      return false
    }

    let check = false
    if (!checked.includes(userId)) {
      check = window.confirm('ルームを退出されますか？')
    }
    // 退出の場合
    if (check) {
      const data = {
        members: checked,
        members_name: userName,
      }
      return chatsRef
        .doc(rid)
        .set(data, { merge: true })
        .then(() => {
          dispatch(push('/chat'))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
    // 変更の場合
    if (!check) {
      const timestamp = FirebaseTimestamp.now()

      const data = {
        room_name: roomName,
        members: checked,
        members_name: userName,
        update_time: timestamp,
      }

      return chatsRef
        .doc(rid)
        .set(data, { merge: true })
        .then(() => {
          if (blob === null) {
            dispatch(push('/chat/room/' + rid))
          } else {
            dispatch(createChatRoomIcon(rid, blob))
          }
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }
}

export const createChatRoomIcon = (rid, blob) => {
  return async (dispatch) => {
    const uploadRef = storage.ref('room_icons').child(rid)
    const uploadTask = uploadRef.put(blob, { contentType: blob.type })

    uploadTask
      .then(() => {
        return uploadTask.snapshot.ref.getDownloadURL()
      })
      .then((downloadURL) => {
        const iconData = { id: rid, path: downloadURL }
        const data = {
          icon: iconData,
        }
        chatsRef.doc(rid).set(data, { merge: true })
        dispatch(push('/chat/room/' + rid))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const deleteChatRoom = (rid) => {
  return async (dispatch, getState) => {
    const check = window.confirm('ルームを削除してよろしいですか？')
    if (check) {
      chatsRef
        .doc(rid)
        .delete()
        .then(() => {
          const prevRooms = getState().rooms.list
          const nextRooms = prevRooms.filter((room) => room.rid !== rid)
          dispatch(deleteChatRoomAction(nextRooms))

          storage.ref('room_icons').child(rid).delete()
          dispatch(push('/chat'))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }
}

export const createChatMessage = (rid, message) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    const userName = state.users.user_name
    const timestamp = FirebaseTimestamp.now()

    const data = {
      message: message,
      creater_name: userName,
      creater_uid: userId,
      update_time: timestamp,
    }
    const ref = chatsRef.doc(rid).collection('messages').doc()
    const mid = ref.id
    const timeStamp = FirebaseTimestamp.now()
    const timeData = {
      update_time: timeStamp,
    }

    return chatsRef
      .doc(rid)
      .collection('messages')
      .doc(mid)
      .set(data)
      .then(() => {
        chatsRef.doc(rid).set(timeData, { merge: true })
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
