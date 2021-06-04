import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  label: {
    paddingLeft: '20px',
  },
  full: {
    width: '100%',
  },
  half: {
    marginTop: '15px',
    width: '30%',
  },
}))

export const MuiSelectBox = (props) => {
  const classes = useStyles()

  let style = [classes.full]
  if (!props.fullWidth) {
    style = [...style, classes.half]
  }

  return (
    <FormControl className={style}>
      <InputLabel id="select-label">{props.label}</InputLabel>
      <Select
        labelId="select-label"
        required={props.required}
        variant={props.variant}
        value={props.value}
        onChange={(e) => props.select(e.target.value)}
        error={props.error}
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
