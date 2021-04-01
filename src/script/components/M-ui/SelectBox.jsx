import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  label: {
    paddingLeft: '20px',
  },
}))

const SelectBox = (props) => {
  const classes = useStyles()

  return (
    <FormControl fullWidth={props.fullWidth}>
      {props.label && <InputLabel>{props.label}</InputLabel>}
      <Select
        className={classes.margin}
        error={props.error}
        value={props.value}
        required={props.required}
        variant={props.variant}
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
