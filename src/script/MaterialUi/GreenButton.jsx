import React from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
/* ===================================================================== */

const useStyles = makeStyles({
  green: {
    boxShadow: 'none',
    backgroundColor: 'white',
    color: green['A400'],
    border: '1px solid #00e676',
    '&:hover': {
      color: 'white',
      backgroundColor: green['A400'],
    },
  },
})

const GreenButton = (props) => {
  const classes = useStyles()
  return (
    <Button
      fullWidth={props.fullWidth}
      size={props.size}
      variant="contained"
      color="default"
      className={classes.green}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  )
}

export default GreenButton
