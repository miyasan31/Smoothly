import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { db } from '../../../firebase/firebase'
import {
  getUserId,
  getClassName,
  getUserValue,
} from '../../../reducks/users/selectors'
import { schoolevent } from './data/schoolevent'
import { AppBarSubHeader, NativeSelectBox } from '../../MaterialUi/materialui'

import Paper from '@material-ui/core/Paper'
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  AppointmentTooltip,
  EditRecurrenceMenu,
  AllDayPanel,
  DateNavigator,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui'
import {
  blue,
  deepPurple,
  blueGrey,
  teal,
  pink,
} from '@material-ui/core/colors'
/* ===================================================================== */

const Schedule = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const current_uid = getUserId(selector)
  const current_class = getClassName(selector)
  const current_value = getUserValue(selector)
  const [doingTasks, setDoingTasks] = useState('')
  const [completedTasks, setCompletedTasks] = useState('')
  const [allTasks, setAllTasks] = useState('')
  const [createdTasks, setCreatedTasks] = useState('')
  const [choice, setChoice] = useState('month')

  const userSchedule = schoolevent.concat(
    doingTasks,
    completedTasks,
    allTasks,
    createdTasks
  )

  // スケジュールを取得
  useEffect(() => {
    // ログインユーザーのタスク取得
    db.collection('users')
      .doc(current_uid)
      .collection('tasks')
      .where('tag', '==', '4')
      .get()
      .then((snapshots) => {
        const myTaskData = []
        if (snapshots.length !== 0) {
          snapshots.forEach((snapshot) => {
            const task = snapshot.data()
            const taskData = {
              title: task.title,
              tag: '4',
              startDate: task.startDate.toDate(),
              endDate: task.endDate.toDate(),
            }
            myTaskData.push(taskData)
          })
        }
        setDoingTasks(myTaskData)
      })
    db.collection('users')
      .doc(current_uid)
      .collection('tasks')
      .where('tag', '==', '5')
      .get()
      .then((snapshots) => {
        const myTaskData = []
        if (snapshots.length !== 0) {
          snapshots.forEach((snapshot) => {
            const task = snapshot.data()
            const taskData = {
              title: task.title,
              tag: '5',
              startDate: task.startDate.toDate(),
              endDate: task.endDate.toDate(),
            }
            myTaskData.push(taskData)
          })
        }
        setCompletedTasks(myTaskData)
      })
    // 全体のスケジュール取得
    db.collection('schedules')
      .where('destination', 'in', ['all', current_value, current_class])
      .get()
      .then((snapshots) => {
        const myTaskData = []
        if (snapshots.length !== 0) {
          snapshots.forEach((snapshot) => {
            const task = snapshot.data()
            if (task.creater_uid !== current_uid) {
              const taskData = {
                title: task.title,
                tag: task.tag,
                startDate: task.startDate.toDate(),
                endDate: task.endDate.toDate(),
              }
              myTaskData.push(taskData)
            }
          })
        }
        setAllTasks(myTaskData)
      })
    db.collection('schedules')
      .where('creater_uid', '==', current_uid)
      .get()
      .then((snapshots) => {
        const myTaskData = []
        if (snapshots.length !== 0) {
          snapshots.forEach((snapshot) => {
            const task = snapshot.data()
            const taskData = {
              title: task.title,
              tag: '6',
              startDate: task.startDate.toDate(),
              endDate: task.endDate.toDate(),
            }
            myTaskData.push(taskData)
          })
        }
        setCreatedTasks(myTaskData)
      })
  }, [])

  return (
    <section className="schedules_main">
      <AppBarSubHeader subtitle={'スケジュール'} />
      <div className="schedules_view_switcher">
        <NativeSelectBox
          fullWidth={false}
          options={send}
          value={choice}
          variant={'outlined'}
          select={setChoice}
        />
      </div>

      <Paper style={{ boxShadow: 'none', borderBottom: '1px solid #00000022' }}>
        <Scheduler data={userSchedule} locale="JA">
          <ViewState />
          <EditingState />
          {choice === 'month' ? (
            <MonthView />
          ) : choice === 'week' ? (
            <WeekView />
          ) : (
            <DayView />
          )}
          <AllDayPanel />
          <EditRecurrenceMenu />
          <Appointments />
          <AppointmentTooltip showCloseButton />

          <Toolbar />
          <DateNavigator />
          <Resources data={resources} />
        </Scheduler>
      </Paper>
    </section>
  )
}

export default Schedule

const resources = [
  {
    fieldName: 'tag',
    title: 'tag',
    instances: [
      { id: '1', text: '学校行事', color: blueGrey },
      { id: '2', text: '課題', color: deepPurple },
      { id: '3', text: 'アンケート', color: teal },
      { id: '4', text: '個人タスク　ー実行中ー', color: blue },
      { id: '5', text: '個人タスク　ー実行済ー', color: blue[100] },
      { id: '6', text: '投稿したタスク', color: pink },
    ],
  },
]

const send = [
  { id: 'month', name: '月' },
  { id: 'week', name: '週' },
  { id: 'day', name: '日' },
]
