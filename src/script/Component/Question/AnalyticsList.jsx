import React from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
/* ===================================================================== */

const StyledTableCell = withStyles({
  head: {
    backgroundColor: '#bbdefb',
    color: '000000de',
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
})(TableCell)

const StyledTableRow = withStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f8f8f8',
    },
  },
})(TableRow)

const useStyles = makeStyles({
  title: {
    fontSize: 15,
  },
  name: {
    width: 100,
    minWidth: 30,
    paddingRight: '0',
    fontSize: 12,
  },
  item: {
    width: 300,
    fontSize: 12,
  },
  symbol: {
    width: 1,
    paddingLeft: '0',
    fontSize: 12,
  },
})

const AnalyticsList = (props) => {
  const classes = useStyles()

  return (
    <TableContainer className="mg_btm_20px" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.title} size="small" colSpan={3}>
              {props.item}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.answers !== '' ? (
            props.answers.map((answer, index) => (
              <StyledTableRow key={index}>
                <TableCell
                  className={classes.name}
                  size="small"
                  component="th"
                  scope="answer"
                >
                  {answer.answer_name}
                </TableCell>
                <TableCell className={classes.item} size="small" align="left">
                  {props.type === '1' && answer.answer_data[props.id]}
                  {answer.answer_data[props.id] === '1' && 'はい'}
                  {answer.answer_data[props.id] === '2' && 'いいえ'}
                  {answer.answer_data[props.id] === '10' && 'そう思わない'}
                  {answer.answer_data[props.id] === '20' && 'どちらでもない'}
                  {answer.answer_data[props.id] === '30' && 'そう思う'}
                </TableCell>
                <TableCell
                  className={classes.symbol}
                  size="small"
                  component="th"
                  align="right"
                >
                  {answer.answer_data[props.id] === '1' && '⭕️'}
                  {answer.answer_data[props.id] === '2' && '❌'}
                  {answer.answer_data[props.id] === '10' && '🔵'}
                  {answer.answer_data[props.id] === '20' && '🟢'}
                  {answer.answer_data[props.id] === '30' && '🔴'}
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
                <p>回答はまだありません。</p>
              </TableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AnalyticsList
