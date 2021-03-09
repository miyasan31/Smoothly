import { push } from 'connected-react-router'
import {
  auth,
  storage,
  db,
  FirebaseTimestamp,
} from '../../firebase/firebase.js'
import { signInAction, signOutAction } from './actions'
import {
  isValidEmailFormat,
  isValidRequiredInput,
} from '../../functions/function.js'
/* ===================================================================== */

const usersRef = db.collection('users')

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (!isValidRequiredInput(email, password)) {
      alert('全ての項目を入力してください。')
      return false
    }
    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。')
      return false
    }

    return auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const userState = result.user

        if (!userState) {
          throw new Error('ユーザーIDを取得できません')
        }
        const userId = userState.uid

        usersRef
          .doc(userId)
          .get()
          .then((snapshot) => {
            const data = snapshot.data()
            if (!data) {
              throw new Error('ユーザーデータが存在しません')
            }

            dispatch(
              signInAction({
                is_signin: true,
                uid: data.uid,
                icon: data.icon,
                user_name: data.user_name,
                user_value: data.user_value,
                user_number: data.user_number,
                class_name: data.class_name,
              })
            )
            dispatch(push('/post'))
          })
      })
      .catch((error) => {
        var errorCode = error.code
        const errmsg = ErrorMessage(errorCode)
        alert(errorCode + ' : ' + errmsg)
      })
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(signOutAction())
        dispatch(push('./signin'))
      })
      .catch(() => {
        throw new Error('サインアウトに失敗しました。')
      })
  }
}

export const signUp = (
  userValue,
  userName,
  gender,
  userNumber,
  className,
  email,
  password,
  confirmPassword
) => {
  return async (dispatch) => {
    // 教官-------------------------------------------------------
    if (userValue === 'teacher') {
      if (
        !isValidRequiredInput(
          userName,
          gender,
          userNumber,
          email,
          password,
          confirmPassword
        )
      ) {
        alert('全ての項目を入力してください。')
        return false
      }
      if (userNumber.length !== 3) {
        alert('教官番号は3桁の数字で入力してください。')
        return false
      }
    }
    // 学生-------------------------------------------------------
    else if (userValue === 'student') {
      if (
        !isValidRequiredInput(
          userName,
          gender,
          userNumber,
          className,
          email,
          password,
          confirmPassword
        )
      ) {
        alert('全ての項目を入力してください。')
        return false
      }
      if (userNumber.length !== 5) {
        alert('学籍番号は5桁の数字で入力してください。')
        return false
      }
    } else {
      alert('ユーザー属性を選択してください。')
      return false
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。')
      return false
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致しません。')
      return false
    }

    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user

        if (user) {
          const uid = user.uid
          const timeStamp = FirebaseTimestamp.now()

          const userInitialData = {
            uid: uid,
            user_value: userValue,
            gender: gender,
            user_name: userName,
            user_number: userNumber,
            class_name: className,
            email: email,
            prof: '',
            icon: '',
            update_time: timeStamp,
            create_time: timeStamp,
          }
          if (userInitialData.class_name === '') {
            userInitialData.class_name = '教官'
          }
          usersRef
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push('/post'))
            })
        }
      })
      .catch((error) => {
        var errorCode = error.code
        const errmsg = ErrorMessage(errorCode)
        alert(errorCode + ' : ' + errmsg)
      })
  }
}

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const timeStamp = FirebaseTimestamp.now()
            const timeData = {
              update_time: timeStamp,
            }

            usersRef.doc(user.uid).set(timeData, { merge: true })

            const data = snapshot.data()
            dispatch(
              signInAction({
                is_signin: true,
                uid: data.uid,
                icon: data.icon,
                user_name: data.user_name,
                user_value: data.user_value,
                user_number: data.user_number,
                class_name: data.class_name,
              })
            )
            dispatch(push('/post'))
          })
      } else dispatch(push('/signin'))
    })
  }
}

export const reIssue = (email) => {
  return async (dispatch) => {
    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。')
      return false
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert(
            '入力されたメールアドレスにパスワード再発行用のメールを送りました。'
          )
          dispatch(push('./signin'))
        })
        .catch(() => {
          alert('登録されていないメールアドレスです。もう一度ご確認ください。')
        })
    }
  }
}

export const createProf = (uid, prof, blob) => {
  return async (dispatch) => {
    const data = {
      prof: prof,
    }
    usersRef
      .doc(uid)
      .set(data, { merge: true })
      .then(() => {
        if (blob === null) {
          dispatch(push('setting'))
        } else {
          dispatch(createIcon(uid, blob))
        }
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const createIcon = (uid, blob) => {
  return async (dispatch) => {
    const uploadRef = storage.ref('icons').child(uid)
    const uploadTask = uploadRef.put(blob, { contentType: blob.type })
    uploadTask
      .then(() => {
        return uploadTask.snapshot.ref.getDownloadURL()
      })
      .then((downloadURL) => {
        const iconData = { id: uid, path: downloadURL }
        const data = {
          icon: iconData,
        }
        usersRef
          .doc(uid)
          .set(data, { merge: true })
          .then(() => {
            dispatch(push('/setting'))
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

export const updateEmail = (email, password, newEmail) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    const data = {
      email: newEmail,
    }
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user.updateEmail(newEmail)
        usersRef.doc(userId).set(data, { merge: true })
        dispatch(push('/setting'))
      })
      .catch((error) => {
        var errorCode = error.code
        const errmsg = ErrorMessage(errorCode)
        alert(errorCode + ' : ' + errmsg)
      })
  }
}

export const updatePassword = (email, password, newPassword) => {
  return async (dispatch) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        userCredential.user.updatePassword(newPassword)
        dispatch(push('/setting'))
      })
      .catch((error) => {
        var errorCode = error.code
        const errmsg = ErrorMessage(errorCode)
        alert(errorCode + ' : ' + errmsg)
      })
  }
}

export const userDelete = (email, password) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    const check = window.confirm('本当に退会してもよろしいですか？')
    if (check) {
      return auth
        .signInWithEmailAndPassword(email, password)
        .then(function (userCredential) {
          userCredential.user.delete()
          usersRef.doc(userId).delete()
          storage.ref('icons').child(userId).delete()
          dispatch(push('/signin'))
          alert('Smoothlyをご利用いただき ありがとうございました。')
        })
        .catch((error) => {
          var errorCode = error.code
          const errmsg = ErrorMessage(errorCode)
          alert(errorCode + ' : ' + errmsg)
        })
    }
  }
}

const ErrorMessage = (e) => {
  switch (e) {
    case 'auth/cancelled-popup-request':
    case 'auth/popup-closed-by-user':
      return null
    case 'auth/email-already-in-use':
      return 'このメールアドレスは使用されています'
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません'
    case 'auth/user-disabled':
      return 'サービスの利用が停止されています'
    case 'auth/user-not-found':
      return 'メールアドレスまたはパスワードが違います'
    case 'auth/user-mismatch':
      return 'メールアドレスまたはパスワードが違います'
    case 'auth/weak-password':
      return 'パスワードは6文字以上にしてください'
    case 'auth/wrong-password':
      return 'メールアドレスまたはパスワードが違います'
    case 'auth/popup-blocked':
      return '認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください'
    case 'auth/operation-not-supported-in-this-environment':
    case 'auth/auth-domain-config-required':
    case 'auth/operation-not-allowed':
    case 'auth/unauthorized-domain':
      return '現在この認証方法はご利用頂けません'
    case 'auth/requires-recent-login':
      return '認証の有効期限が切れています'
    default:
      return '認証に失敗しました。しばらく時間をおいて再度お試しください'
  }
}
