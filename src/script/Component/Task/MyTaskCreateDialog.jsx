import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  BlueInput,
  DateTimePicker,
  BlueButton,
  BlueButtonNomal,
} from '../../MaterialUi/materialui'
import { addTask } from '../../../reducks/schedules/operations'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: 250,
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
    [theme.breakpoints.up('md')]: {
      width: 550,
    },
  },
  picker: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}))

const MyTaskCreateDialog = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndeDate] = useState(null)

  // タスク名入力イベント
  const inputTitle = (event) => {
    setTitle(event.target.value)
  }
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
    setTitle('')
    setStartDate(null)
    setEndeDate(null)
    props.setOpenDialog(false)
    props.setEditData('')
  }
  // 保存ボタンクリック
  const createHandleClick = () => {
    dispatch(addTask(title, startDate, endDate))
    setTitle('')
    setStartDate(null)
    setEndeDate(null)
    props.setOpenDialog(false)
    props.setEditData('')
  }

  useEffect(() => {
    if (props.editData !== '') {
      setTitle(props.editData.title)
      setStartDate(props.editData.startDate)
      setEndeDate(props.editData.endDate)
    }
  }, [props.editData])

  return (
    <Dialog
      keepMounted
      TransitionComponent={Transition}
      open={props.openDialog}
      onClose={handleClose}
    >
      <div className={classes.dialog}>
        <Typography
          variant="h6"
          className="title_underline"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          新規タスク
        </Typography>
        <div className="space_15px"></div>

        <Typography className="label">タスク名</Typography>
        <BlueInput
          label={null}
          type={'text'}
          fullWidth={true}
          multiline={true}
          value={title}
          onChange={inputTitle}
        />
        <div className="space_15px"></div>

        <div className={classes.picker}>
          <div className="flex_10">
            <Typography className="label">開始時刻</Typography>
            <DateTimePicker
              fullWidth={true}
              ampm={false}
              value={startDate}
              onChange={inputStartDate}
            />
          </div>
          <div className="flex_1"></div>
          <div className="flex_10">
            <Typography className="label">終了時刻</Typography>
            <DateTimePicker
              fullWidth={true}
              ampm={false}
              value={endDate}
              minDate={startDate}
              onChange={inputEndDate}
            />
            <Typography
              variant="body2"
              style={{ color: '#e91e63', fontSize: '12px' }}
              className="label"
            >
              {dateCheck(startDate, endDate)}
            </Typography>
          </div>
        </div>

        <div className="right margin_top_20px">
          <BlueButtonNomal label={'キャンセル'} onClick={handleClose} />
          <BlueButton label={'保存'} onClick={createHandleClick} />
        </div>
      </div>
    </Dialog>
  )
}
export default MyTaskCreateDialog

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
