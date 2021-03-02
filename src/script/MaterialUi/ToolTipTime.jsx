import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStylesBootstrap = makeStyles({
  tooltip: {
    backgroundColor: '#00000055',
    padding: '10px 10px',
    lineHeight: 0,
    fontSize: 5,
    fontWeight: 'bold',
  },
  arrow: {
    color: '#00000055',
  },
})

const ToolTipTime = (props) => {
  const classes = useStylesBootstrap()

  return (
    <Tooltip
      arrow
      placement="right-end"
      TransitionProps={{ timeout: 300 }}
      classes={classes}
      {...props}
    />
  )
}
export default ToolTipTime
