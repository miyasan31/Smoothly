import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { db } from '../../firebase/firebase.js'
import { signOut } from '../../reducks/users/operations'
import {
  Post,
  Chat,
  Question,
  Schedule,
  Mission,
  Setting,
  Task,
  Exit,
} from '../Images/image.js'

import SchoolSharpIcon from '@material-ui/icons/SchoolSharp'
import TuneSharpIcon from '@material-ui/icons/TuneSharp'
import AppsSharpIcon from '@material-ui/icons/AppsSharp'
import ShuffleSharpIcon from '@material-ui/icons/ShuffleSharp'
import VerticalSplitSharpIcon from '@material-ui/icons/VerticalSplitSharp'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
/* ===================================================================== */

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      zIndex: 150,
      display: 'block',
      [theme.breakpoints.up('md')]: {
        width: 256,
        flexShrink: 0,
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 256,
    },
    searchField: {
      alignItems: 'center',
      display: 'flex',
      marginLeft: 32,
    },
    icon: {
      opacity: 0.5,
    },
    item: {
      color: '#000000bb',
    },
  })
)

const ClosableDrawer = (props) => {
  const { container } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  const selectMenu = (event, path) => {
    dispatch(push(path))
    props.onClose(event, false)
  }

  const menus = [
    {
      func: selectMenu,
      label: '掲示板',
      icon: <Post />,
      id: 'post',
      value: '/post',
    },
    {
      func: selectMenu,
      label: '課題',
      icon: <Mission />,
      id: 'mission',
      value: '/mission',
    },
    {
      func: selectMenu,
      label: 'チャット',
      icon: <Chat />,
      id: 'chat',
      value: '/chat',
    },
    {
      func: selectMenu,
      label: 'タスク',
      icon: <Task />,
      id: 'task',
      value: '/task',
    },
    {
      func: selectMenu,
      label: 'アンケート',
      icon: <Question />,
      id: 'question',
      value: '/question',
    },
    {
      func: selectMenu,
      label: 'スケジュール',
      icon: <Schedule />,
      id: 'schedule',
      value: '/schedule',
    },
    {
      func: selectMenu,
      label: '設定',
      icon: <Setting />,
      id: 'setting',
      value: '/setting',
    },
  ]

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant="temporary"
        anchor={'left'}
        open={props.open}
        onClose={(e) => props.onClose(e, false)}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <div
          onClose={(e) => props.onClose(e, false)}
          onKeyDown={(e) => props.onClose(e, false)}
        >
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e) => menu.func(e, menu.value)}
              >
                <ListItemIcon className={classes.icon}>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText className={classes.item} primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <Exit className={classes.icon} />
              </ListItemIcon>
              <ListItemText className={classes.item} primary="ログアウト" />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer
