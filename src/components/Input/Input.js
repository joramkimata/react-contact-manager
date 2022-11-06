import { TextField } from "@mui/material";
import React from "react";

const Input = ({ label, register, errors, name, mb = 2, type = "text" }) => {
  return (
    <>
      <TextField
        label={label}
        type={type}
        sx={{ mb: mb }}
        variant="outlined"
        fullWidth
        {...register(`${name}`)}
        error={Boolean(errors[name])}
        helperText={errors[name]?.message}
      />
    </>
  );
};

export default Input;
