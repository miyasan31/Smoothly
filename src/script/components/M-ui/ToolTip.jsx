import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStylesBootstrap = makeStyles({
  tooltip: {
    backgroundColor: '#e91e63',
    lineHeight: 0,
    padding: '20px 30px',
    borderRadius: '20px',
    fontSize: 14,
    fontWeight: 'bold',
  },
  arrow: {
    color: '#e91e63',
  },
})

const ToolTip = (props) => {
  const classes = useStylesBootstrap()

  return (
    <Tooltip
      arrow
      placement="top-end"
      TransitionProps={{ timeout: 300 }}
      classes={classes}
      {...props}
    />
  )
}
export default ToolTip
