import { push } from 'connected-react-router'
import { db, FirebaseTimestamp, storage } from '../../firebase/firebase'
import { readPostsAction, deletePostsAction } from './actions.js'
/* ===================================================================== */

const postsRef = db.collection('posts')

export const readPosts = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    const className = state.users.class_name
    const userValue = state.users.user_value

    postsRef
      .orderBy('update_time', 'desc')
      .get()
      .then((snapshots) => {
        // .onSnapshot((snapshots) => {
        const postList = []
        snapshots.forEach((snapshot) => {
          const post = snapshot.data()
          if (post.destination === 'all') {
            postList.push(post)
          } else if (post.destination === userValue) {
            postList.push(post)
          } else if (post.destination === className) {
            postList.push(post)
          } else if (post.creater_uid === userId) {
            postList.push(post)
          }
        })
        dispatch(readPostsAction(postList))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const createPost = (pid, destination, title, item, file, fileName) => {
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
    if (nullData !== '') {
      alert(`項目：${nullData}を入力してください。`)
      return false
    }

    const timestamp = FirebaseTimestamp.now()
    const state = getState()
    const userId = state.users.uid
    let data = {}
    if (fileName === '') {
      data = {
        destination: destination,
        title: title,
        item: item,
        file: '',
        creater_uid: userId,
        update_time: timestamp,
      }
    } else {
      data = {
        destination: destination,
        title: title,
        item: item,
        creater_uid: userId,
        update_time: timestamp,
      }
    }

    if (pid === '') {
      const ref = postsRef.doc()
      data.created_time = timestamp
      // 要注意！！ドキュメントのIDだよ！
      pid = ref.id
      data.pid = pid
    }

    return postsRef
      .doc(pid)
      .set(data, { merge: true })
      .then(() => {
        if (fileName !== '' && file === '') {
          dispatch(push('/post'))
        } else if (fileName === '' && file === '') {
          dispatch(push('/post'))
        } else {
          dispatch(createFile(pid, file, fileName))
        }
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const deletePost = (pid) => {
  return async (dispatch, getState) => {
    const check = window.confirm('削除してよろしいですか？')
    if (check) {
      postsRef
        .doc(pid)
        .delete()
        .then(() => {
          storage.ref('post_files').child(pid).delete()
          const prevPosts = getState().posts.list
          const nextPosts = prevPosts.filter((post) => post.pid !== pid)
          dispatch(deletePostsAction(nextPosts))
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }
}

export const createFile = (pid, file, fileName) => {
  return async (dispatch) => {
    const uploadRef = storage.ref('post_files').child(pid)
    const uploadTask = uploadRef.put(file)

    uploadTask
      .then(() => {
        return uploadTask.snapshot.ref.getDownloadURL()
      })
      .then((downloadURL) => {
        const fileData = { id: pid, path: downloadURL, file_name: fileName }
        const data = {
          file: fileData,
        }
        postsRef
          .doc(pid)
          .set(data, { merge: true })
          .then(() => {
            dispatch(push('/post'))
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

export const deleteFile = (pid) => {
  return async (dispatch) => {
    storage
      .ref('post_files')
      .child(pid)
      .delete()
      .then(() => {
        dispatch(push('/post'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
