import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { readAnswers } from '../../../reducks/questions/operations'
import { getAnswerLists } from '../../../reducks/questions/selectors'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
/* ===================================================================== */

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.text,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.action.selected,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.action.disabled,
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
}))

const CollectList = (props) => {
  const classes = useStyles()

  return (
    <TableContainer className="mg_btm_20px" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.title} size="small" colSpan={2}>
              {props.missions.title}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.submits.length !== 0 ? (
            props.submits.map((data, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  className={classes.name}
                  component="th"
                  scope="row"
                >
                  <Typography variant="caption" color="textPrimary">
                    {data.creater_name}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell className={classes.item} align="left">
                  <a href={data.file.path}>
                    <Typography variant="caption" color="primary">
                      {data.file.file_name}
                    </Typography>
                  </a>
                </StyledTableCell>
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
                <p>提出者はまだいません。</p>
              </TableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CollectList
