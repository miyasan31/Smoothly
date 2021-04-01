import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import SchoolSharpIcon from '@material-ui/icons/SchoolSharp'
import DescriptionSharpIcon from '@material-ui/icons/DescriptionSharp'
import ForumSharpIcon from '@material-ui/icons/ForumSharp'
import FormatListBulletedSharpIcon from '@material-ui/icons/FormatListBulletedSharp'
import CategorySharpIcon from '@material-ui/icons/CategorySharp'
import AppsSharpIcon from '@material-ui/icons/AppsSharp'
import TuneSharpIcon from '@material-ui/icons/TuneSharp'

/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 230,
    backgroundColor: theme.palette.background.paper,
    display: 'none',
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  btn: {
    maxWidth: 240,
    paddingLeft: 30,
  },
}))

const Nav = () => {
  const classes = useStyles()

  const [selectedIndex, setSelectedIndex] = useState(1)
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <List component="nav" className={classes.root}>
      <NavLink to="/post">
        <ListItem
          button
          className={classes.btn}
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <SchoolSharpIcon
              color={selectedIndex === 1 ? 'primary' : 'textPrimary'}
            />
          </ListItemIcon>
          <Typography
            variant="body2"
            color={selectedIndex === 1 ? 'primary' : 'textPrimary'}
          >
            掲示板
          </Typography>
        </ListItem>
      </NavLink>

      <NavLink to="/mission">
        <ListItem
          button
          className={classes.btn}
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <DescriptionSharpIcon
              color={selectedIndex === 2 ? 'primary' : 'textPrimary'}
            />
          </ListItemIcon>
          <Typography
            variant="body2"
            color={selectedIndex === 2 ? 'primary' : 'textPrimary'}
          >
            課題
          </Typography>
        </ListItem>
      </NavLink>

      <NavLink to="/chat">
        <ListItem
          button
          className={classes.btn}
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <ForumSharpIcon
              color={selectedIndex === 3 ? 'primary' : 'textPrimary'}
            />
          </ListItemIcon>
          <Typography
            variant="body2"
            color={selectedIndex === 3 ? 'primary' : 'textPrimary'}
          >
            チャット
          </Typography>
        </ListItem>
      </NavLink>

      <NavLink to="/task">
        <ListItem
          button
          className={classes.btn}
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <FormatListBulletedSharpIcon
              color={selectedIndex === 4 ? 'primary' : 'textPrimary'}
            />
          </ListItemIcon>
          <Typography
            variant="body2"
            color={selectedIndex === 4 ? 'primary' : 'textPrimary'}
          >
            タスク
          </Typography>
        </ListItem>
      </NavLink>

      <NavLink to="/question">
        <ListItem
          button
          className={classes.btn}
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemIcon>
            <CategorySharpIcon
              color={selectedIndex === 5 ? 'primary' : 'textPrimary'}
            />
          </ListItemIcon>
          <Typography
            variant="body2"
            color={selectedIndex === 5 ? 'primary' : 'textPrimary'}
          >
            アンケート
          </Typography>
        </ListItem>
      </NavLink>

      <NavLink to="/schedule">
        <ListItem
          button
          className={classes.btn}
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
        >
          <ListItemIcon>
            <AppsSharpIcon
              color={selectedIndex === 6 ? 'primary' : 'textPrimary'}
            />
          </ListItemIcon>
          <Typography
            variant="body2"
            color={selectedIndex === 6 ? 'primary' : 'textPrimary'}
          >
            スケジュール
          </Typography>
        </ListItem>
      </NavLink>

      <NavLink to="/setting">
        <ListItem
          button
          className={classes.btn}
          selected={selectedIndex === 7}
          onClick={(event) => handleListItemClick(event, 7)}
        >
          <ListItemIcon>
            <TuneSharpIcon
              color={selectedIndex === 7 ? 'primary' : 'textPrimary'}
            />
          </ListItemIcon>
          <Typography
            variant="body2"
            color={selectedIndex === 7 ? 'primary' : 'textPrimary'}
          >
            設定
          </Typography>
        </ListItem>
      </NavLink>
    </List>
  )
}
export default Nav
