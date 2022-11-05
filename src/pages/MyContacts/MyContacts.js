import { Paper } from "@mui/material";
import React, { useState } from "react";
import DataTableUi from "../../components/DataTableUi/DataTableUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { GET_MY_CONTACTS } from "./graphQL";

const MyContacts = () => {
  const [isLoad, setLoad] = useState(false);

  const columns = [];
  return (
    <>
      <TitleBoxUi title={`Managae My Contacts`}></TitleBoxUi>
      <Paper sx={{ mt: 1, padding: 2 }} elevation={4}>
        <DataTableUi
          loadingData={(loading) => setLoad(loading)}
          columns={columns}
          query={GET_MY_CONTACTS}
          queryName="getMyContacts"
        />
      </Paper>
    </>
  );
};

export default MyContacts;
