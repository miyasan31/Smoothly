import React, { useState, useCallback } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'

import {
  AppBarSubHeader,
  BlueButton,
  BlueButtonNomal,
  BlueInput,
  SelectBox,
} from '../../MaterialUi/materialui'
import { updateEmail, updatePassword } from '../../../reducks/users/operations'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

const AuthEdit = () => {
  const dispatch = useDispatch()
  const [choice, setChoice] = useState('email')
  const [email, seteEail] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [password, setePassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // 登録メールアドレス入力イベント
  const inputEmail = useCallback(
    (event) => {
      seteEail(event.target.value)
    },
    [seteEail]
  )
  // 新規メールアドレス入力イベント
  const inputNewEmail = useCallback(
    (event) => {
      setNewEmail(event.target.value)
    },
    [setNewEmail]
  )
  // 登録パスワード入力イベント
  const inputPassword = useCallback(
    (event) => {
      setePassword(event.target.value)
    },
    [setePassword]
  )
  // 新規パスワード入力イベント
  const inputNewPassword = useCallback(
    (event) => {
      setNewPassword(event.target.value)
    },
    [setNewPassword]
  )
  // キャンセルボタンクリック
  const backHandleClick = () => {
    dispatch(push('/setting'))
  }
  // 変更ボタンクリック
  const authUpdateHandleClick = () => {
    if (choice === 'email') {
      dispatch(updateEmail(email, password, newEmail))
    } else if (choice === 'password') {
      dispatch(updatePassword(email, password, newPassword))
    } else {
      alert('変更項目を選択して下さい。')
      return
    }
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'メールアドレス・パスワード変更'} />
      <div className="contents_style">
        <Paper className="paper">
          <Typography className="label">変更項目</Typography>
          <SelectBox options={choiceData} value={choice} select={setChoice} />
          <div className="space_20px"></div>

          <Typography className="label">現在のメールアドレス</Typography>
          <BlueInput
            type={'email'}
            fullWidth={true}
            required={true}
            multiline={true}
            autoFocus={false}
            value={email}
            onChange={inputEmail}
          />
          <div className="space_20px"></div>

          {choice === 'email' && (
            <>
              <Typography className="label">新しいメールアドレス</Typography>
              <BlueInput
                type={'email'}
                fullWidth={true}
                required={true}
                multiline={true}
                autoFocus={false}
                value={newEmail}
                onChange={inputNewEmail}
              />
              <div className="space_20px"></div>
            </>
          )}

          <Typography className="label">現在のパスワード</Typography>
          <BlueInput
            type={'password'}
            fullWidth={true}
            required={true}
            multiline={true}
            autoFocus={false}
            value={password}
            onChange={inputPassword}
          />
          <div className="space_20px"></div>

          {choice === 'password' && (
            <>
              <Typography className="label">新しいパスワード</Typography>
              <BlueInput
                type={'password'}
                fullWidth={true}
                required={true}
                multiline={true}
                autoFocus={false}
                value={newPassword}
                onChange={inputNewPassword}
              />
              <div className="space_20px"></div>
            </>
          )}

          <div className="right margin_top_20px">
            <BlueButtonNomal label={'キャンセル'} onClick={backHandleClick} />
            <BlueButton label={'変更'} onClick={authUpdateHandleClick} />
          </div>
        </Paper>
      </div>
    </section>
  )
}
export default AuthEdit

const choiceData = [
  { id: 'email', name: 'メールアドレス' },
  { id: 'password', name: 'パスワード' },
]
