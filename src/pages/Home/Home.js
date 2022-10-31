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
import { Paper, TextField } from "@mui/material";

import logo from "./../../assets/logo-cm.png";
import { useForm } from "react-hook-form";

const drawerWidth = 240;
const navItems = ["Login"];

function Home(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [opened, setOpened] = React.useState(false);
  const [accountTitle, setAccountTitle] = React.useState(`Login`);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleBtnClicked = (item) => {
    if (item === "Login") {
      setOpened(true);
    }
  };

  const onSubmit = (data) => {};

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
        <Box component="main" sx={{ p: 3 }}>
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

            <Paper sx={{ mt: 2, padding: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Email"
                  sx={{ mb: 2 }}
                  variant="outlined"
                  fullWidth
                  {...register("email", {
                    required: "Email required",
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />

                <TextField
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  variant="outlined"
                  fullWidth
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginY: 1,
                    mt: 2,
                  }}
                >
                  <span
                    onClick={() => null}
                    style={{
                      textDecoration: "underline",
                      color: "darkblue",
                      fontStyle: "italic",
                      cursor: "pointer",
                      fontSize: 16,
                    }}
                  >
                    Create Account
                  </span>

                  <Button
                    type="submit"
                    sx={{ backgroundColor: "#434670" }}
                    variant="contained"
                  >
                    Login
                  </Button>
                </Box>
              </form>
            </Paper>
          </Modal>
        </Box>
      </Box>
    </>
  );
}

Home.propTypes = {
  window: PropTypes.func,
};

export default Home;
