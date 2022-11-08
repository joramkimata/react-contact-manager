import {
  DashboardCustomizeOutlined,
  MailOutlineOutlined,
} from "@mui/icons-material";
import { Paper } from "@mui/material";
import React from "react";
import HasPermissionUi from "../../components/HasPermissionUi/HasPermissionUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import Widget from "../../components/Widget/Widget";
import { GET_MY_CONTACTS } from "../MyContacts/graphQL";
import {
  GET_DASH_ALL_CONTACTS,
  GET_DASH_PRIVATE_CONTACTS,
  GET_DASH_PUBLIC_CONTACTS,
  GET_MY_DASH_PRIVATE_CONTACTS,
  GET_MY_DASH_PUBLIC_CONTACTS,
  GET_NEW_USERS,
} from "./graphQL";

const Dashboard = () => {
  return (
    <>
      <TitleBoxUi
        title={`Dashboard`}
        icon={<DashboardCustomizeOutlined />}
      ></TitleBoxUi>
      <Paper elevation={0} sx={{ mt: 2 }}>
        <div className="row">
          <div className="col-3">
            <HasPermissionUi permission={"VIEW_NEW_USERS"}>
              <Widget
                query={GET_NEW_USERS}
                queryName="getNewUsers"
                title={`New Users`}
              />
            </HasPermissionUi>
          </div>
          <div className="col-3">
            <HasPermissionUi permission={"VIEW_ALL_CONTACTS"}>
              <Widget
                query={GET_DASH_ALL_CONTACTS}
                queryName="getDashAllContacts"
                title={`All Contacts Registered`}
                icon={
                  <MailOutlineOutlined color="info" style={{ fontSize: 120 }} />
                }
              />
            </HasPermissionUi>
          </div>
          <div className="col-3">
            <HasPermissionUi permission={"VIEW_PUBLIC_CONTACTS"}>
              <Widget
                title={`Public Contacts`}
                query={GET_DASH_PUBLIC_CONTACTS}
                queryName="getDashPublicContacts"
                icon={
                  <MailOutlineOutlined
                    color="success"
                    style={{ fontSize: 120 }}
                  />
                }
              />
            </HasPermissionUi>
          </div>
          <div className="col-3">
            <HasPermissionUi permission={"VIEW_PRIVATE_CONTACTS"}>
              <Widget
                query={GET_DASH_PRIVATE_CONTACTS}
                queryName="getDashPrivateContacts"
                title={`Private Contacts`}
                icon={
                  <MailOutlineOutlined
                    color="error"
                    style={{ fontSize: 120 }}
                  />
                }
              />
            </HasPermissionUi>
          </div>
        </div>
        <div className="row" style={{ marginTop: 20 }}>
          <div className="col-6">
            <HasPermissionUi permission={"VIEW_MY_PUBLIC_CONTACTS"}>
              <Widget
                query={GET_MY_DASH_PUBLIC_CONTACTS}
                queryName="getMyDashPublicContacts"
                title={`My Public Contacts`}
              />
            </HasPermissionUi>
          </div>
          <div className="col-6">
            <HasPermissionUi permission={"VIEW_MY_PRIVATE_CONTACTS"}>
              <Widget
                query={GET_MY_DASH_PRIVATE_CONTACTS}
                queryName="getMyDashPrivateContacts"
                title={`My Private Contacts`}
              />
            </HasPermissionUi>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default Dashboard;
