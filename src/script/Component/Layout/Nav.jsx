import React from 'react'
import { NavLink } from 'react-router-dom'

import {
  post,
  chat,
  schedule,
  question,
  mission,
  task,
  setting,
} from '../../Images/image.js'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
/* ===================================================================== */

const navItem = [
  { id: 1, tag: 'post', tagName: '掲示板', img: post },
  { id: 2, tag: 'mission', tagName: '課題', img: mission },
  { id: 3, tag: 'chat', tagName: 'チャット', img: chat },
  { id: 4, tag: 'task', tagName: 'タスク', img: task },
  { id: 5, tag: 'question', tagName: 'アンケート', img: question },
  { id: 6, tag: 'schedule', tagName: 'スケジュール', img: schedule },
  { id: 10, tag: 'setting', tagName: '設定', img: setting },
]
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 230,
    backgroundColor: theme.palette.background.paper,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  btn: {
    cursor: 'pointer',
    width: '100%',
    height: 37,
    maxWidth: 240,
  },
}))

const Nav = () => {
  const classes = useStyles()

  const navLink = navItem.map((e) => (
    <NavLink to={'/' + e.tag} key={e.id} activeClassName="activeButton">
      <div className="activeColor">
        <ListItem button className={classes.btn}>
          <img className="navIcon" src={e.img} alt={e.tagName} />
          <span className="navTag">{e.tagName}</span>
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
