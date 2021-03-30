import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { BlueInput, OrangeButton, SelectBox } from '../../MaterialUi/materialui'
import { signUp } from '../../../reducks/users/operations'
/* ===================================================================== */

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

const SignUp = () => {
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
            <SelectBox
              options={user_value}
              label={'ユーザー属性'}
              value={userValue}
              select={setUserValue}
            />
            <BlueInput
              fullWidth
              multiline={false}
              label={'氏名'}
              type={'text'}
              value={userName}
              onChange={inputUserName}
            />
            <div className="pd_top_10px"></div>
            <SelectBox
              options={genders}
              label={'性別'}
              value={gender}
              select={setGender}
            />
            <BlueInput
              fullWidth
              multiline={false}
              label={
                userValue === 'teacher' ? '教官番号（3桁）' : '学籍番号（5桁）'
              }
              type={'number'}
              value={userNumber}
              onChange={inputUserNumber}
            />
            {userValue !== 'teacher' ? (
              <>
                <div className="pd_top_10px"></div>
                <SelectBox
                  options={class_name}
                  label={'クラス記号'}
                  value={className}
                  select={setClassName}
                />
              </>
            ) : null}
            <BlueInput
              fullWidth
              multiline={false}
              label={'メールアドレス'}
              type={'email'}
              value={email}
              onChange={inputEmail}
            />
            <BlueInput
              fullWidth
              multiline={false}
              label={'パスワード'}
              type={'password'}
              value={password}
              onChange={inputPassword}
            />
            <BlueInput
              fullWidth
              multiline={false}
              label={'パスワード（確認用）'}
              type={'password'}
              value={confirmPassword}
              onChange={inputConfirmPassword}
            />

            <div className="space_25px"></div>

            <OrangeButton fullWidth label={'新規登録'} onClick={handleClick} />
          </div>
        </div>
      </div>
    </section>
  )
}
export default SignUp
