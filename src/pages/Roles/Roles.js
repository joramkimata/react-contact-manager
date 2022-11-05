import { Add, Delete, Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Button, Paper } from "@mui/material";
import { Space } from "antd";
import React, { useState } from "react";
import ActionBtn from "../../components/ActionBtn/ActionBtn";
import DataTableUi from "../../components/DataTableUi/DataTableUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { GET_ALL_ROLES } from "./graphQL";

const Roles = () => {
  const [isLoad, setLoad] = useState(false);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Display Name",
      dataIndex: "displayName",
      key: "displayName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, rec) => (
        <Space>
          <ActionBtn onClickIcon={() => null} icon={<Edit color="info" />} />
          <ActionBtn
            onClickIcon={() => null}
            icon={<RemoveRedEyeOutlined color="success" />}
          />
          <ActionBtn onClickIcon={() => null} icon={<Delete color="error" />} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <TitleBoxUi title={`Manage Roles`} loading={isLoad}>
        <Button startIcon={<Add />} color="inherit" variant="contained">
          Add Roles
        </Button>
      </TitleBoxUi>
      <Paper sx={{ mt: 1, padding: 2 }} elevation={4}>
        <DataTableUi
          loadingData={(loading) => setLoad(loading)}
          columns={columns}
          query={GET_ALL_ROLES}
          queryName="getRoles"
        />
      </Paper>
    </>
  );
};

export default Roles;
