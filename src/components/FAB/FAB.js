import { Save } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import React from "react";

const FAB = ({ onClick, title, icon = <Save /> }) => {
  return (
    <Tooltip title={title}>
      <Fab
        onClick={onClick}
        color="inherit"
        sx={{
          position: "absolute",
          bottom: 70,
          right: 16,
        }}
        aria-label="edit"
      >
        {icon}
      </Fab>
    </Tooltip>
  );
};

export default FAB;
