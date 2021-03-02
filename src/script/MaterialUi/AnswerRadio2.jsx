import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  radio: {
    marginTop: '10px',
    fontSize: 10,
  },
}))

const AnswerRadio3 = (props) => {
  const classes = useStyles()

  const handleChange = (event) => {
    props.onChange(props.id, event.target.value)
  }

  return (
    <FormControl component="fieldset" className={classes.radio}>
      <RadioGroup
        column
        aria-label="position"
        name="position"
        value={props.value}
        onChange={handleChange}
      >
        <FormControlLabel
          disabled={props.disabled}
          value="1"
          control={<Radio color="primary" />}
          label="はい"
        />
        <FormControlLabel
          disabled={props.disabled}
          value="2"
          control={<Radio color="primary" />}
          label="いいえ"
        />
      </RadioGroup>
    </FormControl>
  )
}
export default AnswerRadio3
