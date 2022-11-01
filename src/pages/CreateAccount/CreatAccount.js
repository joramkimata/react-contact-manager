import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";

const CreatAccount = ({ loginIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {};

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Full Name"
          sx={{ mb: 2 }}
          variant="outlined"
          fullWidth
          {...register("fullName", {
            required: "Full Name is required",
          })}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName?.message}
        />
        <TextField
          label="Email"
          sx={{ mb: 2 }}
          variant="outlined"
          fullWidth
          {...register("email", {
            required: "Email is required",
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <TextField
          label="Username"
          sx={{ mb: 2 }}
          variant="outlined"
          fullWidth
          {...register("username", {
            required: "Username required",
          })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
        />

        <TextField
          label="Password"
          type="password"
          sx={{ mb: 2 }}
          {...register("password", {
            required: "Password required",
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          variant="outlined"
          fullWidth
        />

        <TextField
          label="Confirm Password"
          type="password"
          {...register("cpassword", {
            required: "Confirm Password required",
          })}
          error={Boolean(errors.cpassword)}
          helperText={errors.cpassword?.message}
          variant="outlined"
          fullWidth
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginY: 1,
            mt: 2,
          }}
        >
          <span
            onClick={loginIn}
            style={{
              textDecoration: "underline",
              color: "darkblue",
              fontStyle: "italic",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Have Account? Login now!
          </span>

          <Button
            type="submit"
            sx={{ backgroundColor: "#434670" }}
            variant="contained"
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreatAccount;
