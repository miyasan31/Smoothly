import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import CloudOffIcon from '@material-ui/icons/CloudOff'
import { red } from '@material-ui/core/colors'
/* ===================================================================== */

const useStyles = makeStyles({
  flexbox: { display: 'flex', height: '40px', boxSizing: 'border-box' },
  button: {
    boxShadow: 'none',
    fontWeight: 'bold',

    color: red[400],
    border: '1px solid',
    borderColor: red[400],
    backgroundColor: 'white',
    '&:hover': {
      color: 'white',
      backgroundColor: red[400],
    },
  },
  label: {
    position: 'relative',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  input: {
    position: 'absolute',
    top: '-7px',
    left: '-40px',
    padding: '6px',
    width: '145px',
    opacity: 0,
  },
  fileName: { lineHeight: '0em', padding: '20px' },
})

const FileDelete = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.flexbox}>
      <Button
        className={classes.button}
        variant="contained"
        onClick={props.onClick}
        startIcon={<CloudOffIcon />}
      >
        <label className={classes.label}>{props.label}</label>
      </Button>
    </div>
  )
}
export default FileDelete
