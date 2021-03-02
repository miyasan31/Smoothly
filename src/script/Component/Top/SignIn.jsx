import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { UserIcon, KeyIcon } from '../../Images/image'
import {
  BlueInput,
  BlueButton,
  OrangeButton,
  GreenButton,
} from '../../MaterialUi/materialui'
import { signIn } from '../../../reducks/users/operations'

import Grid from '@material-ui/core/Grid'
/* ===================================================================== */
const SignIn = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // メールアドレス入力イベント
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    [setEmail]
  )
  // パスワード入力イベント
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value)
    },
    [setPassword]
  )
  //　ログインボタンクリック
  const handleClick = () => {
    dispatch(push('./reissue'))
  }

  return (
    <section className="top_main signin_theme">
      <div className="top_layout">
        <div className="my_entry_number">
          <h3>出品番号：名古屋PI011</h3>
        </div>
        <div className="comment">
          <h2>
            ようこそ！
            <span
              className="pointer"
              onClick={() => dispatch(push('./signin'))}
            >
              Smoothly
            </span>
            へ！
          </h2>
          <h2>　　君の学校生活を</h2>
          <h2>　　　　サポートするよ！</h2>
        </div>

        <div className="flex_grow"></div>

        <div className="form_box signin_theme">
          <div className="form">
            <h1>Smoothly</h1>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={1}>
                <UserIcon style={{ opacity: 0.5 }} />
              </Grid>
              <Grid item xs={11}>
                <BlueInput
                  fullWidth
                  autoFocus
                  multiline={false}
                  label={'メールアドレス'}
                  type={'email'}
                  value={email}
                  onChange={inputEmail}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item item xs={1}>
                <KeyIcon style={{ opacity: 0.5 }} />
              </Grid>
              <Grid item xs={11}>
                <BlueInput
                  fullWidth
                  multiline={false}
                  label={'パスワード'}
                  type={'password'}
                  value={password}
                  onChange={inputPassword}
                />
              </Grid>
            </Grid>
            <div className="space_25px"></div>

            <BlueButton
              fullWidth
              label={'ログイン'}
              onClick={() => dispatch(signIn(email, password))}
            />
            <div className="space_15px"></div>
            <OrangeButton
              fullWidth
              label={'新規登録'}
              onClick={() => dispatch(push('./signup'))}
            />
            <div className="space_15px"></div>
            <GreenButton
              fullWidth
              label={'パスワード再発行'}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
export default SignIn
