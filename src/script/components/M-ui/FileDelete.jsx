import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import CloudOffIcon from '@material-ui/icons/CloudOff'
/* ===================================================================== */

const useStyles = makeStyles({
  button: {
    boxShadow: 'none',
    fontWeight: 'bold',

    color: '#f44336',
    border: '1px solid',
    borderColor: '#f44336',
    backgroundColor: '#00000000',
    '&:hover': {
      color: 'white',
      backgroundColor: '#f44336',
    },
  },
  label: {
    position: 'relative',
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const FileDelete = (props) => {
  const classes = useStyles()

  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={props.onClick}
      startIcon={<CloudOffIcon />}
    >
      <label className={classes.label}>{props.label}</label>
    </Button>
  )
}
