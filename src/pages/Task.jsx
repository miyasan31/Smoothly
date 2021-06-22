import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

import { TaskTab } from "src/components/Task";
import { AppBarSubHeader, MuiTooltip } from "src/components/M-ui";
import { readTasks } from "src/reducks/tasks/operations";
import {
  getDoingTasksLists,
  getCompletedTasksLists,
} from "src/reducks/tasks/selectors";

import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
/* ===================================================================== */

export const Task = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const doingTasks = getDoingTasksLists(selector);
  const completedTasks = getCompletedTasksLists(selector);
  // 自分の未完了のスケジュールを取得
  useEffect(() => {
    dispatch(readTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 連絡作成ボタンクリック
  const pushHandleClick = () => {
    dispatch(push("/task/edit"));
  };

  return (
    <section className="main">
      <AppBarSubHeader subtitle={"タスク管理"} />

      <MuiTooltip
        title="連絡作成"
        icon={<EditIcon />}
        onClick={pushHandleClick}
      />

      <div className="contents_style">
        <Paper>
          <TaskTab doingTasks={doingTasks} completedTasks={completedTasks} />
        </Paper>
      </div>
    </section>
  );
};
