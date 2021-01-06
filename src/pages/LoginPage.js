import React from "react";
import FormField from "../components/FormField";
import { FormControl, Container, Button, Typography } from "@material-ui/core";
import { useAuth } from "../contexts/AuthContext";
import FormErrors from "../components/FormErrors";
import useForm from "../hooks/useForm";
import useError from "../hooks/useError";

const initialFormData = {
  username: "",
  password: "",
};

export default function LoginPage() {
  const { login } = useAuth();

  const [formData, setFormData, handleChange] = useForm(initialFormData);
  const [errors, setErrors, handleMissingField] = useError([]);

  const submitForm = (e) => {
    login(formData).catch((error) => {
      if (errors.length === 0) {
        setErrors((p) => [...p, "Invalid Username and/or Password"]);
      }
      console.log(error);
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
        <FormErrors contentArray={errors} />
        <FormField
          value={formData.username}
          onChange={handleChange}
          onBlur={handleMissingField}
          type="text"
          label="Username"
          name="username"
          key="Username"
        />
        <FormField
          value={formData.password}
          onChange={handleChange}
          onBlur={handleMissingField}
          type="password"
          label="Password"
          name="password"
          key="Password"
        />
        <Button variant="contained" color="primary" onClick={submitForm}>
          Log In
        </Button>
      </FormControl>
    </Container>
  );
}
