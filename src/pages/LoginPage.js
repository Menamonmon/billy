import React, { useState } from "react";
import FormField from "../components/FormField";
import {
  FormControl,
  Container,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useAuth } from "../contexts/AuthContext";
import FormErrors from "../components/FormErrors";

const initialFormData = {
  username: "",
  password: "",
};

export default function LoginPage() {
  const { login } = useAuth();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    setFormData((p) => {
      p = { ...p };
      p[e.target.name] = e.target.value;
      return p;
    });
  };

  const catchMissingFields = (formData, setErrors) => {
    for (const [key, value] of Object.entries(formData)) {
      if (value.trim() === "") {
        setErrors((p) => [...p, `${key} is Missing`]);
      }
    }
  };

  const submitForm = (e) => {
    login(formData).catch((error) => {
      catchMissingFields(formData, setErrors);
      if (errors.length === 0) {
        setErrors(["Invalid username and/or password."]);
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
          label="Username"
          type="text"
          name="username"
          key="Username"
        />
        <FormField
          value={formData.password}
          onChange={handleChange}
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
