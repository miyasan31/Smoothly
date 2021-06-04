import React, { useState, useCallback } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'

import {
  AppBarSubHeader,
  MuiTextField,
  MuiButton,
  MuiErrorBar,
  ActionCheckDialog,
} from '../components/M-ui'
import { userDelete } from '../../reducks/users/operations'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

export const UserDelete = () => {
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
        {openAlert ? <MuiErrorBar setOpenAlert={setOpenAlert} /> : null}

        <Paper className="paper">
          <Typography className="pd_top_10px" color="textSecondary">
            現在のメールアドレス
          </Typography>
          <MuiTextField
            type="email"
            fullWidth={true}
            value={email}
            onChange={inputEmail}
            error={!email && openAlert ? true : false}
          />

          <Typography className="pd_top_10px" color="textSecondary">
            現在のパスワード
          </Typography>
          <MuiTextField
            type="password"
            fullWidth={true}
            value={password}
            onChange={inputPassword}
            error={!password && openAlert ? true : false}
          />

          <div className="right mg_top_20px">
            <MuiButton
              fullWidth={false}
              variant="text"
              color="pinkNomal"
              label="キャンセル"
              onClick={backHandleClick}
            />
            <MuiButton
              fullWidth={false}
              variant="outlined"
              color="pink"
              label="退会する"
              onClick={checkHandleClick}
            />
          </div>
        </Paper>
      </div>
    </section>
  )
}
