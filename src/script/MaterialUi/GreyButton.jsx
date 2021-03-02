import React from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStyles = makeStyles({
  grey: {
    marginTop: '15px',
    boxShadow: 'none',
    fontWeight: 'bold',

    color: '#00000099',
    border: '1px solid #00000044',
    backgroundColor: 'white',
    '&:hover': {
      color: 'white',
      backgroundColor: '#00000066',
      border: '1px solid #00000000',
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
