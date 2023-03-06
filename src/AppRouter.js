import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

function Admin() {
  return <div></div>;
}

function Login() {
  let login = () => {};
  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );
}
