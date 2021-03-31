import React, { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

import { ProfDialog, ActionCheckDialog } from '../render'
import { PinkButton, BlueButtonNomal } from '../../MaterialUi/materialui'
import { checkExt } from '../../../functions/function'
import { db } from '../../../firebase/firebase'
import { deleteMission } from '../../../reducks/missions/operations'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  media: {
    height: '0',
    padding: '50%',
    backgroundSize: 'contain',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(-90deg)',
  },
}))

const MissionList = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [name, setName] = useState('')
  const [className, setClassName] = useState('')
  const [icon, setIcon] = useState('')
  const [expanded, setExpanded] = useState(false)
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
    dispatch(push('/mission/edit/' + props.mid))
  }
  // 削除ボタンクリック
  const deleteHandleClick = () => {
    dispatch(deleteMission(props.mid))
    setOpenDeleteCheckDialog(false)
  }
  // 提出ボタンクリック
  const answerHandleClick = () => {
    dispatch(push('/mission/submit/' + props.mid))
  }
  // 集計ボタンクリック
  const analyticsHandleClick = () => {
    dispatch(push('/mission/collect/' + props.mid))
  }
  // プロフの表示
  const IconViewHandleClick = () => {
    setOpenProfDialog(true)
  }
  // 確認ダイアログ表示
  const deleteCheckHandleClick = () => {
    setOpenDeleteCheckDialog(true)
  }
  // ファイル表示ボタンクリック&矢印アイコンの向き変更
  const expandHandleClick = () => {
    setExpanded(!expanded)
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
    db.collection('missions')
      .doc(props.mid)
      .collection('submits')
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
            提出期限：{limitDateTime}
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

          {props.file.path && (
            <Button color="primary">
              <a href={props.file.path}>ファイルダウンロード</a>
            </Button>
          )}

          {checkExt(props.file.file_name) && (
            <Button
              aria-expanded={expanded}
              color="primary"
              onClick={expandHandleClick}
            >
              ファイル表示
              <ExpandMoreIcon
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
              />
            </Button>
          )}

          <div className="flex_grow"></div>

          {submitCheck && (
            <Typography variant="body2" className="red_center">
              提出済
            </Typography>
          )}

          {props.currentUid === props.createrUid ? (
            <PinkButton label={'集計'} onClick={analyticsHandleClick} />
          ) : (
            <PinkButton label={'提出'} onClick={answerHandleClick} />
          )}
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardMedia className={classes.media} image={props.file.path} />
          </CardContent>
        </Collapse>
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
export default MissionList
