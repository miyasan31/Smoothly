import React from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  blue: {
    boxShadow: 'none',
    backgroundColor: '#00000000',
    color: '#2196f3',
    border: '1px solid #2196f3',
    '&:hover': {
      color: 'white',
      backgroundColor: '#2196f3',
    },
  },
}))

const BlueButton = (props) => {
  const classes = useStyles()
  return (
    <Button
      fullWidth={props.fullWidth}
      size={props.size}
      variant="contained"
      color="default"
      className={classes.blue}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  )
}

export default BlueButton
