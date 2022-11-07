import { useMutation } from "@apollo/client";
import { Add, Delete, Edit, LockOpen } from "@mui/icons-material";
import { Button, Chip, LinearProgress, Paper } from "@mui/material";
import { Space } from "antd";
import React, { useState } from "react";
import ActionBtn from "../../components/ActionBtn/ActionBtn";
import DataTableUi from "../../components/DataTableUi/DataTableUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { promptBox, showToastTop } from "../../utils/helpers";
import { DELETE_CONTACT, MAKE_CONTACT_PUBLIC } from "../MyContacts/graphQL";
import { GET_ALL_CONTACTS } from "./graphQL";

const Contacts = () => {
  const [isLoad, setLoad] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [GET_ALL_CONTACTS],
    onCompleted: (data) => {
      setUpdating(false);
      showToastTop(`Successfully deleted`, false);
    },
    onError: (error) => {
      setUpdating(false);
    },
  });

  const [makeContactPublic] = useMutation(MAKE_CONTACT_PUBLIC, {
    refetchQueries: [GET_ALL_CONTACTS],
    onCompleted: (data) => {
      setUpdating(false);
      showToastTop(`Successfully UPDATED`, false);
    },
    onError: (error) => {
      setUpdating(false);
    },
  });

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
      render: (_, rec) => <Chip label={`${rec.user.fullName}`} />,
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
      render: (_, rec) => (
        <Space>
          <ActionBtn icon={<Edit color="info" />} />
          <ActionBtn
            onClickIcon={() => handleDeleteContact(rec.uuid)}
            icon={<Delete color="error" />}
          />
          {!rec.isPublic ? (
            <ActionBtn
              onClickIcon={() => handleMakeCantactPublic(rec.uuid)}
              title={`Make public`}
              icon={<LockOpen color="success" />}
            />
          ) : null}
        </Space>
      ),
    },
  ];

  return (
    <>
      <TitleBoxUi loading={isLoad} title={`Manage All Contacts`}>
        <Button
          onClick={() => null}
          startIcon={<Add />}
          color="inherit"
          variant="contained"
        >
          Add User Contact
        </Button>
      </TitleBoxUi>
      {updating && <LinearProgress />}
      <Paper sx={{ mt: 1, padding: 2 }} elevation={4}>
        <DataTableUi
          loadingData={(loading) => setLoad(loading)}
          columns={columns}
          query={GET_ALL_CONTACTS}
          queryName="getAllContacts"
        />
      </Paper>
    </>
  );
};

export default Contacts;
