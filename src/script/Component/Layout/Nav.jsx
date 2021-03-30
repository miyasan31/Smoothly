import React from 'react'
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
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp'

// import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded'
// import AppsRoundedIcon from '@material-ui/icons/AppsRounded'
// import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded'
// import ForumRoundedIcon from '@material-ui/icons/ForumRounded'
// import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded'
// import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded'
// import TuneRoundedIcon from '@material-ui/icons/TuneRounded'
// import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
/* ===================================================================== */

const navItem = [
  { id: 1, tag: 'post', tagName: '掲示板', img: <SchoolSharpIcon /> },
  { id: 2, tag: 'mission', tagName: '課題', img: <DescriptionSharpIcon /> },
  { id: 3, tag: 'chat', tagName: 'チャット', img: <ForumSharpIcon /> },
  {
    id: 4,
    tag: 'task',
    tagName: 'タスク',
    img: <FormatListBulletedSharpIcon />,
  },
  {
    id: 5,
    tag: 'question',
    tagName: 'アンケート',
    img: <CategorySharpIcon />,
  },
  { id: 6, tag: 'schedule', tagName: 'スケジュール', img: <AppsSharpIcon /> },
  { id: 10, tag: 'setting', tagName: '設定', img: <TuneSharpIcon /> },
]
// const navItem = [
//   { id: 1, tag: 'post', tagName: '掲示板', img: <SchoolRoundedIcon /> },
//   { id: 2, tag: 'mission', tagName: '課題', img: <DescriptionRoundedIcon /> },
//   { id: 3, tag: 'chat', tagName: 'チャット', img: <ForumRoundedIcon /> },
//   {
//     id: 4,
//     tag: 'task',
//     tagName: 'タスク',
//     img: <FormatListBulletedRoundedIcon />,
//   },
//   {
//     id: 5,
//     tag: 'question',
//     tagName: 'アンケート',
//     img: <CategoryRoundedIcon />,
//   },
//   { id: 6, tag: 'schedule', tagName: 'スケジュール', img: <AppsRoundedIcon /> },
//   { id: 10, tag: 'setting', tagName: '設定', img: <TuneRoundedIcon /> },
// ]

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
    cursor: 'pointer',
    width: '100%',
    height: 37,
    maxWidth: 240,
    paddingLeft: 30,
  },
}))

const Nav = () => {
  const classes = useStyles()

  const navLink = navItem.map((e) => (
    <NavLink to={'/' + e.tag} key={e.id} activeClassName="activeButton">
      <div className="activeColor">
        <ListItem button className={classes.btn}>
          <ListItemIcon>{e.img}</ListItemIcon>
          <Typography className="navTag" variant="body2" color="textPrimary">
            {e.tagName}
          </Typography>
        </ListItem>
      </div>
    </NavLink>
  ))

  return (
    <List component="nav" className={classes.root}>
      {navLink}
    </List>
  )
}
export default Nav
