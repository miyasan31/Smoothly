import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  QuestionSelect,
  QuestionInput,
  GreyButton,
  AnswerText1,
  AnswerRadio2,
  AnswerRadio3,
} from '../M-ui'
import {
  addQuestionItem,
  deleteQuestionItem,
} from '../../../reducks/questions/operations'
import { addQuestionList } from '../../../reducks/questions/selectors'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStyles = makeStyles({
  card: {
    marginTop: '20px',
    padding: '5px 20px 20px 20px',
    backgroundColor: '#00000005',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    opacity: '0.7',
  },
})

const QuestionComponent = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const add = addQuestionList(selector)
  const [datas, setDatas] = useState([])
  const [questionItem, setQuestionItem] = useState('')
  const [questionType, setQuestionType] = useState('')

  //　作成した質問を取得する
  useEffect(() => {
    if (add) {
      setDatas(add)
      props.setQuestionData(add)
      setQuestionItem('')
    }
  }, [add])
  // 質問内容入力イベント
  const inputItem = useCallback(
    (event) => {
      setQuestionItem(event.target.value)
    },
    [setQuestionItem]
  )
  // 作成ボタンクリック
  const questionAddHnadleClick = () => {
    dispatch(addQuestionItem(questionItem, questionType))
  }

  return (
    <>
      {datas.length !== 0 &&
        datas.map((data, index) => (
          <Card key={index} className={classes.card}>
            <CardHeader
              action={
                <IconButton
                  className={classes.delete}
                  onClick={() => dispatch(deleteQuestionItem(index))}
                >
                  <DeleteIcon className={classes.icon} />
                </IconButton>
              }
              title={
                <Typography variant="h6" color="textSecondary">
                  質問 {`${index + 1}`}
                </Typography>
              }
            />
            <Typography variant="h6" color="textSecondary">
              {data.item}
            </Typography>
            {data.type === '1' ? (
              <AnswerText1
                id={index}
                label={'テキストを入力'}
                type={'text'}
                fullWidth={true}
                disabled={true}
                multiline={false}
                value={null}
              />
            ) : data.type === '2' ? (
              <AnswerRadio2 id={index} disabled={true} />
            ) : (
              <AnswerRadio3 id={index} disabled={true} fullWidth />
            )}
          </Card>
        ))}

      <div className={classes.flex}>
        <QuestionInput
          error={props.error}
          value={questionItem}
          onChange={inputItem}
        />
        <QuestionSelect
          error={props.error}
          value={questionType}
          select={setQuestionType}
        />
      </div>

      <GreyButton
        size={'small'}
        label={'作成 ＋ '}
        onClick={questionAddHnadleClick}
      />
    </>
  )
}
export default QuestionComponent
