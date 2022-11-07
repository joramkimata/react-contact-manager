import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AccountBoxOutlined,
  AccountCircle,
  ContactEmergencyOutlined,
  ContactMailOutlined,
  Dashboard,
  ExitToApp,
  ListAlt,
  Lock,
  Settings,
} from "@mui/icons-material";

import contactLogo from "../../assets/contacts.png";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

import user from "../../assets/avatar.png";
import useLogout from "../../hooks/useLogout";
import ModalContainerUi from "../ModalContainerUi/ModalContainerUi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from "../Input/Input";
import ModalFooterUi from "../ModalFooterUi/ModalFooterUi";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { showToastTop } from "../../utils/helpers";
import { CHANGE_PASSWORD, GET_CURRENT_USER } from "./graphQL";
import { userPermissions } from "../../store/cache";
import HasPermissionUi from "../HasPermissionUi/HasPermissionUi";

const drawerWidth = 240;

const menuList = [
  {
    key: "dashboard",
    title: "Dashboard",
    url: "/dashboard",
    icon: <Dashboard />,
    permission: "VIEW_DASHBOARD",
  },
  {
    key: "my-contacts",
    title: "My Contacts",
    url: "/my-contacts",
    icon: <ContactEmergencyOutlined />,
    permission: "MY_CONTACTS",
  },
  {
    key: "contacts",
    title: "Contacts",
    url: "/contacts",
    icon: <ContactMailOutlined />,
    permission: "VIEW_CONTACTS",
  },
  {
    key: "users",
    title: "Users",
    url: "/users",
    icon: <AccountBoxOutlined />,
    permission: "VIEW_USERS",
  },
  {
    key: "roles",
    title: "Roles",
    url: "/roles",
    icon: <ListAlt />,
    permission: "VIEW_ROLES",
  },
  // {
  //   key: "settings",
  //   title: "Settings",
  //   url: "/settings",
  //   icon: <Settings />,
  //   permissions: [],
  // },
];

export default function MainLayout() {
  const [selectedMenu, setSelectedMenu] = React.useState("dashboard");
  const [opened, setOpened] = React.useState(false);
  const [isChangPass, setChangPass] = React.useState(false);

  const permissions = useReactiveVar(userPermissions);

  const formSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const navigate = useNavigate();

  const location = useLocation();

  const { logout } = useLogout();

  React.useEffect(() => {
    const path = location.pathname.split("/")[1];
    if (path) {
      setSelectedMenu(path);
    }
  }, [location]);

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    refetchQueries: [],
    onCompleted: (data) => {
      setChangPass(false);
      showToastTop(`Successfully changed`, false);
      setOpened(false);
    },
    onError: (error) => {
      setChangPass(false);
    },
  });

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
    setOpened(true);
  };

  const profile = () => {
    handleCloseUserMenu();
    navigate("/profile");
  };

  const handlePasswordChange = (data) => {
    setChangPass(true);
    changePassword({
      variables: {
        ...data,
      },
    });
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
              <MenuItem onClick={() => profile()}>
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => changePass()}>
                <ListItemIcon>
                  <Lock fontSize="small" />
                </ListItemIcon>
                <ListItemText>Change Password</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => exitApp()}>
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
            {menuList.map(({ key, icon, title, url, permission }) => (
              <HasPermissionUi permission={permission}>
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
              </HasPermissionUi>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <ModalContainerUi
          top={200}
          onCancel={() => setOpened(false)}
          visible={opened}
          handleSubmit={handleSubmit}
          onSubmit={handlePasswordChange}
          title={`Change Password`}
          footer={<ModalFooterUi onCancel={() => null} loading={isChangPass} />}
        >
          <Input
            errors={errors}
            label="Password"
            type="password"
            name="password"
            register={register}
          />
          <Input
            errors={errors}
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            register={register}
          />
        </ModalContainerUi>
        <Outlet />
      </Box>
    </Box>
  );
}
