import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import { readChatRoom } from "../../../reducks/chats/operations";
import { getClassName } from "../../../reducks/users/selectors";
import { getRoomLists } from "../../../reducks/chats/selectors";
import { db } from "../../../firebase/firebase";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
/* ===================================================================== */

const useStyles = makeStyles({
  info: {
    minWidth: 100,
  },
});

export const ChatRoomList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const current_class = getClassName(selector);
  const roomLists = getRoomLists(selector);
  const [classRoom, setClassRoom] = useState([]);

  // ログインユーザーが所属するルームを検索
  useEffect(() => {
    db.collection("chats")
      .where("room_name", "==", current_class)
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshots) => {
          const classRoom = snapshots.data();
          const timeStamp = classRoom.update_time;
          const redate = timeStamp.toDate();
          const date = format(redate, "yyyy年M月dd日 H:mm", { locale: ja });
          const classData = {
            rid: classRoom.rid,
            room_name: classRoom.room_name,
            update_time: date,
          };
          setClassRoom(classData);
        });
      });
    dispatch(readChatRoom());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // ルーム画面へ飛ぶ
  const RoomPushHandleClick = (rid) => {
    dispatch(push("/chat/room/" + rid));
  };

  return (
    <div className="contents_style">
      <Paper className="paper_sub">
        <List component="nav">
          <ListItem
            button
            alignItems="flex-start"
            onClick={() => RoomPushHandleClick(classRoom.rid)}
          >
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: "#2196f3", fontSize: 17 }}>
                {classRoom.room_name ? classRoom.room_name.substr(0, 2) : ""}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              className={classes.info}
              primary={classRoom.room_name}
              secondary={classRoom.update_time}
            />
          </ListItem>

          {roomLists.length !== 0 && <Divider />}

          {roomLists.map((e) => {
            return (
              <ListItem
                key={e.rid}
                button
                alignItems="flex-start"
                onClick={() => RoomPushHandleClick(e.rid)}
              >
                <ListItemAvatar>
                  <Avatar src={e.icon} />
                </ListItemAvatar>
                <ListItemText
                  className={classes.info}
                  primary={`${e.room_name}（${e.memberNum}）`}
                  secondary={e.update_time}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </div>
  );
};
