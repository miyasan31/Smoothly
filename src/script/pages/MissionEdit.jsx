import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { CheckViewDialog } from '../components/Layout'
import {
  AppBarSubHeader,
  BlueButton,
  BlueButtonNomal,
  BlueInput,
  FileUpload,
  FileDelete,
  SelectBox,
  DateTimePicker,
  ErrorAlert,
} from '../components/M-ui'
import { createMissison } from '../../reducks/missions/operations'
import { checkExt } from '../../functions/function'
import { db } from '../../firebase/firebase'

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
  const [openDialog, setOpenDialog] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

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
    } else {
      const mission_title = '【科目記号】\t課題No.\t「課題主題」'
      const mission_item = '課題主題：\n提出方法：\n課題内容：\n課題目的：'
      setTitle(mission_title)
      setItem(mission_item)
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
  // 確認ダイアログ表示
  const checkHandleClick = () => {
    if (title && item && destination && limitTime) {
      setOpenAlert(false)
      setOpenDialog(true)
    } else {
      setOpenAlert(true)
    }
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={mid ? '課題　ー編集ー' : '課題　ー新規ー'} />

      <CheckViewDialog
        destination={destination}
        title={title}
        item={item}
        limitTime={limitTime}
        file={file}
        fileName={fileName}
        preview={preview}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        updateHandleClick={updateHandleClick}
      />

      <div className="contents_style">
        {openAlert ? <ErrorAlert setOpenAlert={setOpenAlert} /> : null}

        <Paper className="paper">
          <Typography className="pd_y_10px" color="textSecondary">
            投稿先
          </Typography>
          <SelectBox
            fullWidth={true}
            options={send}
            value={destination}
            error={!destination && openAlert ? true : false}
            select={setDestination}
          />

          <Typography className="pd_top_10px" color="textSecondary">
            タイトル
          </Typography>
          <BlueInput
            fullWidth={true}
            required={true}
            multiline={true}
            type={'text'}
            value={title}
            defaultValue={title}
            error={!title && openAlert ? true : false}
            onChange={inputTitle}
          />

          <Typography className="pd_top_10px" color="textSecondary">
            内容
          </Typography>
          <BlueInput
            fullWidth={true}
            required={true}
            multiline={true}
            type={'text'}
            value={item}
            defaultValue={item}
            error={!item && openAlert ? true : false}
            onChange={inputItem}
          />

          <Typography className="pd_top_10px" color="textSecondary">
            提出期限
          </Typography>
          <DateTimePicker
            fullWidth={true}
            value={limitTime}
            ampm={false}
            error={!limitTime && openAlert ? true : false}
            onChange={inputDate}
          />

          <Typography className="pd_y_10px" color="textSecondary">
            添付ファイル
          </Typography>

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
            <>
              <div className="pd_20px">{fileName}</div>
              <img src={preview} alt="ファイル" className="full_width" />
            </>
          ) : (
            <div className="pd_20px">{fileName}</div>
          )}

          <div className="right mg_top_20px">
            <BlueButtonNomal label={'キャンセル'} onClick={backHandleClick} />
            <BlueButton label="確認" onClick={checkHandleClick} />
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
