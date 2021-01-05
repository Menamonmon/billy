import { Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (
    <Container
      maxWidth="sm"
      style={{
        margin: "50px auto",
      }}
    >
      <Typography component="div" align="left">
        <Typography
          color="secondary"
          variant="h4"
          component="h2"
          style={{ margin: "50px 0" }}
        >
          Log Out
        </Typography>
        <Typography variant="h6">
          You have been logged out successfully.
        </Typography>
        <Typography variant="body1" component="p">
          <Link to="/login">Login Again</Link>
          <br />
          Don't have an account. <Link to="/signup">Sign up here!</Link>
        </Typography>
      </Typography>
    </Container>
  );
}
