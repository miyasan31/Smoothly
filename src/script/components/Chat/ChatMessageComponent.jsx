import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import { getUserId } from "../../../reducks/users/selectors";
import { db } from "../../../firebase/firebase";

import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
/* ===================================================================== */
const useStyles = makeStyles({
  tooltip: {
    backgroundColor: "#00000055",
    padding: "10px 10px",
    lineHeight: 0,
    fontSize: 5,
    fontWeight: "bold",
  },
  arrow: {
    color: "#00000055",
  },
});

export const ChatMessageComponent = (props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const current_uid = getUserId(selector);
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");

  // 投稿者の情報を取得
  useEffect(() => {
    if (props.createrUid) {
      const unsubscribe = db
        .collection("users")
        .doc(props.createrUid)
        .onSnapshot((snapshots) => {
          const userData = snapshots.data();
          if (userData) {
            setName(userData.user_name);
            setIcon(userData.icon.path);
          } else {
            setName("退会済みのユーザー");
          }
        });
      return () => unsubscribe();
    }
  }, [props.createrUid]);
  
  // 時間を正規表現
  const timeChange = (time) => {
    const redate = time.toDate();
    const date = format(redate, "yyyy年M月dd日 H:mm", { locale: ja });
    return date;
  };

  return (
    <div
      className={
        props.createrUid === current_uid ? "chat_msg_box_mine" : " chat_msg_box"
      }
      key={props.key}
    >
      <div
        className={props.createrUid === current_uid && "chat_from_name_mine"}
      >
        {icon ? (
          <Avatar
            className="pointer"
            alt="userIcon"
            src={icon}
            onClick={() => props.onClick(props.createrUid)}
          />
        ) : (
          <Avatar
            className="pointer"
            onClick={() => props.onClick(props.createrUid)}
          >
            {name.charAt(0)}
          </Avatar>
        )}
      </div>
      <div className="chat_msg">
        <span className="chat_from_name">
          <Typography
            variant="body2"
            color="textPrimary"
            className={
              props.createrUid === current_uid && "chat_from_name_mine"
            }
          >
            {name}
          </Typography>
        </span>

        <span>
          <Tooltip
            arrow
            placement="right-end"
            title={timeChange(props.updateTime)}
            TransitionProps={{ timeout: 300 }}
            classes={classes}
          >
            <Typography
              variant="body2"
              style={{ whiteSpace: "pre-wrap" }}
              className={
                props.createrUid === current_uid ? "message_mine" : " message"
              }
            >
              {props.message}
            </Typography>
          </Tooltip>
        </span>
      </div>
    </div>
  );
};
