import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { BlueInput, GreenButton } from '../../MaterialUi/materialui'
import { reIssue } from '../../../reducks/users/operations'
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

        <div className="form_box reissue_theme">
          <div className="form">
            <h1 className="pointer" onClick={() => dispatch(push('./signin'))}>
              Smoothly
            </h1>
            <div>
              <BlueInput
                fullWidth
                autoFocus
                multiline={false}
                label={'登録済みのメールアドレス'}
                type={'email'}
                value={email}
                onChange={inputEmail}
              />
            </div>
            <div className="space_25px"></div>

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
export default ReIssue
