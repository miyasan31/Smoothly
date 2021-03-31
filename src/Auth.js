import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogin } from './reducks/users/selectors.js'
import { listenAuthState } from './reducks/users/operations.js'
import CircularProgress from '@material-ui/core/CircularProgress'

import TemplateTheme from './TemplateTheme.js'
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
  // if (!isSignedIn) {
  //   return (
  //     <TemplateTheme>
  //       <div className="flex_center pd_top_30px">
  //         <CircularProgress />
  //       </div>
  //     </TemplateTheme>
  //   )
  // } else {
  //   return <TemplateTheme>{children}</TemplateTheme>
  // }
}

export default Auth
