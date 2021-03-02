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
  }

  return (
    <section className="main">
      {pid ? (
        <AppBarSubHeader subtitle={'連絡　ー編集ー'} />
      ) : (
        <AppBarSubHeader subtitle={'連絡　ー新規ー'} />
      )}

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
            label={null}
            type={'text'}
            fullWidth={true}
            multiline={true}
            value={title}
            defaultValue={title}
            onChange={inputTitle}
          />
          <div className="space_15px"></div>

          <Typography className="label">内容</Typography>
          <BlueInput
            label={null}
            type={'text'}
            fullWidth={true}
            multiline={true}
            value={item}
            defaultValue={item}
            onChange={inputItem}
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
                label={pid === '' ? '投稿' : '変更'}
                onClick={updateHandleClick}
              />
            </span>
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
