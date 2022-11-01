import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isLoggedInVar } from "../../store/cache";

const Auth = () => {
  let location = useLocation();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default Auth;
