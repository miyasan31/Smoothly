import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import {
  AppBarSubHeader,
  BlueButton,
  BlueButtonNomal,
  BlueInput,
  FileUpload,
  FileDelete,
  SelectBox,
  DateTimePicker,
} from '../../MaterialUi/materialui'
import { checkExt } from '../../../functions/function'
import { db } from '../../../firebase/firebase'
import { createMissison } from '../../../reducks/missions/operations'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

const MissionEdit = () => {
  const dispatch = useDispatch()
  const [mid, setMid] = useState('')
  const [destination, setDestination] = useState('')
  const [title, setTitle] = useState('')
  const [item, setItem] = useState('')
  const [limitTime, setLimitTime] = useState('')
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('')
  const [preview, setPreview] = useState('')

  useEffect(() => {
    // URLからmidを取得
    const id = window.location.pathname.split('/mission/edit')[1]
    if (id !== '') {
      setMid(id.split('/')[1])
    }
    // midが存在すれば投稿情報を取得する
    if (mid !== '') {
      db.collection('missions')
        .doc(mid)
        .get()
        .then((snapshot) => {
          const mission = snapshot.data()
          setDestination(mission.destination)
          setTitle(mission.title)
          setItem(mission.item)
          const limit = mission.limit_time.toDate()
          setLimitTime(limit)
          if (mission.file) {
            setFileName(mission.file.file_name)
            setPreview(mission.file.path)
          }
        })
    }
  }, [mid])
  // タイトル入力イベント
  const inputTitle = useCallback(
    (event) => {
      setTitle(event.target.value)
    },
    [setTitle]
  )
  // 内容入力イベント
  const inputItem = useCallback(
    (event) => {
      setItem(event.target.value)
    },
    [setItem]
  )
  // 提出期限入力イベント
  const inputDate = (date) => {
    setLimitTime(date)
  }
  // ファイル選択ボタンクリック
  const inputFile = useCallback(
    (event) => {
      const file = event.target.files
      setFile(new Blob(file, { type: '.pdf, image/*, .doc/, .xls' }))
      // スラッシュの削除
      const filePath = event.target.value.split(/\\|\\/)
      setFileName(filePath[filePath.length - 1])
      // プレビュー表示
      const { files } = event.target
      setPreview(window.URL.createObjectURL(files[0]))
    },
    [setFile]
  )
  // ファイル削除ボタンクリック
  const deleteFile = () => {
    setFile('')
    setFileName('')
    setPreview('')
  }
  // キャンセルボタンクリック
  const backHandleClick = () => {
    dispatch(push('/mission'))
  }
  // 投稿ボタンクリック
  const updateHandleClick = () => {
    dispatch(
      createMissison(mid, destination, title, item, limitTime, file, fileName)
    )
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'課題作成'} />

      <div className="contents_style">
        <Paper className="paper">
          <Typography className="label">投稿先</Typography>
          <SelectBox
            options={send}
            value={destination}
            select={setDestination}
          />
          <div className="space_15px"></div>

          <Typography className="label">タイトル</Typography>
          <BlueInput
            fullWidth={true}
            required={true}
            multiline={true}
            type={'text'}
            value={title}
            defaultValue={mid === '' ? mission_title : title}
            onChange={inputTitle}
          />
          <div className="space_15px"></div>

          <Typography className="label">内容</Typography>
          <BlueInput
            fullWidth={true}
            required={true}
            multiline={true}
            type={'text'}
            value={item}
            defaultValue={mid === '' ? mission_item : item}
            onChange={inputItem}
          />
          <div className="space_15px"></div>

          <Typography className="label">提出期限</Typography>
          <DateTimePicker
            fullWidth={true}
            value={limitTime}
            ampm={false}
            onChange={inputDate}
          />
          <div className="space_15px"></div>

          <Typography className="label">添付ファイル</Typography>
          <div className="space_10px"></div>

          {fileName ? (
            <FileDelete onClick={deleteFile} label={'ファイルを削除'} />
          ) : (
            <FileUpload
              file={file}
              setFile={inputFile}
              label={'ファイルを選択'}
            />
          )}

          {fileName && checkExt(fileName) ? (
            <div>
              <div className="padding_20px">{fileName}</div>
              <img src={preview} alt="ファイル" className="full_width" />
            </div>
          ) : (
            <div>
              <div className="padding_20px">{fileName}</div>
            </div>
          )}

          <div className="right margin_top_20px">
            <span>
              <BlueButtonNomal label={'キャンセル'} onClick={backHandleClick} />
              <BlueButton
                label={mid === '' ? '投稿' : '変更'}
                onClick={() => updateHandleClick()}
              />
            </span>
          </div>
        </Paper>
      </div>
    </section>
  )
}
export default MissionEdit

const send = [
  { id: 'student', name: '全学生' },
  { id: 'PI-11A-172', name: 'PI-11A-172' },
  { id: 'PW-11A-172', name: 'PW-11A-172' },
]

const mission_title = '【科目記号】\t課題No.\t「課題主題」'
const mission_item = '課題主題：\n提出方法：\n課題内容：\n課題目的：'
