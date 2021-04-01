import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogin } from './reducks/users/selectors.js'
import { listenAuthState } from './reducks/users/operations.js'
import CircularProgress from '@material-ui/core/CircularProgress'
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
    return (
      <div className="flex_center pd_top_30px">
        <CircularProgress />
      </div>
    )
  } else {
    return <div>{children}</div>
  }
}

export default Auth
