import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { QuestionComponent } from "src/components/Question";
import {
  AppBarSubHeader,
  MuiTextField,
  MuiSelectBox,
  MuiButton,
  MuiErrorBar,
  MuiDateTimePicker,
  CreateViewDialog,
} from "src/components/M-ui";
import {
  createQuestions,
  readQuestionItem,
} from "src/reducks/questions/operations";
import { db } from "src/firebase/firebase";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
/* ===================================================================== */

export const QuestionEdit = () => {
  const dispatch = useDispatch();
  const [qid, setQid] = useState("");
  const [destination, setDestination] = useState("");
  const [title, setTitle] = useState("");
  const [item, setItem] = useState("");
  const [limitTime, setLimitTime] = useState("");
  const [questionData, setQuestionData] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // URLからqidを取得
    const id = window.location.pathname.split("/question/edit")[1];
    if (id !== "") {
      setQid(id.split("/")[1]);
    }
    // qidが存在すれば投稿情報を取得する
    if (qid !== "") {
      db.collection("questions")
        .doc(qid)
        .get()
        .then((snapshot) => {
          const question = snapshot.data();
          setDestination(question.destination);
          setTitle(question.title);
          setItem(question.item);
          const limit = question.limit_time.toDate();
          setLimitTime(limit);
          const questionData = question.question_data;
          dispatch(readQuestionItem(questionData));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid]);
  // タイトル入力イベント
  const inputTitle = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [setTitle]
  );
  // 内容入力イベント
  const inputItem = useCallback(
    (event) => {
      setItem(event.target.value);
    },
    [setItem]
  );
  // 回答期限入力イベント
  const inputDate = (date) => {
    setLimitTime(date);
  };
  // キャンセルボタンクリック
  const backHandleClick = () => {
    dispatch(push("/question"));
  };
  // 投稿ボタンクリック
  const updateHandleClick = () => {
    dispatch(
      createQuestions(qid, destination, title, item, limitTime, questionData)
    );
    setOpenDialog(false);
  };
  // 確認ダイアログ表示
  const checkHandleClick = () => {
    if (
      title &&
      item &&
      destination &&
      limitTime &&
      questionData.length !== 0
    ) {
      setOpenAlert(false);
      setOpenDialog(true);
    } else {
      setOpenAlert(true);
    }
  };

  return (
    <section className="main">
      <AppBarSubHeader
        subtitle={qid ? "アンケート　ー編集ー" : "アンケート　ー新規ー"}
      />

      <div className="contents_style">
        {openAlert ? <MuiErrorBar setOpenAlert={setOpenAlert} /> : null}

        <Paper className="paper">
          <Typography className="pd_y_10px" color="textSecondary">
            投稿先
          </Typography>
          <MuiSelectBox
            fullWidth={true}
            options={send}
            value={destination}
            select={setDestination}
            error={!destination && openAlert ? true : false}
          />

          <Typography className="pd_top_10px" color="textSecondary">
            タイトル
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

          <Typography className="pd_top_10px" color="textSecondary">
            内容
          </Typography>
          <MuiTextField
            type="text"
            fullWidth={true}
            multiline={true}
            value={item}
            defaultValue={item}
            onChange={inputItem}
            error={!item && openAlert ? true : false}
          />

          <Typography className="pd_top_10px" color="textSecondary">
            回答期限
          </Typography>
          <MuiDateTimePicker
            ampm={false}
            fullWidth={true}
            value={limitTime}
            error={!limitTime && openAlert ? true : false}
            onChange={inputDate}
          />

          <Typography className="pd_top_10px" color="textSecondary">
            質問作成
          </Typography>

          <QuestionComponent
            error={questionData.length === 0 && openAlert ? true : false}
            setQuestionData={setQuestionData}
          />

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
              label="確認"
              onClick={checkHandleClick}
            />
          </div>
        </Paper>
      </div>

      <CreateViewDialog
        destination={destination}
        title={title}
        item={item}
        questionData={questionData}
        limitTime={limitTime}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        updateHandleClick={updateHandleClick}
      />
    </section>
  );
};

const send = [
  { id: "all", name: "全体" },
  { id: "teacher", name: "全教官" },
  { id: "student", name: "全学生" },
  { id: "PI-11A-172", name: "PI-11A-172" },
  { id: "PW-11A-172", name: "PW-11A-172" },
];
