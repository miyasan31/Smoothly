import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { TaskTab } from '../components/Task'
import { AppBarSubHeader, MuiTooltip } from '../components/M-ui'
import { readTasks } from '../../reducks/tasks/operations'
import {
  getDoingTasksLists,
  getCompletedTasksLists,
} from '../../reducks/tasks/selectors'

import EditIcon from '@material-ui/icons/Edit'
import Paper from '@material-ui/core/Paper'
/* ===================================================================== */

export const Task = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const doingTasks = getDoingTasksLists(selector)
  const completedTasks = getCompletedTasksLists(selector)
  const [state, setState] = useState({
    doing: true,
    completed: true,
  })
  // 自分の未完了のスケジュールを取得
  useEffect(() => {
    dispatch(readTasks())
  }, [])
  // 実行中タスク、実行済みタスク切り替え
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  // 連絡作成ボタンクリック
  const pushHandleClick = () => {
    dispatch(push('/task/edit'))
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'タスク管理'} />

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
  )
}
