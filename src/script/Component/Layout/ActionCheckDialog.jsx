import React from 'react'

import { BlueButton, BlueButtonNomal } from '../../MaterialUi/materialui'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: 'inherit',
    margin: '0 auto',
    padding: '20px',
  },
}))

const ActionCheckDialog = (props) => {
  const classes = useStyles()

  // ダイアログを閉じる
  const handleClose = () => {
    props.setOpenDialog(false)
  }

  return (
    <Dialog
      keepMounted
      fullWidth
      maxWidth={'sm'}
      TransitionComponent={Transition}
      open={props.openDialog}
      onClose={handleClose}
    >
      <div className={classes.dialog}>
        <Typography variant="h6">{props.text}</Typography>
        <DialogActions>
          <BlueButtonNomal label={'キャンセル'} onClick={handleClose} />
          <BlueButton
            label={props.buttonLabel ? props.buttonLabel : '削除'}
            onClick={props.actionHandleClick}
          />
        </DialogActions>
      </div>
    </Dialog>
  )
}

export default ActionCheckDialog

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
