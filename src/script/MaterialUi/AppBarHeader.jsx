import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'

import { ClosableDrawer } from './materialui.js'
import { db } from '../../firebase/firebase'
import { getUserId } from '../../reducks/users/selectors'
import { signOut } from '../../reducks/users/operations'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import { blue } from '@material-ui/core/colors'
import Avatar from '@material-ui/core/Avatar'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: 'none',
    backgroundColor: 'white',
    borderBottom: '1px solid #00000022',
    height: '55px',
    [theme.breakpoints.up('sm')]: {
      height: '70px',
    },
  },
  title: {
    color: blue[500],
    fontWeight: 'bold',
    fontSize: '25px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '30px',
      paddingLeft: '25px',
    },
  },
  icon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    color: '#ffffff',
    backgroundColor: '#2196f3',
    border: '3px solid #90caf9',
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  },
  menu: {
    color: 'white',
    fontSize: '25px',
    color: blue[500],
    [theme.breakpoints.up('sm')]: {
      fontSize: '30px',
    },
  },
  menuButton: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  grow_sm: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      flexGrow: 0,
    },
  },
}))

const AppBarHeader = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const current_uid = getUserId(selector)
  const [icon, setIcon] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [sideBarOpen, setSideBarOpen] = useState(false)

  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleProfEditPush = () => {
    handleMenuClose()
    dispatch(push('/setting/prof'))
  }

  const handleSettingPush = () => {
    handleMenuClose()
    dispatch(push('/setting'))
  }

  const handleSignOut = () => {
    handleMenuClose()
    dispatch(signOut())
  }

  const handleDrawerToggle = useCallback(
    (event, isOpen) => {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return
      }
      setSideBarOpen(isOpen)
    },
    [setSideBarOpen]
  )

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(current_uid)
      .onSnapshot((snapshots) => {
        const userData = snapshots.data()
        if (userData.icon) {
          const icon = userData.icon.path
          setIcon(icon)
        }
      })
    return () => unsubscribe()
  }, [])

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfEditPush}>プロフィール編集</MenuItem>
      <MenuItem onClick={handleSettingPush}>ユーザー設定</MenuItem>
      <MenuItem onClick={handleSignOut}>サインアウト</MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={(e) => handleDrawerToggle(e, true)}
          >
            <MenuIcon className={classes.menu} />
          </IconButton>

          <div className={classes.grow_sm} />

          <Typography className={classes.title} noWrap>
            <Link to="/post">{props.title}</Link>
          </Typography>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar className={classes.icon} alt="userIcon" src={icon} />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar className={classes.icon} alt="userIcon" src={icon} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={sideBarOpen} onClose={handleDrawerToggle} />
      {renderMenu}
    </>
  )
}
export default AppBarHeader
