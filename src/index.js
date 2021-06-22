import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";
import createStore from "./reducks/store/store.js";

import App from "./App.jsx";
import TempleteTheme from "./TemplateTheme";

// import TemplateTheme from './TemplateTheme.js';
/* ===================================================================== */

export const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <TempleteTheme>
        <App />
      </TempleteTheme>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
