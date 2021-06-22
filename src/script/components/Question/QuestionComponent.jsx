import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { MuiTextField, MuiSelectBox, MuiRadioButton, MuiButton } from "../M-ui";
import {
  addQuestionItem,



  






  deleteQuestionItem,
} from "../../../reducks/questions/operations";
import { addQuestionList } from "../../../reducks/questions/selectors";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "20px",
    padding: "5px 20px 20px 20px",
    backgroundColor: theme.palette.action.hover,
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    opacity: "0.7",
  },
}));

export const QuestionComponent = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const add = addQuestionList(selector);
  const [datas, setDatas] = useState([]);
  const [questionItem, setQuestionItem] = useState("");
  const [questionType, setQuestionType] = useState("");

  // 作成した質問を取得する
  useEffect(() => {
    if (add) {
      setDatas(add);
      props.setQuestionData(add);
      setQuestionItem("");
    }
  }, [add, props]);
  
  // 質問内容入力イベント
  const inputItem = useCallback(
    (event) => {
      setQuestionItem(event.target.value);
    },
    [setQuestionItem]
  );
  // 作成ボタンクリック
  const questionAddHnadleClick = () => {
    dispatch(addQuestionItem(questionItem, questionType));
  };

  return (
    <div>
      {datas.length !== 0 &&
        datas.map((data, index) => (
          <Card key={index} className={classes.card}>
            <CardHeader
              action={
                <IconButton
                  className={classes.delete}
                  onClick={() => dispatch(deleteQuestionItem(index))}
                >
                  <DeleteIcon className={classes.icon} />
                </IconButton>
              }
              title={
                <Typography variant="h6" color="textSecondary">
                  質問 {`${index + 1}`}
                </Typography>
              }
            />
            <Typography variant="h6" color="textSecondary">
              {data.item}
            </Typography>
            {data.type === "1" ? (
              <MuiTextField
                id={index}
                type="text"
                fullWidth={true}
                disabled={true}
                label="テキストを入力"
              />
            ) : data.type === "2" ? (
              <MuiRadioButton id={index} options={radio1} disabled={true} />
            ) : (
              <MuiRadioButton id={index} options={radio2} disabled={true} />
            )}
          </Card>
        ))}

      <div className={classes.flex}>
        <MuiTextField
          type="text"
          label="質問内容"
          fullWidth={false}
          answer={true}
          value={questionItem}
          onChange={inputItem}
          error={props.error}
        />
        <MuiSelectBox
          label="ラベル"
          fullWidth={false}
          options={sent}
          value={questionType}
          select={setQuestionType}
          error={props.error}
        />
      </div>

      <MuiButton
        fullWidth={false}
        variant="text"
        color="grey"
        label="作成 ＋ "
        size="small"
        onClick={questionAddHnadleClick}
      />
    </div>
  );
};

const sent = [
  { id: "1", name: "テキスト" },
  { id: "2", name: "２択（はい・いいえ）" },
  {
    id: "3",
    name: "３択（そう思う・どちらでもない・そう思わない）",
  },
];
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
