import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import {
  AppBarSubHeader,
  BlueInput,
  DateTimePicker,
  BlueButton,
  BlueButtonNomal,
} from '../../MaterialUi/materialui'
import { db } from '../../../firebase/firebase'
import { getUserId } from '../../../reducks/users/selectors'
import { addTask } from '../../../reducks/tasks/operations'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  picker: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}))

const MyTaskEdit = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const current_uid = getUserId(selector)
  const [tid, setTid] = useState('')
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndeDate] = useState(null)

  useEffect(() => {
    // URLからtidを取得
    const id = window.location.pathname.split('/task/edit')[1]
    if (id !== '') {
      setTid(id.split('/')[1])
    }
    // tidが存在すれば投稿情報を取得する
    if (tid !== '') {
      db.collection('users')
        .doc(current_uid)
        .collection('tasks')
        .doc(tid)
        .get()
        .then((snapshot) => {
          const task = snapshot.data()
          setTitle(task.title)
          setStartDate(task.startDate.toDate())
          setEndeDate(task.endDate.toDate())
        })
    }
  }, [tid])
  // タスク名入力イベント
  const inputTitle = useCallback(
    (event) => {
      setTitle(event.target.value)
    },
    [setTitle]
  )
  // 開始時刻入力イベント
  const inputStartDate = (date) => {
    setStartDate(date)
  }
  // 終了時刻入力イベント
  const inputEndDate = (date) => {
    setEndeDate(date)
  }
  // 終了時刻チェック
  const dateCheck = (startDate, endDate) => {
    if (startDate !== '' && endDate !== '') {
      if (endDate < startDate) {
        return '※開始時刻よりも後の時刻を入力してください'
      }
    } else {
      return ''
    }
  }
  // キャンセルボタンクリック
  const handleClose = () => {
    dispatch(push('/task'))
  }
  // 保存ボタンクリック
  const createHandleClick = () => {
    dispatch(addTask(tid, title, startDate, endDate))
  }
  console.log(tid)

  return (
    <section className="main">
      {tid === '' ? (
        <AppBarSubHeader subtitle={'タスク ー新規ー'} />
      ) : (
        <AppBarSubHeader subtitle={'タスク ー編集ー'} />
      )}

      <div className="contents_style">
        <Paper className="paper">
          <Typography className="label pd_top_10px">タスク名</Typography>
          <BlueInput
            label={null}
            type={'text'}
            fullWidth={true}
            multiline={true}
            value={title}
            defaultValue={title}
            onChange={inputTitle}
          />

          <div className={classes.picker}>
            <div className="flex_10">
              <Typography className="label pd_top_10px">開始時刻</Typography>
              <DateTimePicker
                fullWidth={true}
                ampm={false}
                value={startDate}
                onChange={inputStartDate}
              />
            </div>
            <div className="flex_1"></div>
            <div className="flex_10">
              <Typography className="label pd_top_10px">終了時刻</Typography>
              <DateTimePicker
                fullWidth={true}
                ampm={false}
                value={endDate}
                minDate={startDate}
                onChange={inputEndDate}
              />
              <Typography
                variant="body2"
                style={{ color: '#e91e63', fontSize: '11px' }}
                className="label"
              >
                {dateCheck(startDate, endDate)}
              </Typography>
            </div>
          </div>

          <div className="right mg_top_20px">
            <BlueButtonNomal label={'キャンセル'} onClick={handleClose} />
            <BlueButton
              label={tid === '' ? '追加' : '保存'}
              onClick={createHandleClick}
            />
          </div>
        </Paper>
      </div>
    </section>
  )
}
export default MyTaskEdit
