// import { forwardRef } from 'react'
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
// import Slide from '@material-ui/core/Slide'
/* ===================================================================== */

const useStyles = makeStyles(() => ({
  dialog: {
    width: "inherit",
    margin: "0 auto",
    padding: "20px 0px",
  },
}));

export const MuiDialog = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      keepMounted
      fullWidth
      maxWidth={props.maxWidth}
      open={props.openDialog}
      setOpenDialog={props.setOpenDialog}
      onClose={props.onClose}
      // TransitionComponent={Transition}
    >
      <div className={classes.dialog}>{props.children}</div>
    </Dialog>
  );
};

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />
// })
