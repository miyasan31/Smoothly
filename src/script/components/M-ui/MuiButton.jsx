import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  common: {
    boxShadow: 'none',
    marginLeft: '10px',
  },
  nomalCommon: {
    marginLeft: '0px',
  },
  full: {
    margin: '0px',
  },
  blue: {
    backgroundColor: '#00000000',
    color: '#2196f3',
    border: '1px solid #2196f3',
    '&:hover': {
      color: 'white',
      backgroundColor: '#2196f3',
    },
  },
  blueNomal: {
    color: '#2196f3',
  },
  orange: {
    backgroundColor: '#00000000',
    color: '#ff9800',
    border: '1px solid #ff9800',
    '&:hover': {
      color: 'white',
      backgroundColor: '#ff9800',
    },
  },
  green: {
    backgroundColor: '#00000000',
    color: '#00e676',
    border: '1px solid #00e676',
    '&:hover': {
      color: 'white',
      backgroundColor: '#00e676',
    },
  },
  pink: {
    backgroundColor: '#00000000',
    color: '#e91e63',
    border: '1px solid #e91e63',
    '&:hover': {
      color: 'white',
      backgroundColor: '#e91e63',
    },
  },
  pinkNomal: {
    color: '#e91e63',
  },
  grey: {
    marginTop: '15px',
    fontWeight: 'bold',
    color: '#9e9e9e',
    border: '1px solid #9e9e9e',
    backgroundColor: '#00000000',
    '&:hover': {
      color: 'white',
      backgroundColor: '#616161',
      border: '1px solid #616161',
    },
  },
}))

export const MuiButton = (props) => {
  const classes = useStyles()

  let style = [classes.common]
  if (props.color === 'blue') {
    style = [...style, classes.blue]
  } else if (props.color === 'blueNomal') {
    style = [...style, classes.blueNomal, classes.nomalCommon]
  } else if (props.color === 'pink') {
    style = [...style, classes.pink]
  } else if (props.color === 'pinkNomal') {
    style = [...style, classes.pinkNomal, classes.nomalCommon]
  } else if (props.color === 'orange') {
    style = [...style, classes.orange]
  } else if (props.color === 'green') {
    style = [...style, classes.green]
  } else if (props.color === 'grey') {
    style = [...style, classes.grey, classes.nomalCommon]
  }
  if (props.fullWidth) {
    style = [...style, classes.full]
  }

  return (
    <Button
      // type: blue, blueNomal, pink, pinkNomal, orange, green, grey
      className={style}
      fullWidth={props.fullWidth} // true, false
      size={props.size} // small, medium, large
      variant={props.variant} // text, outlined
      onClick={props.onClick} //
    >
      {/*  type: ReactNode */}
      {props.children}
      {/* type: string */}
      {props.label}
    </Button>
  )
}
