import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'

/* ===================================================================== */

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const ErrorAlert = (props) => {
  const handleClose = () => {
    props.setOpenAlert(false)
  }
  return (
    <Alert className="mg_btm_10px" onClose={handleClose} severity="error">
      未入力項目があります
    </Alert>
  )
}

export default ErrorAlert
