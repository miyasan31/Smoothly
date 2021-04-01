import React, { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

import { ProfDialog, ActionCheckDialog } from '../Layout'
import { PinkButton, BlueButtonNomal } from '../M-ui'
import { deleteQuestions } from '../../../reducks/questions/operations'
import { db } from '../../../firebase/firebase'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
/* ===================================================================== */

const QuestionList = (props) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [className, setClassName] = useState('')
  const [icon, setIcon] = useState('')
  const [submitCheck, setSubmitCheck] = useState(false)
  const [openProfDialog, setOpenProfDialog] = useState(false)
  const [openDeleteCheckDialog, setOpenDeleteCheckDialog] = useState(false)

  // 時間を正規表現
  const updateTime = props.updateTime.toDate()
  const updateDateTime = format(updateTime, 'yyyy年M月dd日 H:mm', {
    locale: ja,
  })
  const limitTime = props.limitTime.toDate()
  const limitDateTime = format(limitTime, 'yyyy年M月dd日 H:mm', { locale: ja })
  // 編集ボタンクリック
  const editHandleClick = () => {
    dispatch(push('/question/edit/' + props.qid))
  }
  // 削除ボタンクリック
  const deleteHandleClick = () => {
    dispatch(deleteQuestions(props.qid))
  }
  // 回答ボタンクリック
  const answerHandleClick = () => {
    dispatch(push('/question/answer/' + props.qid))
  }
  // 結果ボタンクリック
  const analyticsHandleClick = () => {
    dispatch(push('/question/analytics/' + props.qid))
  }
  // プロフの表示
  const IconViewHandleClick = () => {
    setOpenProfDialog(true)
  }
  // 確認ダイアログ表示
  const deleteCheckHandleClick = () => {
    setOpenDeleteCheckDialog(true)
  }
  // 投稿者の情報を取得
  useEffect(() => {
    if (props.createrUid) {
      db.collection('users')
        .doc(props.createrUid)
        .get()
        .then((snapshots) => {
          // .onSnapshot((snapshots) => {
          const userData = snapshots.data()
          if (userData) {
            setName(userData.user_name)
            setClassName(userData.class_name)
            setIcon(userData.icon.path)
          } else {
            setName('退会済みのユーザー')
          }
        })
    }
    db.collection('questions')
      .doc(props.qid)
      .collection('answers')
      .doc(props.currentUid)
      .get()
      .then((snapshots) => {
        const userData = snapshots.data()
        if (userData) {
          setSubmitCheck(true)
        }
      })
  }, [])

  return (
    <div>
      <Card className="mg_btm_20px">
        <CardHeader
          avatar={
            icon ? (
              <Avatar
                className={
                  props.currentUid === props.createrUid
                    ? 'pointer icon_circle_blue'
                    : 'pointer'
                }
                alt="userIcon"
                src={icon}
                onClick={IconViewHandleClick}
              />
            ) : (
              <Avatar
                className={
                  props.currentUid === props.createrUid
                    ? 'pointer icon_circle_blue'
                    : 'pointer'
                }
                onClick={IconViewHandleClick}
              >
                {name.charAt(0)}
              </Avatar>
            )
          }
          title={
            <Typography>
              {className} ｜ {name}
            </Typography>
          }
          subheader={`更新日時：${updateDateTime}`}
        />

        <CardContent>
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
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {props.item}
          </Typography>

          <Typography variant="body1" className="red_center pd_top_10px">
            回答期限：{limitDateTime}
          </Typography>
        </CardContent>

        <CardActions className="mg_10px">
          {props.currentUid === props.createrUid && (
            <>
              <BlueButtonNomal label={'編集'} onClick={editHandleClick} />
              <BlueButtonNomal
                label={'削除'}
                onClick={deleteCheckHandleClick}
              />
            </>
          )}
          <div className="flex_grow"></div>

          {submitCheck && (
            <Typography variant="body2" className="red_center">
              回答済
            </Typography>
          )}

          {props.currentUid === props.createrUid ? (
            <PinkButton label={'結果'} onClick={analyticsHandleClick} />
          ) : (
            <PinkButton label={'回答'} onClick={answerHandleClick} />
          )}
        </CardActions>
      </Card>

      <ProfDialog
        uid={props.createrUid}
        openDialog={openProfDialog}
        setOpenDialog={setOpenProfDialog}
      />

      <ActionCheckDialog
        text={'削除してもよろしいですか？'}
        openDialog={openDeleteCheckDialog}
        setOpenDialog={setOpenDeleteCheckDialog}
        actionHandleClick={deleteHandleClick}
      />
    </div>
  )
}
export default QuestionList
