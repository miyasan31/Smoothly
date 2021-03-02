import { createSelector } from 'reselect'
/* ===================================================================== */

const questionsSelector = (state) => state.questions
export const getQuestionLists = createSelector(
  [questionsSelector],
  (state) => state.list
)

const addQuestionsSelector = (state) => state.addquestions
export const addQuestionList = createSelector(
  [addQuestionsSelector],
  (state) => state
)

const answersSelector = (state) => state.answers
export const getAnswerLists = createSelector(
  [answersSelector],
  (state) => state.list
)
