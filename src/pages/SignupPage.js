import { Button, Container, FormControl, Typography } from "@material-ui/core";
import React, { useState } from "react";
import FormField from "../components/FormField";
import { useAuth } from "../contexts/AuthContext";

const initialFormData = {
  username: "",
  passowrd: "",
  confirm_passowrd: ""
}

export default function SignupPage() {
  const { login } = useAuth();

  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData((p) => {
      p = { ...p };
      p[e.target.name] = e.target.value;
      return p;
    });
  };

  const submitForm = (e) => {
    login(formData).then((res) => {
      console.log(res);
    });
    e.preventDefault();
  };

  return (
    <Container color="primary" maxWidth="sm">
      <FormControl
        component="form"
        style={{ margin: "50px auto", width: "100%" }}
      >
        <Typography variant="h2" color="secondary" align="left">
          Log In to Billy
        </Typography>
        <FormField
          value={formData.username}
          onChange={handleChange}
          label="Username"
          type="text"
          key="Username"
        />
        <FormField
          value={formData.password}
          onChange={handleChange}
          type="password"
          label="Password"
          key="Password "
        />
        <Button variant="contained" color="primary" onClick={submitForm}>
          Log In
        </Button>
      </FormControl>
    </Container>
  );
}
