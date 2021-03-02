import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { QuestionComponent } from '../render'
import {
  AppBarSubHeader,
  BlueButton,
  BlueInput,
  BlueButtonNomal,
  SelectBox,
  DateTimePicker,
} from '../../MaterialUi/materialui'
import { db } from '../../../firebase/firebase'
import {
  createQuestions,
  readQuestionItem,
} from '../../../reducks/questions/operations'

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
  }

  return (
    <section className="main">
      {qid === '' ? (
        <AppBarSubHeader subtitle={'アンケート　ー新規ー'} />
      ) : (
        <AppBarSubHeader subtitle={'アンケート　ー編集ー'} />
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

          <Typography className="label">回答期限</Typography>
          <DateTimePicker
            ampm={false}
            fullWidth={true}
            value={limitTime}
            onChange={inputDate}
          />
          <div className="space_15px"></div>

          <Typography className="label">質問作成</Typography>

          <QuestionComponent setQuestionData={setQuestionData} />

          <div className="right">
            <span>
              <BlueButtonNomal label={'キャンセル'} onClick={backHandleClick} />
              <BlueButton
                label={qid === '' ? '投稿' : '変更'}
                onClick={updateHandleClick}
              />
            </span>
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
