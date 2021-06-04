import { MuiButton, MuiDialog } from '../M-ui'

import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
/* ===================================================================== */

export const ActionCheckDialog = (props) => {
  // ダイアログを閉じる
  const handleClose = () => {
    props.setOpenDialog(false)
  }

  return (
    <MuiDialog
      maxWidth="sm"
      openDialog={props.openDialog}
      onClose={handleClose}
    >
      <Typography variant="h6">{props.text}</Typography>
      <DialogActions>
        <MuiButton
          fullWidth={false}
          variant="text"
          color="blueNomal"
          label="キャンセル"
          onClick={handleClose}
        />
        <MuiButton
          fullWidth={false}
          variant="outlined"
          color="blue"
          label={props.buttonLabel ? props.buttonLabel : '削除'}
          onClick={props.actionHandleClick}
        />
      </DialogActions>
    </MuiDialog>
  )
}
