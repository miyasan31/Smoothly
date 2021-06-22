import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getIsLogin } from "src/reducks/users/selectors";
import { listenAuthState } from "src/reducks/users/operations";
/* ===================================================================== */

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsLogin(selector);

  // セッションチェック
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <div className="flex_center pd_top_30px">
        <CircularProgress />
      </div>
    );
  }
  return <div>{children}</div>;

  // if (!isSignedIn) {
  //   return (
  //     <TemplateTheme>
  //       <div className="flex_center pd_top_30px">
  //         <CircularProgress />
  //       </div>
  //     </TemplateTheme>
  //   )
  // } else {
  //   return <TemplateTheme>{children}</TemplateTheme>
  // }
};

export default Auth;
