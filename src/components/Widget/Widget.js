import { useQuery } from "@apollo/client";
import { AccountBoxOutlined } from "@mui/icons-material";
import {
  CircularProgress,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

const Widget = ({
  title,
  icon = <AccountBoxOutlined style={{ fontSize: 120 }} />,
  query,
  queryName,
}) => {
  const { loading, data } = useQuery(query, {
    fetchPolicy: "network-only",
  });

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          padding: 2,
          justifyContent: "space-between",
        }}
        elevation={5}
      >
        {icon}
        <div style={{ flexDirection: "column" }}>
          <Typography variant="body1">{title}</Typography>
          {loading ? (
            <>
              <CircularProgress sx={{ mt: 2 }} thickness={7} />
            </>
          ) : (
            <Typography variant="h2">{data && data[queryName]}</Typography>
          )}
        </div>
      </Paper>
      {loading && <LinearProgress />}
    </>
  );
};

export default Widget;
