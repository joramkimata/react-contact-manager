import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Lock, Search } from "@mui/icons-material";
import { Modal } from "@mantine/core";
import {
  Alert,
  Chip,
  CircularProgress,
  LinearProgress,
  Paper,
} from "@mui/material";
import Login from "../Login/Login";
import CreatAccount from "../CreateAccount/CreatAccount";
import { useQuery } from "@apollo/client";
import { GET_PUBLIC_CONTACTS } from "./graphQL";

import noData from "../../assets/no_data.png";
import device from "../../assets/device.png";

const drawerWidth = 240;
const navItems = ["Login"];

function Home(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [opened, setOpened] = React.useState(false);
  const [accountTitle, setAccountTitle] = React.useState(`Login`);

  const [loading, setLoading] = React.useState(false);
  const [account, setAccount] = React.useState(false);

  const { data, loading: loader } = useQuery(GET_PUBLIC_CONTACTS);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleBtnClicked = (item) => {
    if (item === "Login") {
      setOpened(true);
    }
  };

  const createAccount = () => {
    setAccount(true);
    setAccountTitle(`Create Account`);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Contact Manager
      </Typography>
      <Divider />
      <List>
        <ListItem onClick={null} key={`item-01`} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={`Search`} />
          </ListItemButton>
        </ListItem>
        {navItems.map((item) => (
          <ListItem
            onClick={() => handleBtnClicked(item)}
            key={item}
            disablePadding
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar color="default" component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Contact Manager
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <IconButton sx={{ mr: 2 }}>
                <Search />
              </IconButton>
              {navItems.map((item) => (
                <Button
                  onClick={() => handleBtnClicked(item)}
                  sx={{ mr: 1 }}
                  variant="outlined"
                  key={item}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3, width: "100%" }}>
          <Toolbar />
          <Modal
            size="lg"
            opened={opened}
            onClose={() => setOpened(false)}
            centered
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Paper
              sx={{
                padding: 1,
                display: "flex",
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
              }}
              elevation={3}
            >
              <div>
                <Lock />
              </div>
              <Typography variant="h5">{accountTitle}</Typography>
            </Paper>
            {loading && <LinearProgress />}

            <Paper sx={{ mt: 2, padding: 1 }} elevation={4}>
              {account ? (
                <CreatAccount
                  setOpened={setOpened}
                  setLoading={setLoading}
                  loginIn={() => setAccount(false)}
                />
              ) : (
                <Login setLoading={setLoading} createAccount={createAccount} />
              )}
            </Paper>
          </Modal>

          {loader && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
              }}
            >
              <CircularProgress color="info" thickness={3} size={`12rem`} />
            </div>
          )}

          {data && data.getPublicContacts.length === 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
              }}
            >
              <img src={noData} style={{ width: 600 }} />
            </div>
          ) : (
            <div className="container">
              <div className="row">
                {data &&
                  data.getPublicContacts.map((c) => (
                    <div key={c.uuid} className="col-3">
                      <Paper
                        elevation={4}
                        sx={{
                          padding: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexBasis: 100,
                          flexDirection: "column",
                        }}
                      >
                        <img src={device} style={{ width: 100 }} />
                        <Chip
                          size="small"
                          sx={{ mt: 2 }}
                          color="info"
                          label={c.phoneNumber}
                        />

                        <Chip
                          size="small"
                          sx={{ mt: 1 }}
                          color="success"
                          label={c.user.fullName}
                        />
                      </Paper>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}

Home.propTypes = {
  window: PropTypes.func,
};

export default Home;
