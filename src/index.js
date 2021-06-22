import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";
import createStore from "src/reducks/store/store";

import TempleteTheme from "src/TemplateTheme";
import App from "src/App";

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
