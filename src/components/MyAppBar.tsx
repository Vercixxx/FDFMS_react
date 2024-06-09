import * as React from "react";
import { Zoom, Tooltip, IconButton } from "@mui/material";

// Theme
import { ThemeContext } from "../config/ThemeContext";

// Icons
import Icon from "@mdi/react";
import { mdiThemeLightDark, mdiLogout, mdiFaceManProfile } from "@mdi/js";

// Components
import MyBreadcrumb from "./MyBreadcrumb";

// Logout modal
import LogOutModal from "./LogOutModal";

// i18n
import LanguageSelector from "./LanguageSelector";
import { t } from "i18next";

// MyDrawer
import { useDispatch } from "react-redux";
import { openDrawer } from "../store/drawerSlice";
import ProfileDrawer from "./ProfileDrawer";

const MyAppBar = () => {
  const [openLogOutModal, setOpenLogOutModal] = React.useState(false);

  const showLogOutModal = () => {
    setOpenLogOutModal(true);
  };

  // Theme
  const { toggleTheme } = React.useContext(ThemeContext);
  // Theme

  // Dispatch
  const dispatch = useDispatch();
  // Dispatch

  return (
    <div className="grid grid-cols-12 gap-4 py-2 ">
      {/* 2 */}
      <div className="col-span-10 flex justify-start items-center">
        <MyBreadcrumb />
      </div>
      {/* 2 */}

      {/* 3 */}
      <div className="col-span-2 flex justify-end items-center pe-4">
        {/* User profile */}
        <IconButton
          color="inherit"
          className="hover:scale-110"
          onClick={() => {
            const userData = JSON.parse(sessionStorage.getItem("userData"));

            dispatch(
              openDrawer({
                title: userData.user_role + " - " + userData.first_name + " " + userData.last_name,
                component: <ProfileDrawer />,
              })
            );
          }}
        >
          <Tooltip title="Profile" arrow TransitionComponent={Zoom}>
            <Icon path={mdiFaceManProfile} size={1} />
          </Tooltip>
        </IconButton>
        {/* User profile */}

        {/* i18n */}
        <LanguageSelector />
        {/* i18n */}

        {/* Theme */}
        <IconButton
          color="inherit"
          className="hover:scale-110"
          onClick={toggleTheme}
        >
          <Tooltip title="Change theme" arrow TransitionComponent={Zoom}>
            <Icon path={mdiThemeLightDark} size={1.3} />
          </Tooltip>
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
          <Tooltip title="Log out" arrow TransitionComponent={Zoom}>
            <Icon path={mdiLogout} size={1.3} />
          </Tooltip>
        </IconButton>
        {/* Logout */}
      </div>
      {/* 3 */}
    </div>
  );
};

export default MyAppBar;
