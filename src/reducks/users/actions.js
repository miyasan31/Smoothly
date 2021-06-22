export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: userState,
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: "",
  };
};

export const THEME_CHANGE = "THEME_CHANGE";
export const updateThemeAction = (userState) => {
  return {
    type: "THEME_CHANGE",
    payload: userState,
  };
};
