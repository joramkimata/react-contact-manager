import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  AccountBoxOutlined,
  ContactEmergency,
  ContactEmergencyOutlined,
  ContactMailOutlined,
  Dashboard,
  ExitToApp,
  ListAlt,
  Settings,
} from "@mui/icons-material";

import contactLogo from "../../assets/contacts.png";

const drawerWidth = 240;

const menuList = [
  {
    key: "dashboard",
    title: "Dashboard",
    url: "/dashboard",
    icon: <Dashboard />,
    permissions: [],
  },
  {
    key: "my-contacts",
    title: "My Contacts",
    url: "/my-contacts",
    icon: <ContactEmergencyOutlined />,
    permissions: [],
  },
  {
    key: "contacts",
    title: "Contacts",
    url: "/contacts",
    icon: <ContactMailOutlined />,
    permissions: [],
  },
  {
    key: "users",
    title: "Users",
    url: "/users",
    icon: <AccountBoxOutlined />,
    permissions: [],
  },
  {
    key: "roles",
    title: "Roles",
    url: "/roles",
    icon: <ListAlt />,
    permissions: [],
  },
  {
    key: "settings",
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
    permissions: [],
  },
];

export default function MainLayout() {
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = React.useState("Dashboard");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        color="default"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Contact Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 10,
              justifyContent: "center",
            }}
          >
            <img
              src={contactLogo}
              style={{
                width: 100,
                border: "2px solid rgba(0, 0, 0, 0.12)",
                borderRadius: 50,
                padding: 5,
              }}
            />
          </div>
          <List>
            {menuList.map(({ key, icon, title, url }) => (
              <ListItem
                onClick={() => {
                  navigate(url);
                  setSelectedMenu(title);
                }}
                key={key}
                disablePadding
              >
                <ListItemButton selected={selectedMenu === title}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
