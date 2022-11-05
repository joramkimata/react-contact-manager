import { Add, Delete, Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Button, Paper } from "@mui/material";
import { Space } from "antd";
import React, { useState } from "react";
import ActionBtn from "../../components/ActionBtn/ActionBtn";
import DataTableUi from "../../components/DataTableUi/DataTableUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import {
  CREATE_ROLE,
  DELETE_ROLE,
  GET_ALL_ROLES,
  UPDATE_ROLE,
} from "./graphQL";
import ModalContainerUi from "../../components/ModalContainerUi/ModalContainerUi";
import RequiredInput from "../../components/Input/RequiredInput";
import { useForm } from "react-hook-form";
import ModalFooterUi from "../../components/ModalFooterUi/ModalFooterUi";
import { useMutation } from "@apollo/client";
import { promptBox, showToastTop } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const [isLoad, setLoad] = useState(false);
  const [isFormOpen, openForm] = useState(false);
  const [formTitle, setFormTitle] = useState(`Add Roles`);
  const [isSubmit, setSubmit] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [uidEdit, setUidEdit] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  const navigate = useNavigate();

  const [createRole] = useMutation(CREATE_ROLE, {
    refetchQueries: [GET_ALL_ROLES],
    onCompleted: (data) => {
      handleFormCancel();
      openForm(false);
      showToastTop(`Successfully saved`, false);
    },
    onError: (error) => {
      setSubmit(false);
    },
  });

  const [deleteRole] = useMutation(DELETE_ROLE, {
    refetchQueries: [GET_ALL_ROLES],
    onCompleted: (data) => {
      handleFormCancel();
      openForm(false);
      showToastTop(`Successfully deleted`, false);
      setLoad(false);
    },
    onError: (error) => {
      setSubmit(false);
    },
  });

  const [updateRole] = useMutation(UPDATE_ROLE, {
    refetchQueries: [GET_ALL_ROLES],
    onCompleted: (data) => {
      handleFormCancel();
      openForm(false);
      showToastTop(`Successfully updated`, false);
      setLoad(false);
    },
    onError: (error) => {
      setSubmit(false);
    },
  });

  const handleRoleSubmitForm = (data) => {
    setSubmit(true);
    if (isEdit) {
      updateRole({
        variables: {
          input: {
            ...data,
          },
          uuid: uidEdit,
        },
      });
    } else {
      createRole({
        variables: {
          input: {
            ...data,
          },
        },
      });
    }
  };

  const handleFormCancel = () => {
    reset();
    setSubmit(false);
  };

  const handleDeleteRole = (uuid) => {
    promptBox(() => {
      setLoad(true);
      deleteRole({
        variables: {
          uuid,
        },
      });
    });
  };

  const handleEditRole = (rec) => {
    openForm(true);
    setFormTitle(`Edit Role`);
    setUidEdit(rec.uuid);
    setEdit(true);
    setValue("name", rec.name);
    setValue("displayName", rec.displayName);
  };

  const handleViewRole = (uuid) => {
    navigate(`/roles/${uuid}`);
  };

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
          <ActionBtn
            onClickIcon={() => handleEditRole(rec)}
            icon={<Edit color="info" />}
          />
          <ActionBtn
            onClickIcon={() => handleViewRole(rec.uuid)}
            icon={<RemoveRedEyeOutlined color="success" />}
          />
          <ActionBtn
            onClickIcon={() => handleDeleteRole(rec.uuid)}
            icon={<Delete color="error" />}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <TitleBoxUi title={`Manage Roles`} loading={isLoad}>
        <Button
          onClick={() => openForm(true)}
          startIcon={<Add />}
          color="inherit"
          variant="contained"
        >
          Add Roles
        </Button>
      </TitleBoxUi>
      <Paper sx={{ mt: 1, padding: 2 }} elevation={4}>
        <ModalContainerUi
          handleSubmit={handleSubmit}
          onSubmit={handleRoleSubmitForm}
          visible={isFormOpen}
          title={formTitle}
          top={300}
          onCancel={() => {
            openForm(false);
            setFormTitle(`Add Role`);
          }}
          footer={
            <ModalFooterUi onCancel={handleFormCancel} loading={isSubmit} />
          }
        >
          <RequiredInput
            errors={errors}
            register={register}
            label="Name"
            name="name"
          />
          <RequiredInput
            errors={errors}
            register={register}
            label="Display Name"
            name="displayName"
          />
        </ModalContainerUi>

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
