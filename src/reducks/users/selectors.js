import { createSelector } from "reselect";
/* ===================================================================== */

const usersSelector = (state) => state.users;

export const getIsLogin = createSelector(
  [usersSelector],
  (state) => state.is_signin
);

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUserIcon = createSelector(
  [usersSelector],
  (state) => state.icon
);
export const getUserName = createSelector(
  [usersSelector],
  (state) => state.user_name
);

export const getUserValue = createSelector(
  [usersSelector],
  (state) => state.user_value
);

export const getUserNumber = createSelector(
  [usersSelector],
  (state) => state.user_number
);

export const getClassName = createSelector(
  [usersSelector],
  (state) => state.class_name
);

export const getTheme = createSelector(
  [usersSelector],
  (state) => state.dark_mode
);
