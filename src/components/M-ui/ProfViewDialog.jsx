import React, { useState } from "react";

import { MuiButton, MuiDialog } from "src/components/M-ui";
import { db } from "src/firebase/firebase";

import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  name: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  icon: {
    margin: "0 5px 0 10px",
    border: "3px solid #90caf9",
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: 30,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginRight: 50,
    },
  },
  flex: {
    display: "block",
    padding: "10px 0",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
}));

export const ProfViewDialog = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [prof, setProf] = useState("");
  const [icon, setIcon] = useState("");

  // ダイアログが開いたらユーザーの情報を取得
  if (props.openDialog) {
    db.collection("users")
      .doc(props.uid)
      .get()
      .then((snapshots) => {
        const userData = snapshots.data();
        let icon = "";
        if (userData.user_value === "teacher" && userData.gender === "man") {
          icon = "👨‍🏫";
        } else if (
          userData.user_value === "teacher" &&
          userData.gender === "lady"
        ) {
          icon = "👩‍🏫";
        } else if (userData.gender === "man") {
          icon = "👨‍🎓";
        } else if (userData.gender === "lady") {
          icon = "👩‍🎓";
        }
        setName(`${icon} ${userData.class_name} ｜ ${userData.user_name}`);
        setIcon(userData.icon.path);
        if (userData.prof !== "") {
          setProf(userData.prof);
        } else {
          setProf("登録されていません。");
        }
      })
      .catch(() => {
        setName("ユーザー情報が見つかりません。");
      });
  }
  // ダイアログを閉じる
  const handleClose = () => {
    props.setOpenDialog(false);
  };

  return (
    <MuiDialog
      maxWidth="sm"
      openDialog={props.openDialog}
      onClose={handleClose}
    >
      <Typography variant="h6" className={classes.name} color="textPrimary">
        {name}
      </Typography>

      <div className={classes.flex}>
        <div>
          <Typography
            variant="body2"
            className="pd_y_10px"
            color="textSecondary"
          >
            アイコン
          </Typography>
          <Avatar className={classes.icon} src={icon} />
        </div>
        <div>
          <Typography
            variant="body2"
            className="pd_y_10px"
            color="textSecondary"
          >
            自己紹介文
          </Typography>
          <Typography
            variant="body1"
            style={{ whiteSpace: "pre-wrap" }}
            color="textPrimary"
          >
            {prof}
          </Typography>
        </div>
      </div>

      <DialogActions>
        <MuiButton
          fullWidth={false}
          color="blue"
          label="閉じる"
          size="small"
          onClick={handleClose}
        />
      </DialogActions>
    </MuiDialog>
  );
};
