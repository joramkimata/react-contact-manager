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
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AccountBoxOutlined,
  AccountCircle,
  ContactEmergencyOutlined,
  ContactMailOutlined,
  Dashboard,
  Edit,
  ExitToApp,
  ListAlt,
  Lock,
  Settings,
} from "@mui/icons-material";

import contactLogo from "../../assets/contacts.png";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

import user from "../../assets/user.png";
import useLogout from "../../hooks/useLogout";

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
  const [selectedMenu, setSelectedMenu] = React.useState("dashboard");

  const navigate = useNavigate();

  const location = useLocation();

  const { logout } = useLogout();

  React.useEffect(() => {
    const path = location.pathname.split("/")[1];
    if (path) {
      setSelectedMenu(path);
    }
  }, [location]);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const exitApp = () => {
    handleCloseUserMenu();
    logout();
  };

  const changePass = () => {
    handleCloseUserMenu();
  };

  const profile = () => {
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        color="default"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Contact Manager
          </Typography>
          <Box>
            <Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={`change-pass`} onClick={() => profile()}>
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem key={`change-pass`} onClick={() => changePass()}>
                <ListItemIcon>
                  <Lock fontSize="small" />
                </ListItemIcon>
                <ListItemText>Change Password</ListItemText>
              </MenuItem>
              <MenuItem key={`logout`} onClick={() => exitApp()}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
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
                <ListItemButton selected={selectedMenu === key}>
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
