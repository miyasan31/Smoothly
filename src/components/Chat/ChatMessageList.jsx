import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { ChatMessageComponent } from "src/components/Chat";
import { MuiTextField, ProfViewDialog } from "src/components/M-ui";
import { createChatMessage } from "src/reducks/chats/operations";
import { db } from "src/firebase/firebase";

import IconButton from "@material-ui/core/IconButton";
import SendSharpIcon from "@material-ui/icons/SendSharp";
import { makeStyles } from "@material-ui/core/styles";
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  chatContent: {
    position: "fixed",
    bottom: 0,
    right: 0,
    zIndex: 40,
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
    borderTop: "1px solid #00000022",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 231px)",
    },
  },
  chatBtn: {
    margin: "0 0 8px 0",
    [theme.breakpoints.up("md")]: {
      margin: "0 10px 3px 0px",
    },
  },
  activeBtn: {
    fontSize: "30px",
    [theme.breakpoints.up("md")]: {
      fontSize: "40px",
    },
  },
  passiveBtn: {
    opacity: "0.4",
    fontSize: "30px",
    [theme.breakpoints.up("md")]: {
      fontSize: "40px",
    },
  },
}));

export const ChatMessageList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [messageData, setMessageData] = useState("");
  const [message, setMessage] = useState("");
  const [uid, setUid] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // URLからridを取得
    let rid = window.location.pathname.split("/chat/room")[1];
    if (rid !== "") {
      rid = rid.split("/")[1];
    }
    // 常時データの更新を監視
    const unsubscribe = db
      .collection("chats")
      .doc(rid)
      .collection("messages")
      .orderBy("update_time", "asc")
      .onSnapshot((snapshots) => {
        const messageList = [];
        snapshots.forEach((snapshots) => {
          const msg = snapshots.data();
          messageList.push(msg);
        });
        setMessageData(messageList);
      });
    // タイトルの取得、親に渡す
    db.collection("chats")
      .doc(rid)
      .get()
      .then((snapshots) => {
        const roomData = snapshots.data();
        if (roomData.members.length !== 0) {
          props.setRoomName(
            `${roomData.room_name}（${
              roomData.members && roomData.members.length
            }）`
          );
        } else {
          props.setRoomName(roomData.room_name);
        }
      });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // プロフの表示
  const handleIconView = (uid) => {
    setUid(uid);
    setOpenDialog(true);
  };
  // メッセージ入力イベント
  const inputMessage = useCallback((event) => {
    setMessage(event.target.value);
  }, []);
  // メッセージ送信ボタンクリック
  const handleClick = () => {
    let rid = window.location.pathname.split("/chat/room")[1];
    if (rid !== "") {
      rid = rid.split("/")[1];
    }
    dispatch(createChatMessage(rid, message));
    setMessage("");
  };
  // 新規メッセージを受信したらスクロールを一番下に持ってくる
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };
  useEffect(scrollToBottom, [messageData]);

  return (
    <div id="chatroom" className="chat_contents_style">
      {messageData.length !== 0 &&
        messageData.map((msg, index) => {
          return (
            <ChatMessageComponent
              key={index}
              createrUid={msg.creater_uid}
              updateTime={msg.update_time}
              message={msg.message}
              onClick={handleIconView}
            />
          );
        })}
      <div ref={messagesEndRef} />

      <div className={classes.chatContent}>
        <div className="chat_textarea">
          <MuiTextField
            type="text"
            fullWidth={true}
            variant="outlined"
            multiline={true}
            value={message}
            placeholder={"メッセージを送信する"}
            onChange={inputMessage}
          />
        </div>

        <div className={classes.chatBtn}>
          <IconButton className={classes.sendBtn}>
            {message ? (
              <SendSharpIcon
                className={classes.activeBtn}
                color="primary"
                onClick={handleClick}
              />
            ) : (
              <SendSharpIcon className={classes.passiveBtn} />
            )}
          </IconButton>
        </div>
      </div>

      <ProfViewDialog
        uid={uid}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};
