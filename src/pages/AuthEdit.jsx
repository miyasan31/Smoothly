import React, { useState, useCallback } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import {
  AppBarSubHeader,
  MuiTextField,
  MuiSelectBox,
  MuiButton,
  MuiErrorBar,
} from "src/components/M-ui";
import { updateEmail, updatePassword } from "src/reducks/users/operations";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
/* ===================================================================== */

export const AuthEdit = () => {
  const dispatch = useDispatch();
  const [choice, setChoice] = useState("email");
  const [email, seteEail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  // 登録メールアドレス入力イベント
  const inputEmail = useCallback(
    (event) => {
      seteEail(event.target.value);
    },
    [seteEail]
  );
  // 新規メールアドレス入力イベント
  const inputNewEmail = useCallback(
    (event) => {
      setNewEmail(event.target.value);
    },
    [setNewEmail]
  );
  // 登録パスワード入力イベント
  const inputPassword = useCallback(
    (event) => {
      setePassword(event.target.value);
    },
    [setePassword]
  );
  // 新規パスワード入力イベント
  const inputNewPassword = useCallback(
    (event) => {
      setNewPassword(event.target.value);
    },
    [setNewPassword]
  );
  // キャンセルボタンクリック
  const backHandleClick = () => {
    dispatch(push("/setting"));
  };
  // 変更ボタンクリック
  const authUpdateHandleClick = () => {
    if (choice === "password" && !(email && password && newPassword)) {
      setOpenAlert(true);
    } else if (choice === "password") {
      setOpenAlert(false);
      dispatch(updatePassword(email, password, newPassword));
    } else if (choice === "email" && !(email && newEmail && password)) {
      setOpenAlert(true);
    } else if (choice === "email") {
      setOpenAlert(false);
      dispatch(updateEmail(email, password, newEmail));
    }
  };

  return (
    <section className="main">
      <AppBarSubHeader subtitle={"メールアドレス・パスワード変更"} />

      <div className="contents_style">
        {openAlert ? <MuiErrorBar setOpenAlert={setOpenAlert} /> : null}

        <Paper className="paper">
          <Typography className="pd_y_10px" color="textSecondary">
            変更項目
          </Typography>
          <MuiSelectBox
            fullWidth={true}
            options={choiceData}
            value={choice}
            select={setChoice}
          />

          <Typography className="pd_top_10px" color="textSecondary">
            現在のメールアドレス
          </Typography>
          <MuiTextField
            type="email"
            fullWidth={true}
            value={email}
            onChange={inputEmail}
            error={!email && openAlert ? true : false}
          />

          {choice === "email" && (
            <>
              <Typography className="pd_top_10px" color="textSecondary">
                新しいメールアドレス
              </Typography>
              <MuiTextField
                type="email"
                fullWidth={true}
                value={newEmail}
                error={!newEmail && openAlert ? true : false}
                onChange={inputNewEmail}
              />
            </>
          )}

          <Typography className="pd_top_10px" color="textSecondary">
            現在のパスワード
          </Typography>
          <MuiTextField
            type="password"
            fullWidth={true}
            value={password}
            onChange={inputPassword}
            error={!password && openAlert ? true : false}
          />

          {choice === "password" && (
            <>
              <Typography className="pd_top_10px" color="textSecondary">
                新しいパスワード
              </Typography>
              <MuiTextField
                type="password"
                fullWidth={true}
                value={newPassword}
                onChange={inputNewPassword}
                error={!newPassword && openAlert ? true : false}
              />
            </>
          )}

          <div className="right mg_top_20px">
            <MuiButton
              fullWidth={false}
              variant="text"
              color="blueNomal"
              label="キャンセル"
              onClick={backHandleClick}
            />
            <MuiButton
              fullWidth={false}
              variant="outlined"
              color="blue"
              label="変更"
              onClick={authUpdateHandleClick}
            />
          </div>
        </Paper>
      </div>
    </section>
  );
};

const choiceData = [
  { id: "email", name: "メールアドレス" },
  { id: "password", name: "パスワード" },
];
