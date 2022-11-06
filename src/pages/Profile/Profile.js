import { useQuery } from "@apollo/client";
import { InfoOutlined } from "@mui/icons-material";
import { Chip, Paper } from "@mui/material";
import { Divider, Typography } from "antd";
import React from "react";
import { GET_CURRENT_USER } from "../../components/MainLayout/graphQL";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";

const Profile = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  return (
    <>
      <TitleBoxUi
        title={`Profile Information`}
        icon={<InfoOutlined />}
        loading={loading}
      ></TitleBoxUi>

      {data && (
        <Paper sx={{ mt: 2, padding: 2 }}>
          <div className="row">
            <div className="col-4">
              <Typography variant="h6">Full Name</Typography>
              <Divider />
              <Chip label={data.getCurrentUserInfo.fullName} />
            </div>
            <div className="col-4">
              <Typography variant="h6">Email</Typography>
              <Divider />
              <Chip label={data.getCurrentUserInfo.email} />
            </div>
            <div className="col-4">
              <Typography variant="h6">Username</Typography>
              <Divider />
              <Chip label={data.getCurrentUserInfo.username} />
            </div>
          </div>
        </Paper>
      )}
    </>
  );
};

export default Profile;
