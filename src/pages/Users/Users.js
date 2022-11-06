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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ActionBtn from "../../components/ActionBtn/ActionBtn";
import ChangePasswordUi from "../../components/ChangePasswordUi/ChangePasswordUi";
import DataTableUi from "../../components/DataTableUi/DataTableUi";
import ModalContainerUi from "../../components/ModalContainerUi/ModalContainerUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { promptBox, showToastTop } from "../../utils/helpers";

import * as Yup from "yup";

import {
  ACTIVATE_USER,
  BLOCK_USER,
  CHANGE_USER_PASSWORD,
  DELETE_USER,
  GET_ALL_USERS,
  UPDATE_USER,
} from "./graphQL";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input/Input";
import ModalFooterUi from "../../components/ModalFooterUi/ModalFooterUi";
import { UPDATE_ROLE } from "../Roles/graphQL";

const Users = () => {
  const [isLoad, setLoad] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [isUserEditSubmit, setUserEditSubmit] = useState(false);
  const [selectedUid, setSelectedUid] = useState();
  const [isChangPass, setChangPass] = useState(false);
  const [isEditForm, setEditForm] = useState(false);

  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  // edit user form

  const formSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid Email provided"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm(formOptions);

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

  const [changeUserPassword] = useMutation(CHANGE_USER_PASSWORD, {
    refetchQueries: [GET_ALL_USERS],
    onCompleted: (data) => {
      setChangPass(false);
      showToastTop(`Successfully changed`, false);
      setOpened(false);
    },
    onError: (error) => {
      setSubmit(false);
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_ALL_USERS],
    onCompleted: (data) => {
      setUserEditSubmit(false);
      showToastTop(`Successfully updated`, false);
      setEditForm(false);
    },
    onError: (error) => {
      setUserEditSubmit(false);
    },
  });

  const handleEditUser = (rec) => {
    setSelectedUid(rec.uuid);
    setEditForm(true);
    clearErrors();
    setValue("fullName", rec.fullName);
    setValue("email", rec.email);
    setValue("username", rec.username);
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

  const handleViewUser = (uuid) => {
    navigate(`/users/${uuid}`);
  };

  const handlePasswordChange = (data) => {
    setChangPass(true);
    changeUserPassword({
      variables: {
        uuid: selectedUid,
        ...data,
      },
    });
  };

  const handleEditUserForm = (data) => {
    setUserEditSubmit(true);
    updateUser({
      variables: {
        uuid: selectedUid,
        input: {
          ...data,
          userType: "NORMAL_USER",
        },
      },
    });
  };

  const handleEditFormClear = () => {
    reset();
    setUserEditSubmit(false);
    clearErrors();
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
            onClickIcon={() => handleEditUser(rec)}
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
              title="Block User"
            />
          )}
          <ActionBtn
            onClickIcon={() => handleViewUser(rec.uuid)}
            title="View User"
            icon={<RemoveRedEyeOutlined />}
          />
          <ActionBtn
            onClickIcon={() => {
              setOpened(true);
              setSelectedUid(rec.uuid);
            }}
            icon={<Key color="warning" />}
          />
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
        <ChangePasswordUi
          handlePasswordChangex={handlePasswordChange}
          opened={opened}
          setOpened={setOpened}
          isChangPass={isChangPass}
        />
        <ModalContainerUi
          top={300}
          title="Edit User Details"
          width={700}
          handleSubmit={handleSubmit}
          onSubmit={handleEditUserForm}
          visible={isEditForm}
          onCancel={() => setEditForm(false)}
          footer={
            <ModalFooterUi
              onCancel={() => handleEditFormClear()}
              loading={isUserEditSubmit}
            />
          }
        >
          <Input
            errors={errors}
            label="Full Name"
            name="fullName"
            register={register}
          />
          <Input
            errors={errors}
            label="Email"
            name="email"
            register={register}
          />
          <Input
            errors={errors}
            label="Username"
            name="username"
            register={register}
          />
        </ModalContainerUi>
      </Paper>
    </>
  );
};

export default Users;
