import React from "react";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

import "./NavBar.css";

export function NavLink({ path, content }) {
  return (
    <Link to={path} className="nav-link" styles={{ textDecoration: "none" }}>
      <Button variant="contained" color="secondary">
        {content}
      </Button>
    </Link>
  );
}

export function AuthenticatedNavLinks() {
  return (
    <ul className="nav-list">
      <Link to="/logout" styles={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary">
          Logout
        </Button>
      </Link>
    </ul>
  );
}

export function UnauthenticatedNavLinks() {
  const links = [
    {
      path: "/login",
      content: "Log In",
    },
    {
      path: "/signup",
      content: "Sign Up",
    },
    // {
    //   path: "/login",
    //   content: "Log In",
    // },
  ];
  return (
    <ul className="nav-list">
      {links.map(({ path, content }) => (
        <NavLink path={path} content={content} />
      ))}
    </ul>
  );
}

export default function NavBar() {
  return (
    <nav className="navbar">
      <AppBar position="static">
        <Toolbar>
          <IconButton className="menu-btn" edge="start" color="secondary">
            <MenuIcon />
          </IconButton>
          <Typography className="title" variant="h5">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Billy
            </Link>
          </Typography>
          <UnauthenticatedNavLinks />
        </Toolbar>
      </AppBar>
    </nav>
  );
}
