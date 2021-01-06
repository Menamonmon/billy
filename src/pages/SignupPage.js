import { Button, Container, FormControl, Typography } from "@material-ui/core";
import React, { useState } from "react";
import FormField from "../components/FormField";
import { useAuth } from "../contexts/AuthContext";

const initialFormData = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

export default function SignupPage() {
  const { signup } = useAuth();

  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData((p) => {
      p = { ...p };
      p[e.target.name] = e.target.value;
      return p;
    });
  };

  const submitForm = (e) => {
    signup(formData).then((res) => {
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
          Sign up for Billy
        </Typography>
        <FormField
          value={formData.username}
          onChange={handleChange}
          label="Username"
          type="text"
          name="username"
          key="Username"
        />
        <FormField
          value={formData.email}
          onChange={handleChange}
          label="Email"
          type="text"
          name="email"
          key="Email"
        />
        <FormField
          value={formData.password}
          onChange={handleChange}
          type="password"
          label="Password"
          name="password"
          key="Password"
        />
        <FormField
          value={formData.confirm_password}
          onChange={handleChange}
          type="password"
          label="Confirm_Password"
          name="confirm_password"
          key="Confirm_Password"
        />
        <Button variant="contained" color="primary" onClick={submitForm}>
          Sign Up
        </Button>
      </FormControl>
    </Container>
  );
}
