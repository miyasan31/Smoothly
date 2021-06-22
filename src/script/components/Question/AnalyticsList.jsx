import { withStyles, makeStyles } from "@material-ui/core/styles";




import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
/* ===================================================================== */

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.text,
    fontWeight: "bold"
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.action.selected,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.action.disabled,
    fontSize: 15
  },
  name: {
    width: 100,
    minWidth: 30,
    paddingRight: "0",
    fontSize: 12
  },
  item: {
    width: 300,
    fontSize: 12
  },
  symbol: {
    width: 1,
    paddingLeft: "0",
    fontSize: 12
  }
}));

export const AnalyticsList = (props) => {
  const classes = useStyles();

  return (
    <TableContainer className="mg_btm_20px" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.title} colSpan={3}>
              {props.item}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.answers !== "" ? (
            props.answers.map((answer, index) => (
              <StyledTableRow key={index}>
                <TableCell
                  className={classes.name}
                  size="small"
                  component="th"
                  scope="answer"
                >
                  <Typography variant="caption" color="textPrimary">
                    {answer.answer_name}
                  </Typography>
                </TableCell>
                <TableCell className={classes.item} size="small" align="left">
                  <Typography variant="caption" color="textPrimary">
                    {props.type === "1" && answer.answer_data[props.id]}
                    {answer.answer_data[props.id] === "1" && "はい"}
                    {answer.answer_data[props.id] === "2" && "いいえ"}
                    {answer.answer_data[props.id] === "10" && "そう思わない"}
                    {answer.answer_data[props.id] === "20" && "どちらでもない"}
                    {answer.answer_data[props.id] === "30" && "そう思う"}
                  </Typography>
                </TableCell>
                <TableCell
                  className={classes.symbol}
                  size="small"
                  component="th"
                  align="right"
                >
                  {answer.answer_data[props.id] === "1" && "⭕️"}
                  {answer.answer_data[props.id] === "2" && "❌"}
                  {answer.answer_data[props.id] === "10" && "🔵"}
                  {answer.answer_data[props.id] === "20" && "🟢"}
                  {answer.answer_data[props.id] === "30" && "🔴"}
                </TableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <TableCell
                className={classes.name}
                size="small"
                component="th"
                scope="answer"
              >
                <Typography variant="caption" color="textPrimary">
                  回答はまだありません
                </Typography>
              </TableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
