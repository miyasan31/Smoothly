import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStyles = makeStyles({
  radio: {
    marginTop: '10px',
  },
})

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
          value="30"
          control={<Radio color="primary" disabled={props.disabled} />}
          label="そう思う"
        />
        <FormControlLabel
          value="20"
          control={<Radio color="primary" disabled={props.disabled} />}
          label="どちらでもない"
        />
        <FormControlLabel
          value="10"
          control={<Radio color="primary" disabled={props.disabled} />}
          label="そう思わない"
        />
      </RadioGroup>
    </FormControl>
  )
}

export default AnswerRadio3
