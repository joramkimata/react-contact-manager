import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isLoggedInVar } from "../../store/cache";
import { ACCESS_TOKEN, LOGIN_URL } from "../../utils/constants";
import { showToastTop } from "../../utils/helpers";

const Login = ({ setLoading, createAccount }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await axios.post(LOGIN_URL, {
        ...data,
      });
      if (result.status === 200) {
        setLoading(false);
        localStorage.setItem(
          ACCESS_TOKEN,
          JSON.stringify(result.data.access_token)
        );
        isLoggedInVar(true);

        navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      if (
        error.response.request.status &&
        error.response.request.status === 401
      ) {
        showToastTop(`Wrong credentials`);
      } else {
        showToastTop(`${error.message}`);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("password", {
            required: "Password required",
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
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
            onClick={createAccount}
            style={{
              textDecoration: "underline",
              color: "darkblue",
              fontStyle: "italic",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Create Account
          </span>

          <Button
            type="submit"
            sx={{ backgroundColor: "#434670" }}
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
