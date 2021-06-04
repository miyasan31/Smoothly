import React, { useState, useEffect } from 'react'

import { AnalyticsList } from '../components/Question'
import { AppBarSubHeader } from '../components/M-ui'
import { db } from '../../firebase/firebase'
/* ===================================================================== */

export const Analytics = () => {
  const [questions, setQuestions] = useState('')
  const [answers, setAnswers] = useState('')

  // URLからqidを取得
  let qid = window.location.pathname.split('/question/analytics')[1]
  if (qid !== '') {
    qid = qid.split('/')[1]
  }

  useEffect(() => {
    // qidから投稿情報と回答情報を取得する
    db.collection('questions')
      .doc(qid)
      .get()
      .then((snapshots) => {
        const questions = snapshots.data()
        setQuestions(questions.question_data)
      })

    db.collection('questions')
      .doc(qid)
      .collection('answers')
      .orderBy('answer_class', 'desc')
      .get()
      .then((snapshots) => {
        const AnswersList = []
        snapshots.forEach((snapshots) => {
          const answers = snapshots.data()
          AnswersList.push(answers)
        })
        setAnswers(AnswersList)
      })
  }, [qid])

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'アンケート ー結果ー'} />

      <div className="contents_style">
        {questions.length > 0 &&
          questions.map((question, index) => (
            <AnalyticsList
              qid={qid}
              answers={answers}
              item={question.item}
              type={question.type}
              id={index}
            />
          ))}
      </div>
    </section>
  )
}
