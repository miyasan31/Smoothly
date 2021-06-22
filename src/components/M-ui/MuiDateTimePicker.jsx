import jaLocale from "date-fns/locale/ja";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
/* ===================================================================== */

const useStyles = makeStyles({
  date: {
    marginTop: "10px",
  },
});

export const MuiDateTimePicker = (props) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
      <Grid container justify="space-around">
        <KeyboardDateTimePicker
          error={props.error}
          className={classes.date}
          disablePast={true}
          minDate={props.minDate}
          invalidDateMessage={false}
          ampm={props.ampm}
          format="yyyy年M月dd日 HH:mm"
          cancelLabel={"キャンセル"}
          okLabel={"決定"}
          fullWidth={props.fullWidth}
          value={props.value}
          onChange={props.onChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
