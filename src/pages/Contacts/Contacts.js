import { Paper } from "@mui/material";
import React, { useState } from "react";
import DataTableUi from "../../components/DataTableUi/DataTableUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { GET_ALL_CONTACTS } from "./graphQL";

const Contacts = () => {
  const [isLoad, setLoad] = useState(false);

  const columns = [];

  return (
    <>
      <TitleBoxUi title={`Manage All Contacts`}></TitleBoxUi>
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
