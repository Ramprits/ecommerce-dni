/* eslint-disable react/prop-types */
import React from "react";

import { useSelector } from "react-redux";
import { Link as CustomLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import AppsIcon from "@material-ui/icons/Apps";

import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

import SimpleMenu from "components/Profile-menu";
import useStyles from "./styles";

export default function Navigation(props) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const classes = useStyles();

  const content = {
    brand: { image: "mui-assets/img/logo-pied-piper-white.png", width: 120 },
    "brand-small": {
      image: "mui-assets/img/logo-pied-piper-white-icon.png",
      width: 32,
    },
    home: "Home",
    product: "Product",
    link3: "Support",
    "secondary-action": "Sign in",
    "primary-action": "Sign up",
    ...props.content,
  };

  let brand = content["brand"].text || "";
  let brandSmall = content["brand-small"].text || "";

  if (content["brand"].image) {
    brand = <img src={content["brand"].image} alt="" width={content["brand"].width} />;
  }

  if (content["brand-small"].image) {
    brandSmall = (
      <img src={content["brand-small"].image} alt="" width={content["brand-small"].width} />
    );
  }

  const buckets = {
    main: Array.isArray(props.bucketMain) ? props.bucketMain : [],
  };

  const [state, setState] = React.useState({ open: false });

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, open });
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Link
            component={CustomLink}
            to="/"
            variant="h5"
            color="inherit"
            underline="none"
            className={classes.linkBrand}
          >
            {brand}
          </Link>
          <Link
            component={CustomLink}
            to="/"
            variant="h5"
            color="inherit"
            underline="none"
            className={classes.linkBrandSmall}
          >
            {brandSmall}
          </Link>
          {isAuthenticated === false && (
            <>
              <Button color="inherit" className={classes.secondaryButton}>
                {content["secondary-action"]}
              </Button>
              <Button variant="contained" color="secondary">
                {content["primary-action"]}
              </Button>
            </>
          )}

          {isAuthenticated && <SimpleMenu />}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key={content["home"]} component={CustomLink} to="/">
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary={content["home"]} />
            </ListItem>
            <ListItem button key={content["product"]} component={CustomLink} to="/product">
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary={content["product"]} />
            </ListItem>
            <ListItem button key={content["link3"]} component={CustomLink} to="/support">
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary={content["link3"]} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Drawer anchor="left" open={state.open} onClose={toggleDrawer(false)}>
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key={content["home"]} component={CustomLink} to="/">
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary={content["home"]} />
            </ListItem>
            <ListItem button key={content["product"]} component={CustomLink} to="/product">
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary={content["product"]} />
            </ListItem>
            <ListItem button key={content["link3"]} component={CustomLink} to="/support">
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary={content["link3"]} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <div>
          {buckets["main"].map((component) => (
            <React.Fragment key={component}>{component}</React.Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}
