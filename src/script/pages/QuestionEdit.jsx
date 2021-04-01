import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { CheckViewDialog } from '../components/Layout'
import { QuestionComponent } from '../components/Question'
import {
  AppBarSubHeader,
  BlueButton,
  BlueInput,
  BlueButtonNomal,
  SelectBox,
  DateTimePicker,
  ErrorAlert,
} from '../components/M-ui'
import {
  createQuestions,
  readQuestionItem,
} from '../../reducks/questions/operations'
import { db } from '../../firebase/firebase'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

const QuestionEdit = () => {
  const dispatch = useDispatch()
  const [qid, setQid] = useState('')
  const [destination, setDestination] = useState('')
  const [title, setTitle] = useState('')
  const [item, setItem] = useState('')
  const [limitTime, setLimitTime] = useState('')
  const [questionData, setQuestionData] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  useEffect(() => {
    // URLからqidを取得
    const id = window.location.pathname.split('/question/edit')[1]
    if (id !== '') {
      setQid(id.split('/')[1])
    }
    // qidが存在すれば投稿情報を取得する
    if (qid !== '') {
      db.collection('questions')
        .doc(qid)
        .get()
        .then((snapshot) => {
          const question = snapshot.data()
          setDestination(question.destination)
          setTitle(question.title)
          setItem(question.item)
          const limit = question.limit_time.toDate()
          setLimitTime(limit)
          const questionData = question.question_data
          dispatch(readQuestionItem(questionData))
        })
    }
  }, [qid])
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
  // 回答期限入力イベント
  const inputDate = (date) => {
    setLimitTime(date)
  }
  // キャンセルボタンクリック
  const backHandleClick = () => {
    dispatch(push('/question'))
  }
  // 投稿ボタンクリック
  const updateHandleClick = () => {
    dispatch(
      createQuestions(qid, destination, title, item, limitTime, questionData)
    )
    setOpenDialog(false)
  }
  // 確認ダイアログ表示
  const checkHandleClick = () => {
    if (
      title &&
      item &&
      destination &&
      limitTime &&
      questionData.length !== 0
    ) {
      setOpenAlert(false)
      setOpenDialog(true)
    } else {
      setOpenAlert(true)
    }
  }

  return (
    <section className="main">
      <AppBarSubHeader
        subtitle={qid ? 'アンケート　ー編集ー' : 'アンケート　ー新規ー'}
      />

      <CheckViewDialog
        destination={destination}
        title={title}
        item={item}
        questionData={questionData}
        limitTime={limitTime}
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
            options={send}
            value={destination}
            error={!destination && openAlert ? true : false}
            select={setDestination}
          />

          <Typography className="pd_top_10px" color="textSecondary">
            タイトル
          </Typography>
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

          <Typography className="pd_top_10px" color="textSecondary">
            内容
          </Typography>
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

          <Typography className="pd_top_10px" color="textSecondary">
            回答期限
          </Typography>
          <DateTimePicker
            ampm={false}
            fullWidth={true}
            value={limitTime}
            error={!limitTime && openAlert ? true : false}
            onChange={inputDate}
          />

          <Typography className="pd_top_10px" color="textSecondary">
            質問作成
          </Typography>

          <QuestionComponent
            error={questionData.length === 0 && openAlert ? true : false}
            setQuestionData={setQuestionData}
          />

          <div className="right mg_top_20px">
            <BlueButtonNomal label={'キャンセル'} onClick={backHandleClick} />
            <BlueButton label="確認" onClick={checkHandleClick} />
          </div>
        </Paper>
      </div>
    </section>
  )
}
export default QuestionEdit

const send = [
  { id: 'all', name: '全体' },
  { id: 'teacher', name: '全教官' },
  { id: 'student', name: '全学生' },
  { id: 'PI-11A-172', name: 'PI-11A-172' },
  { id: 'PW-11A-172', name: 'PW-11A-172' },
]