import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
/* ===================================================================== */

const useStyles = makeStyles({
  flexbox: { display: 'flex', height: '40px', boxSizing: 'border-box' },
  button: {
    boxShadow: 'none',
    fontWeight: 'bold',

    color: '#00000099',
    border: '1px solid #00000044',
    backgroundColor: 'white',
    '&:hover': {
      color: 'white',
      backgroundColor: '#00000066',
      border: '#00000066',
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

const FileUpload = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.flexbox}>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        <label className={classes.label}>
          <input
            className={classes.input}
            type="file"
            value={props.file}
            onChange={props.setFile}
            accept=".pdf, image/*, .doc/, .xls"
          />
          {props.label}
        </label>
      </Button>
    </div>
  )
}
export default FileUpload
