import React, { useLayoutEffect } from "react";
import { useLocalStorage } from "react-use";
import history from "helper/history.js";
import { Router, Switch, Route } from "react-router-dom";

import IndexPage from "features/Index";
import LoginForm from "features/authentication/login";
import RegisterForm from "features/authentication/register";
import { useDispatch } from "react-redux";
import { setUser } from "features/authentication/authSlice";

function App() {
  const dispatch = useDispatch();
  const [value, setValue, remove] = useLocalStorage("user-token", "foo");
  useLayoutEffect(() => {
    let promise = "";
    if (value) {
      promise = dispatch(setUser(JSON.parse(value)));
    }
    return () => {
      promise.abort();
    };
  }, []);
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
      </Switch>
    </Router>
  );
}
export default App;
