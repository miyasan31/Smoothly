import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { ActionCheckDialog } from '../Layout'
import { ClosableDrawer } from './index'
import { signOut, updateTheme } from '../../../reducks/users/operations'
import { getUserId } from '../../../reducks/users/selectors'
import { db } from '../../../firebase/firebase'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'
import Switch from '@material-ui/core/Switch'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: '55px',
    [theme.breakpoints.up('sm')]: {
      height: '70px',
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: '25px',
    color: '#2196f3',
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
    // border: '2px solid #90caf9',
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(5.5),
      height: theme.spacing(5.5),
    },
  },
  menu: {
    color: 'white',
    fontSize: '25px',
    color: '#2196f3',
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
  const [themeType, setThemeType] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [openCheckDialog, setOpenCheckDialog] = useState(false)
  const isMenuOpen = Boolean(anchorEl)

  const handleToggle = () => {
    dispatch(updateTheme(current_uid, !themeType))
  }

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
    setOpenCheckDialog(false)
    dispatch(signOut())
  }

  const checkHandleClick = () => {
    handleMenuClose()
    setOpenCheckDialog(true)
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
        setThemeType(userData.dark_mode)
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
      <MenuItem onClick={checkHandleClick}>サインアウト</MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar className={classes.appbar} position="static" color="inherit">
        <ActionCheckDialog
          text={'サインアウトしてもよろしいですか？'}
          buttonLabel={'サインアウト'}
          openDialog={openCheckDialog}
          setOpenDialog={setOpenCheckDialog}
          actionHandleClick={handleSignOut}
        />

        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
            onClick={(e) => handleDrawerToggle(e, true)}
          >
            <MenuIcon className={classes.menu} />
          </IconButton>

          {/* <div className={classes.grow_sm} /> */}

          <a href="/post">
            <Typography className={classes.title} noWrap>
              Smoothly
            </Typography>
          </a>

          <div className={classes.grow} />

          <Switch color="default" onChange={handleToggle} />

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
