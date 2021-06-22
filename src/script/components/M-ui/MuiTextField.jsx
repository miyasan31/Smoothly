import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
/* ===================================================================== */

const useStyles = makeStyles({
  common: {
    marginTop: "15px",
  },
  answer: {
    width: "65%",
  },
});

export const MuiTextField = (props) => {
  const classes = useStyles();

  let style = [classes.common];
  if (props.answer) {
    style = [...style, classes.answer];
  }

  return (
    <TextField
      className={style}
      type={props.type} // text, number, password, email
      fullWidth={props.fullWidth} // true, false
      variant={props.variant} // standard, outlined
      multiline={props.multiline} // true, false
      disabled={props.disabled} // true, false
      rows={props.rows}
      rowsMax={props.rowsMax}
      label={props.label} // type: string
      placeholder={props.placeholder} // type: string
      value={props.vaule} // type: props.type
      defaultValue={props.defaultValue} // type: props.type
      onChange={props.onChange} //
      error={props.error} // true, false
    />
  );
};
