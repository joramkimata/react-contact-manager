import { TextField } from "@mui/material";
import React from "react";

const RequiredInput = ({ label, register, errors, name, mb = 2 }) => {
  return (
    <>
      <TextField
        label={label}
        sx={{ mb: mb }}
        variant="outlined"
        fullWidth
        {...register(`${name}`, {
          required: `${label} required`,
        })}
        error={Boolean(errors[name])}
        helperText={errors[name]?.message}
      />
    </>
  );
};

export default RequiredInput;
