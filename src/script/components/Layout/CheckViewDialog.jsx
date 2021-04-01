import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

import {
  BlueButton,
  BlueButtonNomal,
  AnswerText1,
  AnswerRadio2,
  AnswerRadio3,
} from '../M-ui'
import { db } from '../../../firebase/firebase'
import { getUserId } from '../../../reducks/users/selectors'
import { checkExt } from '../../../functions/function'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide'
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
    backgroundColor: theme.palette.text.secondary,
  },
  dialog: {
    width: '100%',
    margin: '0 auto',
    padding: 25,
    paddingBottom: 0,
    backgroundColor: theme.palette.background.default,
  },
  card: {
    marginTop: '20px',
    padding: '5px 20px 20px 20px',
    backgroundColor: theme.palette.action.hover,
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

const CheckViewDialog = (props) => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const current_uid = getUserId(selector)
  const [name, setName] = useState('')
  const [className, setClassName] = useState('')
  const [icon, setIcon] = useState('')
  const [expanded, setExpanded] = useState(false)

  // 時間を正規表現
  const time = new Date()
  const updateTime = format(time, 'yyyy年M月dd日 H:mm', { locale: ja })
  // ダイアログを閉じる
  const handleClose = () => {
    props.setOpenDialog(false)
  }
  // ファイル表示ボタンクリック&矢印アイコンの向き変更
  const expandHandleClick = () => {
    setExpanded(!expanded)
  }
  // 投稿者の情報を取得
  useEffect(() => {
    db.collection('users')
      .doc(current_uid)
      .get()
      .then((snapshots) => {
        const userData = snapshots.data()
        if (userData) {
          setName(userData.user_name)
          setClassName(userData.class_name)
          setIcon(userData.icon.path)
        } else {
          setName('退会済みのユーザー')
        }
      })
  }, [])

  return (
    <Dialog
      className={classes.root}
      keepMounted
      fullWidth
      maxWidth={'md'}
      TransitionComponent={Transition}
      open={props.openDialog}
      onClose={handleClose}
    >
      <div className={classes.dialog}>
        <Typography variant="h6" className="pd_y_10px error_message">
          この内容で投稿しますか？
        </Typography>
        <Card className="mg_btm_10px">
          <CardHeader
            avatar={
              icon ? (
                <Avatar
                  className="icon_circle_blue"
                  alt="userIcon"
                  src={icon}
                />
              ) : (
                <Avatar className="icon_circle_blue">{name.charAt(0)}</Avatar>
              )
            }
            title={
              <Typography>
                {className} ｜ {name}
              </Typography>
            }
            subheader={`更新日時：${updateTime}`}
          />

          <CardContent>
            <Typography variant="body2" className="label">
              投稿先
            </Typography>
            <Typography variant="body1" className="pd_10px">
              {props.destination === 'all'
                ? '全体'
                : props.destination === 'teacher'
                ? '教官'
                : props.destination === 'student'
                ? '学生'
                : props.destination === 'PI-11A-172'
                ? 'PI-11A-172'
                : props.destination === 'PW-11A-172'
                ? 'PW-11A-172'
                : ''}
            </Typography>

            <Typography variant="body2" className="label">
              タイトル
            </Typography>
            <Typography variant="body1" className="pd_10px">
              {props.title}
            </Typography>

            <Typography variant="body2" className="label">
              内容
            </Typography>
            <Typography
              variant="body1"
              className="pd_10px"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {props.item}
            </Typography>

            {props.limitTime && (
              <Typography variant="body1" className="red_center">
                提出期限：
                {format(props.limitTime, 'yyyy年M月dd日 H:mm', {
                  locale: ja,
                })}
              </Typography>
            )}

            {props.questionData &&
              props.questionData.map((data, index) => (
                <Card key={index} className={classes.card}>
                  <CardHeader
                    title={
                      <Typography variant="h6" className="label">
                        質問 {`${index + 1}`}
                      </Typography>
                    }
                  />
                  <Typography variant="h6">{data.item}</Typography>
                  <Typography variant="body1">
                    {data.type === '1' ? (
                      <AnswerText1
                        id={index}
                        label={'テキストを入力'}
                        type={'text'}
                        fullWidth={true}
                        disabled={true}
                        multiline={false}
                        value={null}
                      />
                    ) : data.type === '2' ? (
                      <AnswerRadio2 id={index} disabled={true} />
                    ) : (
                      <AnswerRadio3 id={index} disabled={true} fullWidth />
                    )}
                  </Typography>
                </Card>
              ))}
          </CardContent>

          <CardActions className="mg_10px">
            {props.fileName && (
              <Button color="primary">ファイルダウンロード</Button>
            )}
            {checkExt(props.fileName) && (
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
              <CardMedia className={classes.media} image={props.preview} />
            </CardContent>
          </Collapse>
        </Card>

        <DialogActions className="mg_btm_10px">
          <BlueButtonNomal label={'キャンセル'} onClick={handleClose} />
          <BlueButton label="投稿" onClick={props.updateHandleClick} />
        </DialogActions>
      </div>
    </Dialog>
  )
}

export default CheckViewDialog

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
