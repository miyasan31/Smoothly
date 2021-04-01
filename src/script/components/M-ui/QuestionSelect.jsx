import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
/* ===================================================================== */

const useStyles = makeStyles({
  formControl: {
    width: '30%',
    marginTop: '15px',
  },
  label: {
    paddingLeft: '20px',
  },
})

const QuestionSelect = (props) => {
  const classes = useStyles()
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>タイプ</InputLabel>
      <Select
        error={props.error}
        required
        value={props.value}
        onChange={(e) => props.select(e.target.value)}
      >
        {sent.map((sent, index) => {
          return (
            <MenuItem key={index} value={sent.type} className={classes.label}>
              {sent.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
export default QuestionSelect

const sent = [
  { type: '1', name: 'テキスト' },
  { type: '2', name: '２択（はい・いいえ）' },
  {
    type: '3',
    name: '３択（そう思う・どちらでもない・そう思わない）',
  },
]
