import React, { forwardRef } from "react";
import { TextField } from "@mui/material";

const Input = forwardRef((props, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      {...props}
      ref={ref}
    />
  );
});

export default Input;
