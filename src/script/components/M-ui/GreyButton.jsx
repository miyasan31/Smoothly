import React from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStyles = makeStyles({
  grey: {
    marginTop: '15px',
    boxShadow: 'none',
    fontWeight: 'bold',

    color: '#9e9e9e',
    border: '1px solid #9e9e9e',
    backgroundColor: '#00000000',
    '&:hover': {
      color: 'white',
      backgroundColor: '#616161',
      border: '1px solid #616161',
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
      className={classes.grey}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  )
}

export default OrangeButton
