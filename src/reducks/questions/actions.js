export const READ_QUESTIONS = 'READ_QUESTIONS'
export const readQuestionsAction = (questions) => {
  return {
    type: 'READ_QUESTIONS',
    payload: questions,
  }
}

export const DELETE_QUESTIONS = 'DELETE_QUESTIONS'
export const deleteQuestionsAction = (questions) => {
  return {
    type: 'DELETE_QUESTIONS',
    payload: questions,
  }
}

export const ADD_QUESTIONITEM = 'ADD_QUESTIONITEM'
export const addQuestionItemAction = (question) => {
  return {
    type: 'ADD_QUESTIONITEM',
    payload: question,
  }
}
export const DELETE_QUESTIONITEM = 'DELETE_QUESTIONITEM'
export const deleteQuestionItemAction = (index) => {
  return {
    type: 'DELETE_QUESTIONITEM',
    payload: index,
  }
}
export const READ_QUESTIONITEM = 'READ_QUESTIONITEM'
export const readQuestionItemAction = (question) => {
  return {
    type: 'READ_QUESTIONITEM',
    payload: question,
  }
}
export const CLEAR_QUESTIONITEM = 'CLEAR_QUESTIONITEM'
export const clearQuestionItemAction = () => {
  return {
    type: 'CLEAR_QUESTIONITEM',
    payload: [],
  }
}

export const READ_ANSWERS = 'READ_ANSWERS'
export const readAnswersAction = (answers) => {
  return {
    type: 'READ_ANSWERS',
    payload: answers,
  }
}
