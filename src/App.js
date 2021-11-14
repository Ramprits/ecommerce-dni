import React, { useLayoutEffect, lazy, Suspense } from "react";
import { useLocalStorage } from "react-use";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
import history from "helper/history.js";
import { Router, Switch, Route, HashRouter } from "react-router-dom";

const IndexPage = lazy(() => import("features/Index"));
const LoginForm = lazy(() => import("features/authentication/login"));
const RegisterForm = lazy(() => import("features/authentication/register"));

import { useDispatch } from "react-redux";
import { setUser } from "features/authentication/authSlice";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue, remove] = useLocalStorage("user-key");
  useLayoutEffect(() => {
    dispatch(setUser(value));
  }, [value]);

  return (
    <Router history={history}>
      <HashRouter>
        <Switch>
          <Suspense
            fallback={
              <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            }
          >
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register" component={RegisterForm} />
          </Suspense>
        </Switch>
      </HashRouter>
    </Router>
  );
}
export default App;
