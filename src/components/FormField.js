import React from "react";
import { FormControl, InputLabel, OutlinedInput } from "@material-ui/core";
import "./FormField.css";

export default function FormField(props) {
  const { label, ...rest } = props;
  const labelId = label.toLowerCase();
  return (
    <FormControl style={{ margin: "20px 0" }} variant="outlined">
      <InputLabel htmlFor={labelId}>{label}</InputLabel>
      <OutlinedInput
        id={labelId}
        label={label}
        {...rest}
      />
    </FormControl>
  );
}
