import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import {
  AppBarSubHeader,
  BlueButton,
  BlueButtonNomal,
  AnswerText1,
  AnswerRadio2,
  AnswerRadio3,
} from '../../MaterialUi/materialui'
import { db } from '../../../firebase/firebase'
import { createAnswers } from '../../../reducks/questions/operations'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

const useStyles = makeStyles({
  item: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#00000005',
  },
})

const AnswerEdit = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [qid, setQid] = useState('')
  const [title, setTitle] = useState('')
  const [questionData, setQuestionData] = useState([])
  const [answerData, setAnswerData] = useState({})

  useEffect(() => {
    // URLからqidを取得
    const id = window.location.pathname.split('/answer')[1]
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
          setTitle(question.title)
          const data = question.question_data
          setQuestionData(data)
          const dataLength = data.length
          setAnswerData(new Array(dataLength))
        })
    }
  }, [qid])
  // 回答入力イベント
  const handleChange = (id, value) => {
    answerData.splice(id, 1, value)
  }
  // キャンセルボタンクリック
  const backHandleClick = () => {
    dispatch(push('/question'))
  }
  // 終了ボタンクリック
  const finishHnadleClick = () => {
    dispatch(createAnswers(qid, answerData))
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'アンケート　ー回答ー'} />
      <div className="contents_style">
        <Paper className="paper mg_btm_20px">
          <Typography variant="h5">{title}</Typography>

          {questionData.map((data, index) => (
            <Paper key={index} className={classes.item}>
              <Typography className="label pd_top_10px">
                質問 {index + 1}
              </Typography>

              <Typography variant="h6" className="pd_top_10px">
                {data.item}
              </Typography>

              {data.type === '1' ? (
                <AnswerText1
                  id={index}
                  label={null}
                  type={'text'}
                  fullWidth={true}
                  disabled={false}
                  multiline={true}
                  value={answerData[index]}
                  onChange={handleChange}
                />
              ) : data.type === '2' ? (
                <AnswerRadio2
                  id={index}
                  value={answerData[index]}
                  onChange={handleChange}
                />
              ) : (
                <AnswerRadio3
                  id={index}
                  fullWidth
                  value={answerData[index]}
                  onChange={handleChange}
                />
              )}
            </Paper>
          ))}

          <div className="right mg_top_20px">
            <span>
              <BlueButtonNomal label={'キャンセル'} onClick={backHandleClick} />
              <BlueButton label={'回答'} onClick={finishHnadleClick} />
            </span>
          </div>
        </Paper>
      </div>
    </section>
  )
}
export default AnswerEdit
