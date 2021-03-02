import React, { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

import { ProfDialog } from '../render'
import { PinkButton, BlueButtonNomal } from '../../MaterialUi/materialui'
import { db } from '../../../firebase/firebase'
import { deleteQuestions } from '../../../reducks/questions/operations'

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
  const [openDialog, setOpenDialog] = useState(false)
  const [submitCheck, setSubmitCheck] = useState(false)

  // 時間を正規表現
  const updateTime = props.updateTime
  const u_date = updateTime.toDate()
  const updateDateTime = format(u_date, 'yyyy年M月dd日 H:mm', { locale: ja })
  const limitTime = props.limitTime
  const l_date = limitTime.toDate()
  const limitDateTime = format(l_date, 'yyyy年M月dd日 H:mm', { locale: ja })
  // プロフの表示
  const IconViewHandleClick = () => {
    setOpenDialog(true)
  }
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
      <Card className="margin_btm_20px">
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
          <Typography variant="body2" className="label">
            タイトル
          </Typography>
          <div className="space_5px"></div>

          <Typography variant="body1" className="padding_10px">
            {props.title}
          </Typography>
          <div className="space_10px"></div>

          <Typography variant="body2" className="label">
            内容
          </Typography>
          <div className="space_5px"></div>

          <Typography
            variant="body1"
            className="padding_10px"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {props.item}
          </Typography>
          <div className="space_10px"></div>

          <Typography variant="body1" className="red_center">
            回答期限：{limitDateTime}
          </Typography>
        </CardContent>

        <CardActions className="margin_10px">
          {props.currentUid === props.createrUid && (
            <>
              <BlueButtonNomal label={'編集'} onClick={editHandleClick} />
              <BlueButtonNomal label={'削除'} onClick={deleteHandleClick} />
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
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  )
}
export default QuestionList
