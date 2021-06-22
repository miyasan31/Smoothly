import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

import {
  AppBarSubHeader,
  MuiTextField,
  MuiButton,
  MuiErrorBar,
  MuiDateTimePicker,
} from "../components/M-ui";
import { addTask } from "../../reducks/tasks/operations";
import { getUserId } from "../../reducks/users/selectors";
import { db } from "../../firebase/firebase";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  picker: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
}));

export const TaskEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const current_uid = getUserId(selector);
  const [tid, setTid] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndeDate] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // URLからtidを取得
    const id = window.location.pathname.split("/task/edit")[1];
    if (id !== "") {
      setTid(id.split("/")[1]);
    }
    // tidが存在すれば投稿情報を取得する
    if (tid !== "") {
      db.collection("users")
        .doc(current_uid)
        .collection("tasks")
        .doc(tid)
        .get()
        .then((snapshot) => {
          const task = snapshot.data();
          setTitle(task.title);
          setStartDate(task.startDate.toDate());
          setEndeDate(task.endDate.toDate());
        });
    }
  }, [current_uid, tid]);
  
  // タスク名入力イベント
  const inputTitle = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [setTitle]
  );
  // 開始時刻入力イベント
  const inputStartDate = (date) => {
    setStartDate(date);
  };
  // 終了時刻入力イベント
  const inputEndDate = (date) => {
    setEndeDate(date);
  };
  // 終了時刻チェック
  const dateCheck = (startDate, endDate) => {
    if (startDate !== "" && endDate !== "") {
      if (endDate < startDate) {
        return "※開始時刻よりも後の時刻を入力してください";
      }
    } else {
      return "";
    }
  };
  // キャンセルボタンクリック
  const handleClose = () => {
    dispatch(push("/task"));
  };
  // 保存ボタンクリック
  const createHandleClick = () => {
    if (title && startDate && endDate) {
      setOpenAlert(false);
      dispatch(addTask(tid, title, startDate, endDate));
    } else {
      setOpenAlert(true);
    }
  };

  return (
    <section className="main">
      <AppBarSubHeader
        subtitle={tid ? "タスク　ー編集ー" : "タスク　ー新規ー"}
      />

      <div className="contents_style">
        {openAlert ? <MuiErrorBar setOpenAlert={setOpenAlert} /> : null}

        <Paper className="paper">
          <Typography className="pd_top_10px" color="textSecondary">
            タスク名
          </Typography>
          <MuiTextField
            type="text"
            fullWidth={true}
            multiline={true}
            value={title}
            defaultValue={title}
            onChange={inputTitle}
            error={!title && openAlert ? true : false}
          />

          <div className={classes.picker}>
            <div className="flex_10">
              <Typography className="pd_top_10px" color="textSecondary">
                開始時刻
              </Typography>
              <MuiDateTimePicker
                fullWidth={true}
                ampm={false}
                value={startDate}
                error={!startDate && openAlert ? true : false}
                onChange={inputStartDate}
              />
            </div>
            <div className="flex_1"></div>
            <div className="flex_10">
              <Typography className="pd_top_10px" color="textSecondary">
                終了時刻
              </Typography>
              <MuiDateTimePicker
                fullWidth={true}
                ampm={false}
                value={endDate}
                minDate={startDate}
                error={!endDate && openAlert ? true : false}
                onChange={inputEndDate}
              />
              <Typography
                variant="body2"
                style={{ color: "#e91e63", fontSize: "11px" }}
              >
                {dateCheck(startDate, endDate)}
              </Typography>
            </div>
          </div>

          <div className="right mg_top_20px">
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
              label={tid === "" ? "追加" : "保存"}
              onClick={createHandleClick}
            />
          </div>
        </Paper>
      </div>
    </section>
  );
};
