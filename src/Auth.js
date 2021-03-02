import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogin } from './reducks/users/selectors.js'
import { listenAuthState } from './reducks/users/operations.js'
/* ===================================================================== */

const Auth = ({ children }) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsLogin(selector)

  // セッションチェック
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, [])

  if (!isSignedIn) {
    return <></>
  } else {
    return children
  }
}

export default Auth
