import React from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
/* ===================================================================== */

const useStyles = makeStyles({
  orange: {
    boxShadow: 'none',
    backgroundColor: 'white',
    color: orange[500],
    border: '1px solid #ff9800',
    '&:hover': {
      color: 'white',
      backgroundColor: orange[500],
    },
  },
})

const OrangeButton = (props) => {
  const classes = useStyles()
  return (
    <Button
      fullWidth={props.fullWidth}
      size={props.size}
      variant="contained"
      color="default"
      className={classes.orange}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  )
}

export default OrangeButton
