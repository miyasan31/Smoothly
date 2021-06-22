import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

/* ===================================================================== */
const useStyle = makeStyles({
  tooltip: {
    backgroundColor: "#e91e63",
    lineHeight: 0,
    padding: "20px 30px",
    borderRadius: "20px",
    fontSize: 14,
    fontWeight: "bold",
  },
  arrow: {
    color: "#e91e63",
  },
});
export const MuiTooltip = (props) => {
  const classes = useStyle();
  return (
    <div className="edit_addbtn">
      <Tooltip
        classes={classes}
        title={props.title}
        arrow
        placement="top-end"
        TransitionProps={{ timeout: 300 }}
      >
        <Fab color="secondary" onClick={props.onClick}>
          {props.icon}
        </Fab>
      </Tooltip>
    </div>
  );
};
