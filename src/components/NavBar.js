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
import { useAuth } from "../contexts/AuthContext";

export function NavLink({ path, content }) {
  return (
    <Link to={path} className="nav-link" styles={{ textDecoration: "none" }}>
      <Button variant="contained" color="secondary">
        {content}
      </Button>
    </Link>
  );
}

export function AuthenticatedNavLinks({ links }) {
  return (
    <ul className="nav-list">
      {links.map(({ path, content }) => (
        <NavLink path={path} content={content} key={path + content} />
      ))}
    </ul>
  );
}

export function UnauthenticatedNavLinks({ links }) {
  return (
    <ul className="nav-list">
      {links.map(({ path, content }) => (
        <NavLink path={path} content={content} key={path + content} />
      ))}
    </ul>
  );
}

export default function NavBar() {
  const unauthenticatedLinks = [
    {
      path: "/login",
      content: "Log In",
    },
    {
      path: "/signup",
      content: "Sign Up",
    },
  ];

  const authenticatedLinks = [
    {
      path: "/logout",
      content: "Log Out",
    },
  ];

  const { isAuthenticated } = useAuth();
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
          {isAuthenticated ? (
            <AuthenticatedNavLinks links={authenticatedLinks} />
          ) : (
            <UnauthenticatedNavLinks links={unauthenticatedLinks} />
          )}
        </Toolbar>
      </AppBar>
    </nav>
  );
}
