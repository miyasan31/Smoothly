import React from 'react'
import { useSelector } from 'react-redux'
import { getTheme } from './reducks/users/selectors.js'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
/* ===================================================================== */

const TemplateTheme = ({ children }) => {
  const selector = useSelector((state) => state)
  const themeType = getTheme(selector)

  const theme = createMuiTheme({
    palette: {
      type: !themeType ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
        light: '#2196f3',
        dark: '#64b5f6',
      },
      secondary: {
        main: '#e91e63',
        light: '#e91e63',
        dark: '#ff4081',
      },
      text: {
        // main: '#000000de',
        // light: '#000000de',
        // dark: '#ffffff',
      },
      background: {
        main: '#fff',
        light: '#fff',
        dark: '#303030',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default TemplateTheme
