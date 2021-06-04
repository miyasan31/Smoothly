import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { signOut } from '../../../reducks/users/operations'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded'
import AppsRoundedIcon from '@material-ui/icons/AppsRounded'
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded'
import ForumRoundedIcon from '@material-ui/icons/ForumRounded'
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded'
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded'
import TuneRoundedIcon from '@material-ui/icons/TuneRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'

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
  })
)

export const ClosableDrawer = (props) => {
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
      icon: <SchoolRoundedIcon />,
      id: 'post',
      value: '/post',
    },
    {
      func: selectMenu,
      label: '課題',
      icon: <DescriptionRoundedIcon />,
      id: 'mission',
      value: '/mission',
    },
    {
      func: selectMenu,
      label: 'チャット',
      icon: <ForumRoundedIcon />,
      id: 'chat',
      value: '/chat',
    },
    {
      func: selectMenu,
      label: 'タスク',
      icon: <FormatListBulletedRoundedIcon />,
      id: 'task',
      value: '/task',
    },
    {
      func: selectMenu,
      label: 'アンケート',
      icon: <CategoryRoundedIcon />,
      id: 'question',
      value: '/question',
    },
    {
      func: selectMenu,
      label: 'スケジュール',
      icon: <AppsRoundedIcon />,
      id: 'schedule',
      value: '/schedule',
    },
    {
      func: selectMenu,
      label: '設定',
      icon: <TuneRoundedIcon />,
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
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <Typography variant="body2" color="textPrimary">
                  <ListItemText primary={menu.label} />
                </Typography>
              </ListItem>
            ))}
            <Divider />
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppRoundedIcon />
              </ListItemIcon>
              <Typography variant="body2" color="textPrimary">
                <ListItemText primary="ログアウト" />
              </Typography>
              <Divider />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  )
}
