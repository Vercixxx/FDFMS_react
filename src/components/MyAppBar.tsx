import * as React from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
    <div className="grid grid-cols-12 gap-4 py-2  text-white ">
      {/* 2 */}
      <div className="col-span-10 flex justify-start items-center">
        <MyBreadcrumb />
      </div>
      {/* 2 */}

      {/* 3 */}
      <div className="col-span-2 flex justify-end items-center pe-4">
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
  );
};

export default MyAppBar;
