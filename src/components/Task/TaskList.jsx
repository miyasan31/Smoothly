import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import {
  updateDoingTask,
  updateCompletedTask,
  deleteDoingTask,
  deleteCompletedTask,
} from "src/reducks/tasks/operations";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import Divider from "@material-ui/core/Divider";
/* ===================================================================== */

export const TaskList = (props) => {
  const dispatch = useDispatch();
  // 時間を正規表現
  const timeChange = (time) => {
    const redate = time.toDate();
    const date = format(redate, "M月dd日 H:mm", { locale: ja });
    return date;
  };
  // チェックボックスボタンクリック
  const checkHandleClick = (tid) => {
    if (props.state === 0) {
      dispatch(updateDoingTask(tid));
    } else {
      dispatch(updateCompletedTask(tid));
    }
  };
  // 編集ボタンクリック
  const editHandleClick = (tid) => {
    dispatch(push("/task/edit/" + tid));
  };
  // 削除ボタンクリック
  const deleteHandleClick = (tid) => {
    if (props.state.doing) {
      dispatch(deleteDoingTask(tid));
    } else {
      dispatch(deleteCompletedTask(tid));
    }
  };

  return (
    <div>
      {props.myTasks.length > 0 ? (
        props.myTasks.map((task, index) => (
          <>
            <ListItem button key={task.tid}>
              <ListItemIcon>
                <Checkbox
                  edge="end"
                  color="primary"
                  onClick={() => checkHandleClick(task.tid)}
                />
              </ListItemIcon>
              <ListItemText
                primary={task.title}
                secondary={`${timeChange(task.startDate)} ー ${timeChange(
                  task.endDate
                )}`}
              />

              {props.state === 0 && (
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => editHandleClick(task.tid)}
                >
                  <EditSharpIcon />
                </IconButton>
              )}
              <div className="pd_left_10px">
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => deleteHandleClick(task.tid)}
                >
                  <DeleteSharpIcon />
                </IconButton>
              </div>
            </ListItem>
            {props.myTasks.length !== index + 1 && <Divider />}
          </>
        ))
      ) : (
        <ListItem>
          <ListItemText primary={"タスクがありません"} />
        </ListItem>
      )}
    </div>
  );
};
