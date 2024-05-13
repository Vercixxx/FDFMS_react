import * as React from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Icons
import Icon from "@mdi/react";
import { mdiThemeLightDark, mdiLogout } from "@mdi/js";

// Components
import { MyBreadcrumb } from "./MyBreadcrumb";

// Logout modal
import LogOutModal from "./LogOutModal";

const MyAppBar = () => {
  const [openLogOutModal, setOpenLogOutModal] = React.useState(false);

  const showLogOutModal = () => {
    setOpenLogOutModal(true);
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "rgba(50,100 ,2,0.7)" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* <MyBreadcrumb /> */}
            Dashboard
          </Typography>

          {/* Theme */}
          <IconButton color="inherit">
            <Icon path={mdiThemeLightDark} size={1} />
          </IconButton>

          {/* Logout */}
          <LogOutModal openModal={openLogOutModal} setOpenModal={setOpenLogOutModal} />
          <IconButton color="inherit" onClick={showLogOutModal}>
            <Icon path={mdiLogout} size={1} />
          </IconButton>
        </Toolbar>

      </AppBar>
    </Box>
  );
};

export default MyAppBar;
