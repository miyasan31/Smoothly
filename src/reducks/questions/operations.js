import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase/firebase'
import {
  readQuestionsAction,
  deleteQuestionsAction,
  addQuestionItemAction,
  deleteQuestionItemAction,
  readQuestionItemAction,
  readAnswersAction,
} from './actions.js'
/* ===================================================================== */

const questionsRef = db.collection('questions')
const schedulesRef = db.collection('schedules')

export const readQuestions = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    const className = state.users.class_name
    const userValue = state.users.user_value

    questionsRef
      // .where('limit_time', '>', new Date())
      .orderBy('limit_time', 'asc')
      .onSnapshot((snapshots) => {
        const questionList = []
        snapshots.forEach((snapshot) => {
          const question = snapshot.data()
          if (question.destination === 'all') {
            questionList.push(question)
          } else if (question.destination === userValue) {
            questionList.push(question)
          } else if (question.destination === className) {
            questionList.push(question)
          } else if (question.creater_uid === userId) {
            questionList.push(question)
          }
        })
        dispatch(readQuestionsAction(questionList))
      })
  }
}

export const createQuestions = (
  qid,
  destination,
  title,
  item,
  limitTime,
  questionData
) => {
  return async (dispatch, getState) => {
    let nullData = ''
    if (destination === '') {
      nullData = nullData + '【投稿先】'
    }
    if (title === '') {
      nullData = nullData + '【タイトル】'
    }
    if (limitTime === '') {
      nullData = nullData + '【期限】'
    }
    if (questionData.length === 0) {
      nullData = nullData + '【質問】'
    }
    if (nullData !== '') {
      alert(`項目：${nullData}を入力してください。`)
      return false
    }

    const state = getState()
    const userId = state.users.uid
    const timestamp = FirebaseTimestamp.now()
    const data = {
      destination: destination,
      title: title,
      item: item,
      limit_time: limitTime,
      question_data: questionData,
      creater_uid: userId,
      update_time: timestamp,
    }
    if (qid === '') {
      const ref = questionsRef.doc()
      data.created_time = timestamp
      // 要注意！！ドキュメントのIDだよ！
      qid = ref.id
      data.qid = qid
    }

    const task = {
      doc: qid,
      title: title,
      startDate: timestamp,
      endDate: limitTime,
      tag: '3',
      destination: destination,
      creater_uid: userId,
    }

    return questionsRef
      .doc(qid)
      .set(data, { merge: true })
      .then(() => {
        schedulesRef
          .doc(qid)
          .set(task, { merge: true })
          .then(() => {
            dispatch(push('/question'))
          })
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const deleteQuestion = (qid) => {
  return async (dispatch, getState) => {
    questionsRef
      .doc(qid)
      .delete()
      .then(() => {
        schedulesRef
          .doc(qid)
          .delete()
          .then(() => {
            dispatch(push('/question'))
          })
      })
  }
}

export const addQuestionItem = (questionItem, questionType) => {
  return async (dispatch) => {
    if (questionItem === '' || questionType === '') {
      alert('質問内容と質問のタイプを入力してください。')
      return false
    }
    const data = {
      item: questionItem,
      type: questionType,
    }
    dispatch(addQuestionItemAction(data))
  }
}

export const deleteQuestionItem = (index) => {
  return async (dispatch) => {
    dispatch(deleteQuestionItemAction(index))
  }
}

export const readQuestionItem = (questionData) => {
  return async (dispatch) => {
    const data = questionData
    dispatch(readQuestionItemAction(data))
  }
}

export const readAnswers = (qid) => {
  return async (dispatch) => {
    questionsRef
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
        dispatch(readAnswersAction(AnswersList))
      })
  }
}

export const createAnswers = (qid, answerData) => {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.users.uid
    const userName = state.users.user_name
    const userValue = state.users.user_value
    const userNumber = state.users.user_number
    const className = state.users.class_name

    const timestamp = FirebaseTimestamp.now()
    const ref = questionsRef.doc().collection('answers').doc()
    const aid = ref.id

    const data = {
      aid: aid,
      answer_uid: userId,
      answer_name: userName,
      answer_value: userValue,
      answer_number: userNumber,
      answer_class: className,
      answer_data: answerData,
      answer_time: timestamp,
    }

    return questionsRef
      .doc(qid)
      .collection('answers')
      .doc(userId)
      .set(data)
      .then(() => {
        dispatch(push('/question'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
