import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Provider, useSelector } from 'react-redux'
import createStore from './reducks/store/store.js'
import { ConnectedRouter } from 'connected-react-router'
import * as History from 'history'

import App from './App.js'
import reportWebVitals from './reportWebVitals'
/* ===================================================================== */

export const history = History.createBrowserHistory()
export const store = createStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
