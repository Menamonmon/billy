import { Box, FormLabel, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";

export default function FormErrors({ contentArray }) {
  return (
    <Box>
      {contentArray.map((content) => (
        <Alert severity="error">
          <AlertTitle>{content}</AlertTitle>
        </Alert>
      ))}
    </Box>
  );
}
