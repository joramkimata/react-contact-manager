import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER, GET_ALL_USERS } from "../Users/graphQL";
import { showToastTop } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const CreatAccount = ({ loginIn, setLoading, setOpened }) => {
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid Email provided"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [GET_ALL_USERS],
    onCompleted: (data) => {
      setLoading(false);
      showToastTop(`You can now login`, false);
      setOpened(false);
      navigate("/");
    },
    onError: (error) => {
      setLoading(false);
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    createUser({
      variables: {
        input: {
          ...data,
          userType: "NORMAL_USER",
        },
      },
    });
  };

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
          {...register("confirmPassword", {
            required: "Confirm Password required",
          })}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
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
