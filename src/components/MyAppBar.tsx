import * as React from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Logo
import logo from "../assets/logo.png";

// Icons
import Icon from "@mdi/react";
import { mdiThemeLightDark, mdiLogout } from "@mdi/js";

// Components
import MyBreadcrumb from "./MyBreadcrumb";

// Logout modal
import LogOutModal from "./LogOutModal";

const MyAppBar = () => {
  const [openLogOutModal, setOpenLogOutModal] = React.useState(false);

  const showLogOutModal = () => {
    setOpenLogOutModal(true);
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar
    //     position="fixed"
    //     className="mb-5"
    //     sx={{ bgcolor: "rgba(50,100 ,2,0.3)", color: "black" }}
    //   >
    <div className="grid grid-cols-12 gap-4 py-2 bg-green-500 text-white shadow-md">
      {/* 1 */}
      <div className="col-span-2 flex justify-start items-center ps-4 text-justify text-sm font-black">
        <img src={logo} alt="logo" className="h-16 rounded-full" />
        Food Delivery Fleet Management System
      </div>
      {/* 1 */}

      {/* 2 */}
      <div className="col-span-9 flex justify-start items-center">
        <MyBreadcrumb />
      </div>
      {/* 2 */}

      {/* 3 */}
      <div className="col-span-1 flex justify-end items-center pe-4">
        {/* Theme */}
        <IconButton color="inherit" className="hover:scale-110">
          <Icon path={mdiThemeLightDark} size={1} />
        </IconButton>
        {/* Theme */}

        {/* Logout */}
        <LogOutModal
          openModal={openLogOutModal}
          setOpenModal={setOpenLogOutModal}
        />
        <IconButton
          color="inherit"
          onClick={showLogOutModal}
          className="hover:scale-110"
        >
          <Icon path={mdiLogout} size={1} />
        </IconButton>
        {/* Logout */}
      </div>
      {/* 3 */}
    </div>
    //   </AppBar>
    // </Box>
  );
};

export default MyAppBar;
