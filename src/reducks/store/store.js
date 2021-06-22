import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  // compose
} from "redux";
import { createLogger } from "redux-logger";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { UsersReducter } from "src/reducks/users/reducers";
import { PostsReducter } from "src/reducks/posts/reducers";
import { ChatRoomsReducter } from "src/reducks/chats/reducers";
import {
  doingTasksReducter,
  completedTasksReducter,
} from "src/reducks/tasks/reducers";
import {
  QuestionsReducter,
  AnswersReducter,
  QuestionItemReducter,
} from "src/reducks/questions/reducers";
import { MissionsReducter } from "src/reducks/missions/reducers";
import thunk from "redux-thunk";
/* ===================================================================== */

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default function createStore(history) {
  // return reduxCreateStore(
  //   combineReducers({
  //     router: connectRouter(history),
  //     users: UsersReducter,
  //     posts: PostsReducter,
  //   }),
  //   composeEnhancer(applyMiddleware(routerMiddleware(history), thunk))
  // )
  let middleWares = [routerMiddleware(history), thunk];
  if (process.env.NODE_ENV === "development") {
    const logger = createLogger({
      collapsed: true,
      diff: true,
    });
    middleWares.push(logger);
  }
  return reduxCreateStore(
    // オリジナル createStore の別名
    combineReducers({
      router: connectRouter(history),
      users: UsersReducter,
      posts: PostsReducter,
      rooms: ChatRoomsReducter,
      questions: QuestionsReducter,
      doing_tasks: doingTasksReducter,
      completed_tasks: completedTasksReducter,
      addquestions: QuestionItemReducter,
      answers: AnswersReducter,
      missions: MissionsReducter,
    }),
    applyMiddleware(...middleWares)
  );
}
