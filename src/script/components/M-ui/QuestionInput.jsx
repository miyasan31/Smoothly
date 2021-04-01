import React, { useState, useCallback } from 'react'

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStyles = makeStyles({
  input: {
    width: '65%',
    marginTop: '15px',
  },
})

const QuestionInput = (props) => {
  const classes = useStyles()

  return (
    <TextField
      error={props.error}
      className={classes.input}
      multiline
      label="質問内容"
      type="text"
      rows="1"
      value={props.value}
      onChange={props.onChange}
    />
  )
}
export default QuestionInput
