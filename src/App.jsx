import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useReactOidc, withOidcSecure } from "@axa-fr/react-oidc-redux";
import Login from "./pages/login/login";
import Names from "./pages/agpt/Names";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/names" component={Names} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
