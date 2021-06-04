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

export const MuiRadioButton = (props) => {
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
        {props.options.map((value) => (
          <FormControlLabel
            value={value.value}
            control={<Radio color="primary" disabled={props.disabled} />}
            label={value.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
