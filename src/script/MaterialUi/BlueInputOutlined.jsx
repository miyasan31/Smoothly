import React from 'react'

import TextField from '@material-ui/core/TextField'
/* ===================================================================== */

const BlueInputOutlined = (props) => {
  return (
    <TextField
      variant="outlined"
      type="text"
      autoFocus={props.autoFocus}
      fullWidth={props.fullWidth}
      required={props.required}
      multiline={props.multiline}
      rows={props.rows}
      rowsMax={props.rowMax}
      value={props.value}
      defaultValue={props.defaultValue}
      error={props.error}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  )
}
export default BlueInputOutlined
