import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { CheckViewDialog } from '../render'
import {
  AppBarSubHeader,
  BlueButton,
  BlueButtonNomal,
  BlueInput,
  FileUpload,
  FileDelete,
  SelectBox,
  ErrorAlert,
} from '../../MaterialUi/materialui'
import { checkExt } from '../../../functions/function'
import { db } from '../../../firebase/firebase'
import { createPost } from '../../../reducks/posts/operations'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

const PostEdit = () => {
  const dispatch = useDispatch()
  const [pid, setPid] = useState('')
  const [destination, setDestination] = useState('')
  const [title, setTitle] = useState('')
  const [item, setItem] = useState('')
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('')
  const [preview, setPreview] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  useEffect(() => {
    // URLからpidを取得
    const id = window.location.pathname.split('/post/edit')[1]
    if (id !== '') {
      setPid(id.split('/')[1])
    }
    // pidが存在すれば投稿情報を取得する
    if (pid !== '') {
      db.collection('posts')
        .doc(pid)
        .get()
        .then((snapshot) => {
          const post = snapshot.data()
          setDestination(post.destination)
          setTitle(post.title)
          setItem(post.item)
          if (post.file) {
            setFileName(post.file.file_name)
            setPreview(post.file.path)
          }
        })
    }
  }, [pid])
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
    dispatch(push('/post'))
  }
  // 投稿ボタンクリック
  const updateHandleClick = () => {
    dispatch(createPost(pid, destination, title, item, file, fileName))
    setOpenDialog(false)
  }
  // 確認ダイアログ表示
  const checkHandleClick = () => {
    if (title && item && destination) {
      setOpenAlert(false)
      setOpenDialog(true)
    } else {
      setOpenAlert(true)
    }
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={pid ? '連絡　ー編集ー' : '連絡　ー新規ー'} />

      <CheckViewDialog
        destination={destination}
        title={title}
        item={item}
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
          <Typography className="label pd_y_10px">投稿先</Typography>
          <SelectBox
            options={send}
            value={destination}
            error={!destination && openAlert ? true : false}
            select={setDestination}
          />

          <Typography className="label pd_top_10px">タイトル</Typography>
          <BlueInput
            label={null}
            type={'text'}
            fullWidth={true}
            multiline={true}
            value={title}
            defaultValue={title}
            error={!title && openAlert ? true : false}
            onChange={inputTitle}
          />

          <Typography className="label pd_top_10px">内容</Typography>
          <BlueInput
            label={null}
            type={'text'}
            fullWidth={true}
            multiline={true}
            value={item}
            defaultValue={item}
            error={!item && openAlert ? true : false}
            onChange={inputItem}
          />

          <Typography className="label pd_y_10px">添付ファイル</Typography>

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
export default PostEdit

const send = [
  { id: 'all', name: '全体' },
  { id: 'teacher', name: '全教官' },
  { id: 'student', name: '全学生' },
  { id: 'PI-11A-172', name: 'PI-11A-172' },
  { id: 'PW-11A-172', name: 'PW-11A-172' },
]
