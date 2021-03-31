import React from 'react'

import AddCircleIcon from '@material-ui/icons/AddCircle'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  btn: {
    fontSize: '45px',
    color: orange[500],
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const AddButton = () => {
  const classes = useStyles()
  return <AddCircleIcon className={classes.btn} />
}
export default AddButton
