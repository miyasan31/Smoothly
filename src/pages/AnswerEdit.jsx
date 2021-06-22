import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  AppBarSubHeader,
  MuiTextField,
  MuiRadioButton,
  MuiButton,
} from "src/components/M-ui";
import { db } from "src/firebase/firebase";
import { createAnswers } from "src/reducks/questions/operations";

/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: theme.palette.action.hover,
  },
}));

export const AnswerEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [qid, setQid] = useState("");
  const [title, setTitle] = useState("");
  const [questionData, setQuestionData] = useState([]);
  const [answerData, setAnswerData] = useState({});

  useEffect(() => {
    // URLからqidを取得
    const id = window.location.pathname.split("/answer")[1];
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
          setTitle(question.title);
          const data = question.question_data;
          setQuestionData(data);
          const dataLength = data.length;
          setAnswerData(new Array(dataLength));
        });
    }
  }, [qid]);
  // 回答入力イベント
  const handleChange = (id, value) => {
    answerData.splice(id, 1, value);
  };
  // キャンセルボタンクリック
  const backHandleClick = () => {
    dispatch(push("/question"));
  };
  // 終了ボタンクリック
  const finishHnadleClick = () => {
    dispatch(createAnswers(qid, answerData));
  };

  return (
    <section className="main">
      <AppBarSubHeader subtitle="アンケート　ー回答ー" />
      <div className="contents_style">
        <Paper className="paper mg_btm_20px">
          <Typography variant="h5" color="textPrimary">
            {title}
          </Typography>

          {questionData.map((data, index) => (
            <Paper key={index} className={classes.item}>
              <Typography className="pd_top_10px" color="textSecondary">
                質問 {index + 1}
              </Typography>

              <Typography
                variant="h6"
                className="pd_top_10px"
                color="textPrimary"
              >
                {data.item}
              </Typography>

              {data.type === "1" ? (
                <MuiTextField
                  id={index}
                  type="text"
                  fullWidth
                  multiline
                  value={answerData[index]}
                  onChange={handleChange}
                />
              ) : data.type === "2" ? (
                <MuiRadioButton
                  id={index}
                  options={radio1}
                  value={answerData[index]}
                  onChange={handleChange}
                />
              ) : (
                <MuiRadioButton
                  id={index}
                  options={radio2}
                  fullWidth
                  value={answerData[index]}
                  onChange={handleChange}
                />
              )}
            </Paper>
          ))}

          <div className="right mg_top_20px">
            <span>
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
                label="回答"
                onClick={finishHnadleClick}
              />
            </span>
          </div>
        </Paper>
      </div>
    </section>
  );
};

const radio1 = [
  { value: "1", label: "はい" },
  { value: "2", label: "いいえ" },
];
const radio2 = [
  { value: "10", label: "そう思う" },
  { value: "20", label: "どちらでもない" },
  {
    value: "30",
    label: "そう思わない",
  },
];
