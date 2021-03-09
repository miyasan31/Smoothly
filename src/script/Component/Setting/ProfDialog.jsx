import React, { useState } from 'react'

import { BlueButton } from '../../MaterialUi/materialui'
import { db } from '../../../firebase/firebase'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: 'inherit',
    margin: '0 auto',
    padding: 20,
  },
}))

const ProfDialog = (props) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [prof, setProf] = useState('')

  // ダイアログが開いたらユーザーの情報を取得
  if (props.openDialog) {
    db.collection('users')
      .doc(props.uid)
      .get()
      .then((snapshots) => {
        const userData = snapshots.data()
        let icon = ''
        if (userData.user_value === 'teacher' && userData.gender === 'man') {
          icon = '👨‍🏫'
        } else if (
          userData.user_value === 'teacher' &&
          userData.gender === 'lady'
        ) {
          icon = '👩‍🏫'
        } else if (userData.gender === 'man') {
          icon = '👨‍🎓'
        } else if (userData.gender === 'lady') {
          icon = '👩‍🎓'
        }
        setName(`${icon} ${userData.class_name} ｜ ${userData.user_name}`)
        if (userData.prof !== '') {
          setProf(userData.prof)
        } else {
          setProf('登録されていません。')
        }
      })
      .catch(() => {
        setName('ユーザー情報が見つかりません。')
      })
  }
  // ダイアログを閉じる
  const handleClose = () => {
    props.setOpenDialog(false)
  }

  return (
    <div>
      <Dialog
        keepMounted
        fullWidth
        maxWidth={'sm'}
        TransitionComponent={Transition}
        open={props.openDialog}
        onClose={handleClose}
      >
        <div className={classes.dialog}>
          <Typography variant="h6" className="title_underline">
            {name}
          </Typography>

          <Typography
            variant="body1"
            className="pd_top_20px"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {prof}
          </Typography>

          <DialogActions>
            <BlueButton onClick={handleClose} size={'small'} label={'閉じる'} />
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}

export default ProfDialog

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
