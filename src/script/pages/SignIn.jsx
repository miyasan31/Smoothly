import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import {
  BlueInput,
  BlueButton,
  OrangeButton,
  GreenButton,
} from '../components/M-ui'
import { signIn } from '../../reducks/users/operations'

import Grid from '@material-ui/core/Grid'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
/* ===================================================================== */
const SignIn = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('guest@gmail.com')
  const [password, setPassword] = useState('halnagoya')

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

  return (
    <section className="top_main signin_theme">
      <div className="top_layout">
        <div className="comment signin_comment">
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

        <div className="form_box signin_form">
          <div className="form">
            <h1>Smoothly</h1>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={1}>
                <PersonIcon color="action" />
              </Grid>
              <Grid item xs={11}>
                <BlueInput
                  fullWidth={true}
                  multiline={false}
                  label={'メールアドレス'}
                  type={'email'}
                  value={email}
                  defaultValue={email}
                  onChange={inputEmail}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item item xs={1}>
                <LockIcon color="action" />
              </Grid>
              <Grid item xs={11}>
                <BlueInput
                  fullWidth={true}
                  multiline={false}
                  label={'パスワード'}
                  type={'password'}
                  value={password}
                  defaultValue={password}
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
              onClick={() => dispatch(push('./reissue'))}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
export default SignIn
