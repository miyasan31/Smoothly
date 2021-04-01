import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { IconCropper } from '../components/Setting'
import {
  AppBarSubHeader,
  IconUpload,
  BlueButton,
  BlueButtonNomal,
  BlueInputOutlined,
  ErrorAlert,
} from '../components/M-ui'
import { createProf } from '../../reducks/users/operations'
import { getUserId } from '../../reducks/users/selectors'
import { db } from '../../firebase/firebase'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

const ProfEdit = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const current_uid = getUserId(selector)
  const [prof, setProf] = useState('')
  const [blob, setBlob] = useState(null)
  const [inputImg, setInputImg] = useState('')
  const [openAlert, setOpenAlert] = useState(false)

  // ユーザーの自己紹介文を取得
  useEffect(() => {
    db.collection('users')
      .doc(current_uid)
      .get()
      .then((snapshots) => {
        const userData = snapshots.data()
        if (userData.prof !== '') {
          setProf(userData.prof)
        } else {
          setProf(example)
        }
      })
  }, [])
  // クロップデータセットイベント
  const getBlob = (blob) => {
    setBlob(blob)
  }
  // 自己紹介文入力イベント
  const inputProf = useCallback(
    (event) => {
      setProf(event.target.value)
    },
    [setProf]
  )
  // キャンセルボタンクリック
  const backHandleClick = () => {
    dispatch(push('/setting'))
    setProf('')
    setBlob(null)
    setInputImg('')
  }
  // 保存ボタンクリック
  const updateHandleClick = () => {
    if (prof) {
      setOpenAlert(false)
      dispatch(createProf(current_uid, prof, blob))
    } else {
      setOpenAlert(true)
    }
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'プロフィール編集'} />

      <div className="contents_style">
        {openAlert ? <ErrorAlert setOpenAlert={setOpenAlert} /> : null}

        <Paper className="paper">
          <Typography
            variant="body1"
            className="pd_y_10px"
            color="textSecondary"
          >
            アイコン
          </Typography>
          <div className="image">
            {inputImg === '' ? (
              <IconUpload
                label={'ファイルを選択'}
                fullWidth={false}
                setInputImg={setInputImg}
              />
            ) : (
              <IconCropper getBlob={getBlob} inputImg={inputImg} />
            )}
          </div>

          <Typography
            variant="body1"
            className="pd_y_10px"
            color="textSecondary"
          >
            自己紹介文
          </Typography>
          <BlueInputOutlined
            fullWidth={true}
            required={true}
            multiline={true}
            autoFocus={false}
            value={prof}
            error={!prof && openAlert ? true : false}
            onChange={inputProf}
          />

          <div className="right mg_top_20px">
            <BlueButtonNomal label={'キャンセル'} onClick={backHandleClick} />
            <BlueButton label={'保存'} onClick={updateHandleClick} />
          </div>
        </Paper>
      </div>
    </section>
  )
}
export default ProfEdit

const example =
  '【自己紹介】\n　年齢：\n　学科：\n　出身：\n\n【趣味・特技】\n\n【目標】\n\n【コメント】'
