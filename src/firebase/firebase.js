import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
// import 'firebase/functions'
import { firebaseConfig } from './config.js'

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const FirebaseTimestamp = firebase.firestore.Timestamp
// export const functions = firebase.functions()
