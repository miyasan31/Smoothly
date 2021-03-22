import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
/* ===================================================================== */

const useStyles = makeStyles({
  formControl: {
    width: '100%',
  },
  label: {
    paddingLeft: '20px',
  },
})

const SelectBox = (props) => {
  const classes = useStyles()

  return (
    <FormControl fullWidth>
      {props.label && <InputLabel>{props.label}</InputLabel>}
      <Select
        error={props.error}
        value={props.value}
        required={props.required}
        onChange={(e) => props.select(e.target.value)}
      >
        {props.options.map((value) => {
          return (
            <MenuItem key={value.id} value={value.id} className={classes.label}>
              {value.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default SelectBox
