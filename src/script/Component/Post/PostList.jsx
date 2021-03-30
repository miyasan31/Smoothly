import React, { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

import { ProfDialog, ActionCheckDialog } from '../render'
import { BlueButtonNomal } from '../../MaterialUi/materialui'
import { checkExt } from '../../../functions/function'
import { db } from '../../../firebase/firebase'
import { deletePost } from '../../../reducks/posts/operations'

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
  root: {
    backgroundColor: theme.palette.background,
  },
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

const PostList = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [className, setClassName] = useState('')
  const [icon, setIcon] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [openProfDialog, setOpenProfDialog] = useState(false)
  const [openDeleteCheckDialog, setOpenDeleteCheckDialog] = useState(false)

  // 時間を正規表現
  const updateTime = props.updateTime.toDate()
  const updateDateTime = format(updateTime, 'yyyy年M月dd日 H:mm', {
    locale: ja,
  })
  // 編集ボタンクリック
  const editHandleClick = () => {
    dispatch(push('/post/edit/' + props.pid))
  }
  // 削除ボタンクリック
  const deleteHandleClick = () => {
    dispatch(deletePost(props.pid))
    setOpenDeleteCheckDialog(false)
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
  }, [])

  return (
    <>
      <Card className="mg_btm_20px" className={classes.root}>
        <CardHeader
          avatar={
            icon ? (
              <Avatar
                alt="userIcon"
                src={icon}
                className={
                  props.currentUid === props.createrUid
                    ? 'pointer icon_circle_blue'
                    : 'pointer'
                }
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
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.content}>
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
    </>
  )
}
export default PostList
