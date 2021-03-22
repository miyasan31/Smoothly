import React from 'react'

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStyles = makeStyles({
  input: {
    marginTop: '10px',
  },
})

const BlueInput = (props) => {
  const classes = useStyles()

  return (
    <TextField
      error={props.error}
      className={classes.input}
      label={props.label}
      type={props.type}
      fullWidth={props.fullWidth}
      multiline={props.multiline}
      rows={props.rows}
      value={props.vaule}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    />
  )
}
export default BlueInput
