import React from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  pink: {
    boxShadow: 'none',
    backgroundColor: '#00000000',
    color: '#e91e63',
    border: '1px solid #e91e63',
    '&:hover': {
      color: 'white',
      backgroundColor: '#e91e63',
    },
    [theme.breakpoints.up('sm')]: {},
  },
}))

const PinkButton = (props) => {
  const classes = useStyles()
  return (
    <Button
      fullWidth={props.fullWidth}
      size={props.size}
      variant="contained"
      color="default"
      className={classes.pink}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  )
}

export default PinkButton
