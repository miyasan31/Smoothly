import firebase from 'firebase/app'
import { push } from 'connected-react-router'
import { db, FirebaseTimestamp, storage } from '../../firebase/firebase'
import { readMissionsAction, deleteMissionsAction } from './actions.js'
/* ===================================================================== */

const missionsRef = db.collection('missions')
const schedulesRef = db.collection('schedules')

export const readMissions = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    const className = state.users.class_name
    const userValue = state.users.user_value

    missionsRef
      // .where('limit_time', '>', new Date())
      .orderBy('limit_time', 'asc')
      .get()
      .then((snapshots) => {
        // .onSnapshot((snapshots) => {
        const missionList = []
        snapshots.forEach((snapshot) => {
          const mission = snapshot.data()
          if (mission.destination === userValue) {
            missionList.push(mission)
          } else if (mission.destination === className) {
            missionList.push(mission)
          } else if (mission.creater_uid === userId) {
            missionList.push(mission)
          }
        })
        dispatch(readMissionsAction(missionList))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const createMissison = (
  mid,
  destination,
  title,
  item,
  limitTime,
  file,
  fileName
) => {
  return async (dispatch, getState) => {
    let nullData = ''
    if (destination === '') {
      nullData = nullData + '【投稿先】'
    }
    if (title === '') {
      nullData = nullData + '【タイトル】'
    }
    if (item === '') {
      nullData = nullData + '【内容】'
    }
    if (limitTime === '') {
      nullData = nullData + '【期限】'
    }
    if (nullData !== '') {
      alert(`項目：${nullData}を入力してください。`)
      return false
    }

    const state = getState()
    const userId = state.users.uid
    const timestamp = FirebaseTimestamp.now()
    let data = {}
    if (fileName === '') {
      data = {
        destination: destination,
        title: title,
        item: item,
        file: '',
        limit_time: limitTime,
        creater_uid: userId,
        update_time: timestamp,
      }
    } else {
      data = {
        destination: destination,
        title: title,
        item: item,
        limit_time: limitTime,
        creater_uid: userId,
        update_time: timestamp,
      }
    }

    if (mid === '') {
      const ref = missionsRef.doc()
      data.created_time = timestamp
      // 要注意！！ドキュメントのIDだよ！
      mid = ref.id
      data.mid = mid
    }
    const task = {
      doc: mid,
      title: title,
      startDate: timestamp,
      endDate: limitTime,
      tag: '2',
      destination: destination,
      creater_uid: userId,
    }

    return missionsRef
      .doc(mid)
      .set(data, { merge: true })
      .then(() => {
        schedulesRef
          .doc(mid)
          .set(task, { merge: true })
          .then(() => {
            if (fileName !== '' && file === '') {
              dispatch(push('/mission'))
            } else if (fileName === '' && file === '') {
              dispatch(push('/mission'))
            } else {
              dispatch(createFile(mid, file, fileName))
            }
          })
          .catch((error) => {
            throw new Error(error)
          })
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const deleteMission = (mid) => {
  return async (dispatch, getState) => {
    missionsRef
      .doc(mid)
      .delete()
      .then(() => {
        schedulesRef.doc(mid).delete()
        storage.ref('mission_files').child(mid).delete()
        const prevMissions = getState().missions.list
        const nextMissions = prevMissions.filter(
          (mission) => mission.mid !== mid
        )
        dispatch(deleteMissionsAction(nextMissions))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const createFile = (mid, file, fileName) => {
  return async (dispatch) => {
    const uploadRef = storage.ref('mission_files').child(mid)
    const uploadTask = uploadRef.put(file)

    uploadTask
      .then(() => {
        return uploadTask.snapshot.ref.getDownloadURL()
      })
      .then((downloadURL) => {
        const fileData = { id: mid, path: downloadURL, file_name: fileName }
        const data = {
          file: fileData,
        }
        missionsRef
          .doc(mid)
          .set(data, { merge: true })
          .then(() => {
            dispatch(push('/mission'))
          })
          .catch((error) => {
            throw new Error(error)
          })
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const deleteFile = (mid) => {
  return async (dispatch) => {
    storage
      .ref('mission_files')
      .child(mid)
      .delete()
      .then(() => {
        dispatch(push('/mission'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const submitMissions = (mid, file, fileName) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    const userName = state.users.user_name

    const uploadRef = storage.ref('mission_files/' + mid).child(userId)
    const uploadTask = uploadRef.put(file)

    uploadTask
      .then(() => {
        return uploadTask.snapshot.ref.getDownloadURL()
      })
      .then((downloadURL) => {
        const fileData = { id: userId, path: downloadURL, file_name: fileName }
        const data = {
          creater_uid: userId,
          creater_name: userName,
          file: fileData,
        }

        missionsRef
          .doc(mid)
          .collection('submits')
          .doc(userId)
          .set(data, { merge: true })
          .then(() => {
            dispatch(push('/mission'))
          })
          .catch((error) => {
            throw new Error(error)
          })
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
