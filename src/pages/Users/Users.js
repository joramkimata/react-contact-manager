import { useMutation } from "@apollo/client";
import {
  Delete,
  Edit,
  Key,
  Lock,
  LockOpen,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Chip, LinearProgress, Paper } from "@mui/material";
import { Space } from "antd";
import React, { useState } from "react";
import ActionBtn from "../../components/ActionBtn/ActionBtn";
import DataTableUi from "../../components/DataTableUi/DataTableUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { promptBox, showToastTop } from "../../utils/helpers";
import {
  ACTIVATE_USER,
  BLOCK_USER,
  DELETE_USER,
  GET_ALL_USERS,
} from "./graphQL";

const Users = () => {
  const [isLoad, setLoad] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  const [activateUser] = useMutation(ACTIVATE_USER, {
    refetchQueries: [GET_ALL_USERS],
    onCompleted: (data) => {
      setSubmit(false);
      showToastTop(`Successfully activated`, false);
    },
    onError: (error) => {
      setSubmit(false);
    },
  });

  const [blockUser] = useMutation(BLOCK_USER, {
    refetchQueries: [GET_ALL_USERS],
    onCompleted: (data) => {
      setSubmit(false);
      showToastTop(`Successfully blocked`, false);
    },
    onError: (error) => {
      setSubmit(false);
    },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [GET_ALL_USERS],
    onCompleted: (data) => {
      setSubmit(false);
      showToastTop(`Successfully deleted`, false);
    },
    onError: (error) => {
      setSubmit(false);
    },
  });

  const handleEditUser = (uuid) => {
    alert(uuid);
  };

  const handleActivateUser = (uuid) => {
    promptBox(() => {
      setSubmit(true);
      activateUser({
        variables: {
          uuid,
        },
      });
    });
  };

  const handleBlockUser = (uuid) => {
    promptBox(() => {
      setSubmit(true);
      blockUser({
        variables: {
          uuid,
        },
      });
    });
  };

  const handleDeleteUser = (uuid) => {
    promptBox(() => {
      setSubmit(true);
      deleteUser({
        variables: {
          uuid,
        },
      });
    });
  };

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
            onClickIcon={() => handleEditUser(rec.uuid)}
            title="Edit User"
          />
          <ActionBtn
            icon={<Delete color="error" />}
            onClickIcon={() => handleDeleteUser(rec.uuid)}
            title="Delete User"
          />
          {!rec.active ? (
            <ActionBtn
              icon={<Lock color="secondary" />}
              onClickIcon={() => handleActivateUser(rec.uuid)}
              title="Activate User"
            />
          ) : (
            <ActionBtn
              icon={<LockOpen color="success" />}
              onClickIcon={() => handleBlockUser(rec.uuid)}
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
      {isSubmit && <LinearProgress />}
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
