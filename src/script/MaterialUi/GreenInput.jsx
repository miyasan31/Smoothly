import React from 'react'

import TextField from '@material-ui/core/TextField'
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
/* ===================================================================== */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
})
const useStyles = makeStyles({
  input: {
    marginTop: '5px',
  },
})

const GreenInput = (props) => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <TextField
        className={classes.input}
        multiline={props.multiline}
        fullWidth={props.fullWidth}
        required={props.required}
        label={props.label}
        type={props.type}
        value={props.vaule}
        onChange={props.onChange}
      />
    </ThemeProvider>
  )
}
export default GreenInput
