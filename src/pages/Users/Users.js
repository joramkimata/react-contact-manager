import {
  Delete,
  Edit,
  Key,
  Lock,
  LockOpen,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Chip, Paper } from "@mui/material";
import { Space } from "antd";
import React, { useState } from "react";
import ActionBtn from "../../components/ActionBtn/ActionBtn";
import DataTableUi from "../../components/DataTableUi/DataTableUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { GET_ALL_USERS } from "./graphQL";

const Users = () => {
  const [isLoad, setLoad] = useState(false);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (_, rec) => {
        return (
          <>
            <Chip size="small" label={rec.username} />
          </>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, rec) => (
        <Space>
          <ActionBtn
            icon={<Edit color="info" />}
            onClickIcon={() => null}
            title="Edit Users"
          />
          <ActionBtn
            icon={<Delete color="error" />}
            onClickIcon={() => null}
            title="Delete Users"
          />
          {rec.active ? (
            <ActionBtn
              icon={<Lock color="error" />}
              onClickIcon={() => null}
              title="Activate Users"
            />
          ) : (
            <ActionBtn
              icon={<LockOpen color="success" />}
              onClickIcon={() => null}
              title="Block Users"
            />
          )}
          <ActionBtn icon={<RemoveRedEyeOutlined />} />
          <ActionBtn icon={<Key color="warning" />} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <TitleBoxUi loading={isLoad} title="Manage Users"></TitleBoxUi>
      <Paper sx={{ mt: 1, padding: 2 }} elevation={4}>
        <DataTableUi
          loadingData={(loading) => setLoad(loading)}
          columns={columns}
          query={GET_ALL_USERS}
          queryName="getUsers"
        />
      </Paper>
    </>
  );
};

export default Users;
