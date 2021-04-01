import React, { useState, useCallback } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'

import { ActionCheckDialog } from '../components/Layout'
import {
  AppBarSubHeader,
  PinkButton,
  PinkButtonNomal,
  BlueInput,
  ErrorAlert,
} from '../components/M-ui'
import { userDelete } from '../../reducks/users/operations'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

const AuthEdit = () => {
  const dispatch = useDispatch()
  const [email, seteEail] = useState('')
  const [password, setePassword] = useState('')
  const [openCheckDialog, setOpenCheckDialog] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

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
  const handleUserDeleteClick = () => {
    setOpenAlert(false)
    dispatch(userDelete(email, password))
  }
  // 確認ダイアログ表示
  const checkHandleClick = () => {
    if (email && password) {
      setOpenAlert(false)
      setOpenCheckDialog(true)
    } else {
      setOpenAlert(true)
    }
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'退会'} />

      <ActionCheckDialog
        text={'退会してもよろしいですか？'}
        buttonLabel={'退会'}
        openDialog={openCheckDialog}
        setOpenDialog={setOpenCheckDialog}
        actionHandleClick={handleUserDeleteClick}
      />

      <div className="contents_style">
        {openAlert ? <ErrorAlert setOpenAlert={setOpenAlert} /> : null}

        <Paper className="paper">
          <Typography className="pd_top_10px" color="textSecondary">
            現在のメールアドレス
          </Typography>
          <BlueInput
            type={'email'}
            fullWidth={true}
            required={true}
            multiline={true}
            autoFocus={false}
            value={email}
            error={!email && openAlert ? true : false}
            onChange={inputEmail}
          />

          <Typography className="pd_top_10px" color="textSecondary">
            現在のパスワード
          </Typography>
          <BlueInput
            type={'password'}
            fullWidth={true}
            required={true}
            multiline={true}
            autoFocus={false}
            value={password}
            error={!password && openAlert ? true : false}
            onChange={inputPassword}
          />

          <div className="right mg_top_20px">
            <PinkButtonNomal label={'キャンセル'} onClick={backHandleClick} />
            <PinkButton label={'退会する'} onClick={checkHandleClick} />
          </div>
        </Paper>
      </div>
    </section>
  )
}
export default AuthEdit
