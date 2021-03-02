import React from 'react'

import TextField from '@material-ui/core/TextField'
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
/* ===================================================================== */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
})
const useStyles = makeStyles({
  input: {
    marginTop: '15px',
  },
})

const OrangeInput = (props) => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <TextField
        className={classes.input}
        fullWidth={props.fullWidth}
        required={props.required}
        multiline={props.multiline}
        label={props.label}
        type={props.type}
        value={props.vaule}
        onChange={props.onChange}
      />
    </ThemeProvider>
  )
}
export default OrangeInput
