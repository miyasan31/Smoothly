import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { QuestionList } from '../components/Question'
import { AppBarSubHeader, MuiTooltip } from '../components/M-ui'
import { readQuestions } from '../../reducks/questions/operations'
import { getUserId } from '../../reducks/users/selectors'
import { getQuestionLists } from '../../reducks/questions/selectors'
import { clearQuestionItemAction } from '../../reducks/questions/actions'

import EditIcon from '@material-ui/icons/Edit'
/* ===================================================================== */

export const Question = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const current_uid = getUserId(selector)
  const questions = getQuestionLists(selector)

  // アンケート作成ボタンクリック
  const pushHandleClick = () => {
    dispatch(clearQuestionItemAction([]))
    dispatch(push('/question/edit'))
  }
  // 全投稿を取得
  useEffect(() => {
    dispatch(readQuestions())
  }, [])

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'アンケート一覧'} />

      <MuiTooltip
        title="アンケート作成"
        icon={<EditIcon />}
        onClick={pushHandleClick}
      />

      <div className="contents_style">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionList
              currentUid={current_uid}
              key={question.qid}
              qid={question.qid}
              title={question.title}
              item={question.item}
              limitTime={question.limit_time}
              createrUid={question.creater_uid}
              updateTime={question.update_time}
            />
          ))
        ) : questions.length === 0 ? (
          <div>現在アンケートは実施されてません</div>
        ) : null}
      </div>
    </section>
  )
}
