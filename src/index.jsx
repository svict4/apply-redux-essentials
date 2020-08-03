import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Oidc, InMemoryWebStorage } from "@axa-fr/react-oidc-redux";
import { init } from "@sentry/browser";

// import { fetchUsers } from "./features/users/usersSlice";
import App from "./App";
import store from "./app/store";
import theme from "./theme";
import "./index.css";
import configuration from "./auth/configuration";
import * as serviceWorker from "./serviceWorker";

// store.dispatch(fetchUsers());

init({
  dsn: "https://9b30d83d677847ae8e0b0ee764178e2e@sentry.io/5172486",
  // TODO: environment: `${process.env.REACT_APP_ENVIRONMENT_NAME}`,
  environment: "development-new",
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Oidc
            store={store}
            configuration={configuration.config}
            isEnabled={configuration.isEnabled}
            UserStore={InMemoryWebStorage}
          >
            <App />
          </Oidc>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
