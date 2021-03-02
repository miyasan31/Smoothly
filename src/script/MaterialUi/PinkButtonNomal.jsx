import React from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  blue: {
    boxShadow: 'none',
    backgroundColor: 'white',
    margin: '0 15px 0 0',
    paddingLeft: 15,
    paddingRight: 15,
    color: '#e91e63',
  },
}))

const PinkButtonNomal = (props) => {
  const classes = useStyles()
  return (
    <Button
      fullWidth={props.fullWidth}
      size={props.size}
      color="default"
      className={classes.blue}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  )
}

export default PinkButtonNomal
