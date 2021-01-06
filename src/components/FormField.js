import React from "react";
import { FormControl, InputLabel, OutlinedInput } from "@material-ui/core";
import "./FormField.css";

export default function FormField({ value, type, label, name, onChange }) {
  const labelId = label.toLowerCase();
  return (
    <FormControl style={{ margin: "20px 0" }} variant="outlined">
      <InputLabel htmlFor={labelId}>{label}</InputLabel>
      <OutlinedInput
        id={labelId}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        type={type}
      />
    </FormControl>
  );
}
