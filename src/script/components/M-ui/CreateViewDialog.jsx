import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import { MuiButton, MuiCard, MuiDialog } from "../M-ui";
import { db } from "../../../firebase/firebase";
import { getUserId } from "../../../reducks/users/selectors";

import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
/* ===================================================================== */

export const CreateViewDialog = (props) => {
  const selector = useSelector((state) => state);
  const current_uid = getUserId(selector);
  const [userName, setUserName] = useState("");
  const [className, setClassName] = useState("");
  const [userIcon, setUserIcon] = useState("");

  // 時間を正規表現
  const time = new Date();
  const updateDateTime = format(time, "yyyy年M月dd日 H:mm", { locale: ja });

  // 投稿者の情報を取得
  useEffect(() => {
    db.collection("users")
      .doc(current_uid)
      .get()
      .then((snapshots) => {
        const userData = snapshots.data();
        if (userData) {
          setUserName(userData.user_name);
          setClassName(userData.class_name);
          setUserIcon(userData.icon.path);
        } else {
          setUserName("退会済みのユーザー");
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ダイアログを閉じる
  const handleClose = () => {
    props.setOpenDialog(false);
  };
  return (
    <MuiDialog
      maxWidth="md"
      openDialog={props.openDialog}
      onClose={handleClose}
    >
      <Typography variant="h6" className="pd_y_10px error_message">
        この内容で投稿しますか？
      </Typography>
      <MuiCard
        {...props}
        userName={userName}
        className={className}
        userIcon={userIcon}
        updateDateTime={updateDateTime}
        destination={
          props.destination === "all"
            ? "全体"
            : props.destination === "teacher"
            ? "教官"
            : props.destination === "student"
            ? "学生"
            : props.destination === "PI-11A-172"
            ? "PI-11A-172"
            : props.destination === "PW-11A-172"
            ? "PW-11A-172"
            : ""
        }
      />

      <DialogActions className="mg_btm_10px">
        <MuiButton
          fullWidth={false}
          variant="text"
          color="blueNomal"
          label="キャンセル"
          onClick={handleClose}
        />
        <MuiButton
          fullWidth={false}
          variant="outlined"
          color="blue"
          label="投稿"
          onClick={props.updateHandleClick}
        />
      </DialogActions>
    </MuiDialog>
  );
};
