import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import pageNotFound from "../../assets/404.svg";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: 100,
      }}
    >
      <img
        style={{
          width: "500px",
        }}
        src={pageNotFound}
      />
      <Button variant="outlined" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
