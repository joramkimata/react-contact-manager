import { useMutation } from "@apollo/client";
import { Add, Delete, Edit, Lock, LockOpen } from "@mui/icons-material";
import { Button, Chip, LinearProgress, Paper } from "@mui/material";
import { Space } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ActionBtn from "../../components/ActionBtn/ActionBtn";
import DataTableUi from "../../components/DataTableUi/DataTableUi";
import HasPermissionUi from "../../components/HasPermissionUi/HasPermissionUi";
import RequiredInput from "../../components/Input/RequiredInput";
import ModalContainerUi from "../../components/ModalContainerUi/ModalContainerUi";
import ModalFooterUi from "../../components/ModalFooterUi/ModalFooterUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { promptBox, showToastTop } from "../../utils/helpers";
import {
  CREATE_CONTACT,
  DELETE_CONTACT,
  GET_MY_CONTACTS,
  MAKE_CONTACT_PUBLIC,
  UPDATE_CONTACT,
} from "./graphQL";

const MyContacts = () => {
  const [isLoad, setLoad] = useState(false);
  const [isFormOpen, openForm] = useState(false);
  const [formTitle, setFormTitle] = useState(`Add Contact`);
  const [isSubmit, setSubmit] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedUid, setSelectedUid] = useState(null);

  const {
    handleSubmit,
    register,
    reset,
    clearErrors,
    setValue,
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
      setSubmit(false);
    },
    onError: (error) => {
      setSubmit(false);
    },
  });

  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [GET_MY_CONTACTS],
    onCompleted: (data) => {
      setUpdating(false);
      showToastTop(`Successfully deleted`, false);
    },
    onError: (error) => {
      setUpdating(false);
    },
  });

  const [makeContactPublic] = useMutation(MAKE_CONTACT_PUBLIC, {
    refetchQueries: [GET_MY_CONTACTS],
    onCompleted: (data) => {
      setUpdating(false);
      showToastTop(`Successfully UPDATED`, false);
    },
    onError: (error) => {
      setUpdating(false);
    },
  });

  const [updateContact] = useMutation(UPDATE_CONTACT, {
    refetchQueries: [GET_MY_CONTACTS],
    onCompleted: (data) => {
      setSubmit(false);
      handleFormCancel();
      openForm(false);
      showToastTop(`Successfully Updated`, false);
    },
    onError: (error) => {
      setSubmit(false);
    },
  });

  const onSubmit = (data) => {
    if (selectedUid) {
      setSubmit(true);
      updateContact({
        variables: {
          uuid: selectedUid,
          input: {
            ...data,
          },
        },
      });
    } else {
      setSubmit(true);
      createContact({
        variables: {
          input: {
            ...data,
          },
        },
      });
    }
  };

  const handleDeleteContact = (uuid) => {
    promptBox(() => {
      setUpdating(true);
      deleteContact({
        variables: {
          uuid: uuid,
        },
      });
    });
  };

  const handleMakeCantactPublic = (uuid) => {
    promptBox(() => {
      setUpdating(true);
      makeContactPublic({
        variables: {
          uuid: uuid,
        },
      });
    }, ``);
  };

  const handleEditContact = (rec) => {
    openForm(true);
    setFormTitle(`Edit Contact`);
    setSelectedUid(rec.uuid);
    setValue("phoneNumber", rec.phoneNumber);
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
            <HasPermissionUi permission={"UPDATE_CONTACT"}>
              <ActionBtn
                onClickIcon={() => handleEditContact(rec)}
                icon={<Edit color="info" />}
              />
            </HasPermissionUi>
            <HasPermissionUi permission={"DELETE_CONTACT"}>
              <ActionBtn
                onClickIcon={() => handleDeleteContact(rec.uuid)}
                icon={<Delete color="error" />}
              />
            </HasPermissionUi>
            {!rec.isPublic ? (
              <HasPermissionUi permission={"MAKE_CONTACT_PUBLIC"}>
                <ActionBtn
                  onClickIcon={() => handleMakeCantactPublic(rec.uuid)}
                  title={`Make public`}
                  icon={<LockOpen color="success" />}
                />
              </HasPermissionUi>
            ) : null}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <TitleBoxUi loading={isLoad} title={`Managae My Contacts`}>
        <HasPermissionUi permission={"CREATE_CONTACT"}>
          <Button
            onClick={() => openForm(true)}
            startIcon={<Add />}
            color="inherit"
            variant="contained"
          >
            Add Contact
          </Button>
        </HasPermissionUi>
      </TitleBoxUi>
      {updating && <LinearProgress />}
      <Paper sx={{ mt: 1, padding: 2 }} elevation={4}>
        <HasPermissionUi permission={"MY_CONTACTS"}>
          <DataTableUi
            loadingData={(loading) => setLoad(loading)}
            columns={columns}
            query={GET_MY_CONTACTS}
            queryName="getMyContacts"
          />
        </HasPermissionUi>
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
