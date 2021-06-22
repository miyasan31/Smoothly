import React, { useState } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import clsx from "clsx";

import {
  MuiTextField,
  MuiButton,
  MuiRadioButton,
  ProfViewDialog,
  ActionCheckDialog,
} from "../M-ui";
import { deletePost } from "../../../reducks/posts/operations";
import { deleteMission } from "../../../reducks/missions/operations";
import { deleteQuestion } from "../../../reducks/questions/operations";
import { checkExt } from "../../../functions/function";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
/* ===================================================================== */
const useStyles = makeStyles((theme) => ({
  media: {
    height: "0",
    padding: "50%",
    backgroundSize: "contain",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(-90deg)",
  },
  card: {
    marginTop: "20px",
    padding: "5px 20px 20px 20px",
    backgroundColor: theme.palette.action.hover,
  },
}));

export const MuiCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [openProfDialog, setOpenProfDialog] = useState(false);
  const [openDeleteCheckDialog, setOpenDeleteCheckDialog] = useState(false);

  // 編集ボタンクリック
  const editHandleClick = () => {
    dispatch(push(props.editPath));
  };
  // 削除ボタンクリック
  const deleteHandleClick = () => {
    if (props.pid) {
      dispatch(deletePost(props.pid));
    } else if (props.mid) {
      dispatch(deleteMission(props.pid));
    } else if (props.qid) {
      dispatch(deleteQuestion(props.pid));
    }
    setOpenDeleteCheckDialog(false);
  };
  // 回答/提出ボタンクリック
  const answerHandleClick = () => {
    if (props.qid) {
      dispatch(push("/question/answer/" + props.qid));
    } else if (props.mid) {
      dispatch(push("/mission/submit/" + props.mid));
    }
  };
  // 結果/集計ボタンクリック
  const analyticsHandleClick = () => {
    if (props.qid) {
      dispatch(push("/question/analytics/" + props.qid));
    } else if (props.mid) {
      dispatch(push("/mission/collect/" + props.mid));
    }
  };
  // プロフの表示
  const IconViewHandleClick = () => {
    setOpenProfDialog(true);
  };
  // 確認ダイアログ表示
  const deleteCheckHandleClick = () => {
    setOpenDeleteCheckDialog(true);
  };
  // ファイル表示ボタンクリック&矢印アイコンの向き変更
  const expandHandleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mg_btm_20px">
      <Card>
        <CardHeader
          avatar={
            props.userIcon ? (
              <Avatar
                alt="userIcon"
                src={props.userIcon}
                className={
                  props.currentUid === props.createrUid
                    ? "pointer icon_circle_blue"
                    : "pointer"
                }
                onClick={IconViewHandleClick}
              />
            ) : (
              <Avatar
                className={
                  props.currentUid === props.createrUid
                    ? "pointer icon_circle_blue"
                    : "pointer"
                }
                onClick={IconViewHandleClick}
              >
                {props.userName.charAt(0)}
              </Avatar>
            )
          }
          title={
            <Typography>
              {props.className} ｜ {props.userName}
            </Typography>
          }
          subheader={`更新日時：${props.updateDateTime}`}
        />

        <CardContent>
          {props.destination && (
            <>
              <Typography variant="body2" className="label">
                投稿先
              </Typography>
              <Typography variant="body1" className="pd_10px">
                {props.destination}
              </Typography>
            </>
          )}
          <Typography variant="body2" color="textSecondary">
            タイトル
          </Typography>
          <Typography variant="body1" className="pd_10px" color="textPrimary">
            {props.title}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            内容
          </Typography>
          <Typography
            variant="body1"
            className="pd_10px"
            color="textPrimary"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {props.item}
          </Typography>

          {props.limitDateTime && (
            <Typography variant="body1" className="red_center pd_top_10px">
              提出期限：{props.limitDateTime}
            </Typography>
          )}
        </CardContent>

        <CardActions className="mg_10px">
          {props.currentUid === props.createrUid && (
            <>
              <MuiButton
                fullWidth={false}
                variant="text"
                color="blueNomal"
                label="編集"
                onClick={editHandleClick}
              />
              <MuiButton
                fullWidth={false}
                variant="text"
                color="blueNomal"
                label="削除"
                onClick={deleteCheckHandleClick}
              />
            </>
          )}

          {props.file && (
            <MuiButton fullWidth={false} color="blueNomal" variant="text">
              <a href={props.file.path}>ファイルダウンロード</a>
            </MuiButton>
          )}

          {props.file && checkExt(props.file.file_name) && (
            <MuiButton
              fullWidth={false}
              color="blueNomal"
              variant="text"
              onClick={expandHandleClick}
              aria-expanded={expanded}
            >
              ファイル表示
              <ExpandMoreIcon
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
              />
            </MuiButton>
          )}

          <div className="flex_grow" />

          {props.submitCheck && (
            <Typography variant="body2" className="red_center">
              提出済
            </Typography>
          )}

          {props.currentUid === props.createrUid && props.mid ? (
            <MuiButton
              fullWidth={false}
              variant="text"
              color="pink"
              label="集計"
              onClick={analyticsHandleClick}
            />
          ) : props.currentUid !== props.createrUid && props.mid ? (
            <MuiButton
              fullWidth={false}
              variant="text"
              color="pink"
              label="提出"
              onClick={answerHandleClick}
            />
          ) : (
            <></>
          )}

          {props.currentUid === props.createrUid && props.qid ? (
            <MuiButton
              fullWidth={false}
              variant="text"
              color="pink"
              label="結果"
              onClick={analyticsHandleClick}
            />
          ) : props.currentUid !== props.createrUid && props.qid ? (
            <MuiButton
              fullWidth={false}
              variant="text"
              color="pink"
              label="回答"
              onClick={answerHandleClick}
            />
          ) : (
            <></>
          )}
        </CardActions>

        {props.file && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.content}>
              <CardMedia className={classes.media} image={props.file.path} />
            </CardContent>
          </Collapse>
        )}
      </Card>

      {props.questionData &&
        props.questionData.map((data, index) => (
          <Card key={index} className={classes.card}>
            <CardHeader
              title={
                <Typography variant="h6" className="label">
                  質問 {`${index + 1}`}
                </Typography>
              }
            />
            <Typography variant="h6">{data.item}</Typography>
            <Typography variant="body1">
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
                <MuiRadioButton
                  id={index}
                  options={radio2}
                  disabled={true}
                  fullWidth
                />
              )}
            </Typography>
          </Card>
        ))}

      {!props.destination && (
        <>
          <ProfViewDialog
            uid={props.createrUid}
            openDialog={openProfDialog}
            setOpenDialog={setOpenProfDialog}
          />
          <ActionCheckDialog
            text={"削除してもよろしいですか？"}
            openDialog={openDeleteCheckDialog}
            setOpenDialog={setOpenDeleteCheckDialog}
            actionHandleClick={deleteHandleClick}
          />
        </>
      )}
    </div>
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
