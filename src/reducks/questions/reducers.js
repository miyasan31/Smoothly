import * as Action from "./actions";
import { initialState } from "../store/initialState.js";
/* ===================================================================== */

export const QuestionsReducter = (state = initialState.questions, action) => {
  switch (action.type) {
    case Action.READ_QUESTIONS:
      return {
        ...state,
        list: [...action.payload],
      };
    case Action.DELETE_QUESTIONS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export const QuestionItemReducter = (
  state = initialState.addquestions,
  action
) => {
  switch (action.type) {
    case Action.ADD_QUESTIONITEM:
      return [...state, action.payload];
    case Action.DELETE_QUESTIONITEM:
      return state.filter((state, index) => index !== action.payload);
    case Action.READ_QUESTIONITEM:
      return action.payload;
    case Action.CLEAR_QUESTIONITEM:
      return state, action.payload;
    default:
      return state;
  }
};

export const AnswersReducter = (state = initialState.answers, action) => {
  switch (action.type) {
    case Action.READ_ANSWERS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
