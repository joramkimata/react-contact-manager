import { Add, Delete, Edit, LockOpen } from "@mui/icons-material";
import { Button, Chip, Paper } from "@mui/material";
import { Space } from "antd";
import React, { useState } from "react";
import ActionBtn from "../../components/ActionBtn/ActionBtn";
import DataTableUi from "../../components/DataTableUi/DataTableUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { GET_ALL_CONTACTS } from "./graphQL";

const Contacts = () => {
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
          <ActionBtn icon={<Delete color="error" />} />
          {!rec.isPublic ? (
            <ActionBtn
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
