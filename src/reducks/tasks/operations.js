import { push } from 'connected-react-router'

import { db } from '../../firebase/firebase'
import {
  readDoingTasksAction,
  readCompletedTasksAction,
  updateDoingTaskAction,
  updateCompletedTaskAction,
} from './actions.js'
/* ===================================================================== */

const usersRef = db.collection('users')

export const readTasks = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid

    usersRef
      .doc(userId)
      .collection('tasks')
      .where('tag', '==', '4')
      .get()
      .then((snapshots) => {
        const myTaskData = []
        if (snapshots.length !== 0) {
          snapshots.forEach((snapshot) => {
            const task = snapshot.data()
            const taskData = {
              tid: task.tid,
              title: task.title,
              startDate: task.startDate,
              endDate: task.endDate,
            }
            myTaskData.push(taskData)
          })
        }
        myTaskData.sort((a, b) => {
          if (a.startDate < b.startDate) return -1
          if (a.startDate > b.startDate) return 1
          return 0
        })
        dispatch(readDoingTasksAction(myTaskData))
      })
    usersRef
      .doc(userId)
      .collection('tasks')
      .where('tag', '==', '5')
      .get()
      .then((snapshots) => {
        const myTaskData = []
        if (snapshots.length !== 0) {
          snapshots.forEach((snapshot) => {
            const task = snapshot.data()
            const taskData = {
              tid: task.tid,
              title: task.title,
              startDate: task.startDate,
              endDate: task.endDate,
            }
            myTaskData.push(taskData)
          })
        }
        myTaskData.sort((a, b) => {
          if (a.startDate < b.startDate) return -1
          if (a.startDate > b.startDate) return 1
          return 0
        })
        dispatch(readCompletedTasksAction(myTaskData))
      })
  }
}

export const addTask = (tid, title, startDate, endDate) => {
  return async (dispatch, getState) => {
    let nullData = ''
    if (title === '') {
      nullData = nullData + '【タスク名】'
    }
    if (startDate === null) {
      nullData = nullData + '【開始時刻】'
    }
    if (endDate === null) {
      nullData = nullData + '【終了時刻】'
    }
    if (nullData !== '') {
      alert(`項目：${nullData}を入力してください。`)
      return false
    }
    if (endDate < startDate) {
      alert('開始時刻よりも後の時刻を入力してください')
      return false
    }

    const state = getState()
    const userId = state.users.uid
    const data = {
      title: title,
      startDate: startDate,
      endDate: endDate,
      tag: '4',
    }
    if (tid === '') {
      const ref = usersRef.doc(userId).collection('tasks').doc()
      // 要注意！！ドキュメントのIDだよ！
      tid = ref.id
      data.tid = tid
    }

    return usersRef
      .doc(userId)
      .collection('tasks')
      .doc(tid)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push('/task'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const updateDoingTask = (tid) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    const data = {
      tag: '5',
    }
    return usersRef
      .doc(userId)
      .collection('tasks')
      .doc(tid)
      .set(data, { merge: true })
      .then(() => {
        const doingTasks = getState().doing_tasks.list
        const nextDoingTasks = doingTasks.filter(
          (product) => product.tid !== tid
        )
        dispatch(updateDoingTaskAction(nextDoingTasks))
        const completedTasks = getState().completed_tasks.list
        const checkedTasks = doingTasks.filter((product) => product.tid === tid)
        completedTasks.unshift(checkedTasks[0])
        dispatch(updateCompletedTaskAction(completedTasks))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const updateCompletedTask = (tid) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    const data = {
      tag: '4',
    }
    return usersRef
      .doc(userId)
      .collection('tasks')
      .doc(tid)
      .set(data, { merge: true })
      .then(() => {
        const completedTasks = getState().completed_tasks.list
        const nextCompletedTasks = completedTasks.filter(
          (product) => product.tid !== tid
        )
        dispatch(updateCompletedTaskAction(nextCompletedTasks))
        const doingTasks = getState().doing_tasks.list
        const checkedTasks = completedTasks.filter(
          (product) => product.tid === tid
        )
        doingTasks.unshift(checkedTasks[0])
        dispatch(updateDoingTaskAction(doingTasks))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const deleteDoingTask = (tid) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    return usersRef
      .doc(userId)
      .collection('tasks')
      .doc(tid)
      .delete()
      .then(() => {
        const doingTasks = getState().doing_tasks.list
        const nextDoingTasks = doingTasks.filter(
          (product) => product.tid !== tid
        )
        dispatch(updateDoingTaskAction(nextDoingTasks))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const deleteCompletedTask = (tid) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    return usersRef
      .doc(userId)
      .collection('tasks')
      .doc(tid)
      .delete()
      .then(() => {
        const completedTasks = getState().completed_tasks.list
        const nextCompletedTasks = completedTasks.filter(
          (product) => product.tid !== tid
        )
        dispatch(updateCompletedTaskAction(nextCompletedTasks))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
