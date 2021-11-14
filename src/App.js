import React, { useLayoutEffect, lazy, Suspense } from "react";
import { useLocalStorage } from "react-use";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
import history from "helper/history.js";
import { Router, Switch, HashRouter } from "react-router-dom";

const IndexPage = lazy(() => import("features/Index"));
const LoginForm = lazy(() => import("features/authentication/login"));
const RegisterForm = lazy(() => import("features/authentication/register"));

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "features/authentication/authSlice";
import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue, remove] = useLocalStorage("user-key");
  console.log(value);
  useLayoutEffect(() => {
    if (value !== undefined) {
      dispatch(setUser(value));
    }
  }, []);

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
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/"
              component={IndexPage}
            ></PrivateRoute>
            <PublicRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/login"
              component={LoginForm}
            ></PublicRoute>
            <PublicRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/register"
              component={RegisterForm}
            ></PublicRoute>
          </Suspense>
        </Switch>
      </HashRouter>
    </Router>
  );
}
export default App;
