import React, { useState, useCallback } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'

import {
  AppBarSubHeader,
  PinkButton,
  PinkButtonNomal,
  BlueInput,
} from '../../MaterialUi/materialui'
import { userDelete } from '../../../reducks/users/operations'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

const AuthEdit = () => {
  const dispatch = useDispatch()
  const [email, seteEail] = useState('')
  const [password, setePassword] = useState('')

  // メールアドレス入力イベント
  const inputEmail = useCallback(
    (event) => {
      seteEail(event.target.value)
    },
    [seteEail]
  )
  // パスワード入力イベント
  const inputPassword = useCallback(
    (event) => {
      setePassword(event.target.value)
    },
    [setePassword]
  )
  // キャンセルボタンクリック
  const backHandleClick = () => {
    dispatch(push('/setting'))
  }
  // 退会するボタンクリック
  const handleUserDelete = () => {
    dispatch(userDelete(email, password))
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'退会'} />
      <div className="contents_style">
        <Paper className="paper">
          <Typography className="label pd_top_10px">
            現在のメールアドレス
          </Typography>
          <BlueInput
            type={'email'}
            fullWidth={true}
            required={true}
            multiline={true}
            autoFocus={false}
            value={email}
            onChange={inputEmail}
          />

          <Typography className="label pd_top_10px">
            現在のパスワード
          </Typography>
          <BlueInput
            type={'password'}
            fullWidth={true}
            required={true}
            multiline={true}
            autoFocus={false}
            value={password}
            onChange={inputPassword}
          />

          <div className="flex mg_top_20px">
            <div className="flex_grow"></div>
            <PinkButtonNomal label={'キャンセル'} onClick={backHandleClick} />
            <PinkButton label={'退会する'} onClick={handleUserDelete} />
          </div>
        </Paper>
      </div>
    </section>
  )
}
export default AuthEdit
