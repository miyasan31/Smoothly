import React from 'react'

import TextField from '@material-ui/core/TextField'
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
/* ===================================================================== */

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
})
const useStyles = makeStyles({
  input: {
    marginTop: '10px',
  },
})

const AnswerText1 = (props) => {
  const classes = useStyles()

  const handleChange = (event) => {
    props.onChange(props.id, event.target.value)
  }

  return (
    <ThemeProvider theme={theme}>
      <TextField
        className={classes.input}
        label={props.label}
        type={props.type}
        fullWidth={props.fullWidth}
        disabled={props.disabled}
        multiline={props.multiline}
        value={props.vaule}
        onChange={handleChange}
      />
    </ThemeProvider>
  )
}
export default AnswerText1
