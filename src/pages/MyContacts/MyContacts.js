import { useMutation } from "@apollo/client";
import { Add, Delete, Edit, Lock, LockOpen } from "@mui/icons-material";
import { Button, Chip, Paper } from "@mui/material";
import { Space } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ActionBtn from "../../components/ActionBtn/ActionBtn";
import DataTableUi from "../../components/DataTableUi/DataTableUi";
import RequiredInput from "../../components/Input/RequiredInput";
import ModalContainerUi from "../../components/ModalContainerUi/ModalContainerUi";
import ModalFooterUi from "../../components/ModalFooterUi/ModalFooterUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { showToastTop } from "../../utils/helpers";
import { CREATE_CONTACT, GET_MY_CONTACTS } from "./graphQL";

const MyContacts = () => {
  const [isLoad, setLoad] = useState(false);
  const [isFormOpen, openForm] = useState(false);
  const [formTitle, setFormTitle] = useState(`Add Contact`);
  const [isSubmit, setSubmit] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleFormCancel = () => {
    reset();
    clearErrors();
  };

  const [createContact] = useMutation(CREATE_CONTACT, {
    refetchQueries: [GET_MY_CONTACTS],
    onCompleted: (data) => {
      handleFormCancel();
      openForm(false);
      showToastTop(`Successfully saved`, false);
    },
    onError: (error) => {
      setSubmit(false);
    },
  });

  const onSubmit = (data) => {
    setSubmit(true);
    createContact({
      variables: {
        input: {
          ...data,
        },
      },
    });
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Is Public?",
      dataIndex: "isPublic",
      key: "isPublic",
      render: (_, rec) =>
        rec.isPublic ? (
          <Chip color="success" label={`YES`} />
        ) : (
          <Chip color="error" label={`NO`} />
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, rec) => {
        return (
          <Space>
            <ActionBtn icon={<Edit color="info" />} />
            <ActionBtn icon={<Delete color="error" />} />
            {!rec.isPublic ? (
              <ActionBtn
                title={`Make public`}
                icon={<LockOpen color="success" />}
              />
            ) : null}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <TitleBoxUi loading={isLoad} title={`Managae My Contacts`}>
        <Button
          onClick={() => openForm(true)}
          startIcon={<Add />}
          color="inherit"
          variant="contained"
        >
          Add Contact
        </Button>
      </TitleBoxUi>
      <Paper sx={{ mt: 1, padding: 2 }} elevation={4}>
        <DataTableUi
          loadingData={(loading) => setLoad(loading)}
          columns={columns}
          query={GET_MY_CONTACTS}
          queryName="getMyContacts"
        />
      </Paper>

      <ModalContainerUi
        top={300}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        title={formTitle}
        visible={isFormOpen}
        onCancel={() => openForm(false)}
        footer={
          <ModalFooterUi onCancel={handleFormCancel} loading={isSubmit} />
        }
      >
        <RequiredInput
          errors={errors}
          register={register}
          label="Phone Number"
          name="phoneNumber"
        />
      </ModalContainerUi>
    </>
  );
};

export default MyContacts;
