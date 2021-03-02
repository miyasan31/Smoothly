import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { blue } from '@material-ui/core/colors'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  blue: {
    marginTop: '15px',
    boxShadow: 'none',
    backgroundColor: 'white',
    color: blue[500],
    border: '1px solid #2196f3',
    '&:hover': {
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: blue[500],
    },
  },
  input: {
    display: 'none',
  },
}))

const IconUpload = (props) => {
  const classes = useStyles()

  const onInputChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => {
        props.setInputImg(reader.result)
      },
      false
    )
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex_center_absolute">
      <input
        className={classes.input}
        accept="image/*"
        id="button-file"
        multiple
        type="file"
        onChange={onInputChange}
      />
      <label htmlFor="button-file">
        <Button
          className={classes.blue}
          fullWidth={props.fullWidth}
          size={props.size}
          variant="contained"
          color="primary"
          component="span"
        >
          {props.label}
        </Button>
      </label>
    </div>
  )
}
export default IconUpload
