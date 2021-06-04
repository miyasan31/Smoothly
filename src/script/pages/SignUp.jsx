import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { MuiTextField, MuiSelectBox, MuiButton } from '../components/M-ui'
import { signUp } from '../../reducks/users/operations'
/* ===================================================================== */

export const SignUp = () => {
  const dispatch = useDispatch()
  const [userValue, setUserValue] = useState('')
  const [userName, setUserName] = useState('')
  const [gender, setGender] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const [className, setClassName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // 氏名入力イベント
  const inputUserName = useCallback(
    (event) => {
      setUserName(event.target.value)
    },
    [setUserName]
  )
  // ユーザー番号入力イベント
  const inputUserNumber = useCallback(
    (event) => {
      setUserNumber(event.target.value)
    },
    [setUserNumber]
  )
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
  // 確認用パスワード入力イベント
  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value)
    },
    [setConfirmPassword]
  )
  // 登録ボタンクリック
  const handleClick = () => {
    dispatch(
      signUp(
        userValue,
        userName,
        gender,
        userNumber,
        className,
        email,
        password,
        confirmPassword
      )
    )
  }

  return (
    <section className="top_main signup_theme">
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
          <h2>　　今日から君も</h2>
          <h2>　　　　Smoothlyの仲間だよ！</h2>
        </div>

        <div className="flex_grow"></div>

        <div className="form_box signup_form">
          <div className="form">
            <h1 className="pointer" onClick={() => dispatch(push('./signin'))}>
              Smoothly
            </h1>
            <MuiSelectBox
              fullWidth={true}
              options={user_value}
              label={'ユーザー属性'}
              value={userValue}
              select={setUserValue}
            />
            <MuiTextField
              error={false}
              type="text"
              fullWidth={true}
              variant="standard"
              multiline={false}
              label="メールアドレス"
              value={userName}
              autoFocus={false}
              onChange={inputUserName}
            />
            <div className="space_5px"></div>
            <MuiSelectBox
              fullWidth={true}
              options={genders}
              label={'性別'}
              value={gender}
              select={setGender}
            />
            <MuiTextField
              error={false}
              type="number"
              fullWidth={true}
              variant="standard"
              multiline={false}
              label={
                userValue === 'teacher' ? '教官番号（3桁）' : '学籍番号（5桁）'
              }
              value={userNumber}
              onChange={inputUserNumber}
              autoFocus={false}
            />
            {userValue !== 'teacher' ? (
              <>
                <div className="space_5px"></div>
                <MuiSelectBox
                  fullWidth={true}
                  options={class_name}
                  label={'クラス記号'}
                  value={className}
                  select={setClassName}
                />
              </>
            ) : null}
            <MuiTextField
              error={false}
              type="email"
              fullWidth={true}
              variant="standard"
              multiline={false}
              label="メールアドレス"
              value={email}
              autoFocus={false}
              onChange={inputEmail}
            />
            <MuiTextField
              error={false}
              type="password"
              fullWidth={true}
              variant="standard"
              multiline={false}
              label="パスワード"
              value={password}
              autoFocus={false}
              onChange={inputPassword}
            />
            <MuiTextField
              error={false}
              type="password"
              fullWidth={true}
              variant="standard"
              multiline={false}
              label="パスワード（確認用）"
              value={confirmPassword}
              autoFocus={false}
              onChange={inputConfirmPassword}
            />

            <div className="space_25px"></div>

            <MuiButton
              fullWidth={true}
              variant="outlined"
              color="orange"
              label="新規登録"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const user_value = [
  { id: 'teacher', name: '教官' },
  { id: 'student', name: '学生' },
]
const genders = [
  { id: 'man', name: '男性' },
  { id: 'lady', name: '女性' },
  { id: 'other', name: 'その他' },
]
const class_name = [
  { id: 'PI-11A-172', name: 'PI-11A-172' },
  { id: 'PW-11A-172', name: 'PW-11A-172' },
]
