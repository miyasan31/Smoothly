import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { MuiTextField, MuiButton } from '../components/M-ui'
import { reIssue } from '../../reducks/users/operations'
/* ===================================================================== */

export const ReIssue = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')

  // メールアドレス入力イベント
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    [setEmail]
  )
  // パスワード再発行ボタンクリック
  const handleClick = () => {
    dispatch(reIssue(email))
  }

  return (
    <section className="top_main reissue_theme">
      <div className="top_layout">
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
          <h2>　　忘れることは</h2>
          <h2>　　　　悪いことではないよ！</h2>
        </div>

        <div className="flex_grow"></div>

        <div className="form_box reissue_form">
          <div className="form">
            <h1 className="pointer" onClick={() => dispatch(push('./signin'))}>
              Smoothly
            </h1>
            <div>
              <MuiTextField
                error={false}
                type="email"
                fullWidth={true}
                variant="standard"
                multiline={false}
                label="登録済みのメールアドレス"
                value={email}
                autoFocus={true}
                onChange={inputEmail}
              />
            </div>
            <div className="space_25px"></div>

            <MuiButton
              fullWidth={true}
              variant="outlined"
              color="blue"
              label="パスワード再発行"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
