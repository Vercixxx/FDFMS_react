import { Button, IconButton } from "@mui/material";
import React from "react";

// Theme
import { ThemeContext } from "../config/ThemeContext";

// Icons
import LockResetIcon from "@mui/icons-material/LockReset";

const ProfileDrawer: React.FC = () => {
  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme



  return (
    <div className={darkMode ? "text-white" : "text-black"}>


      <div className="flex justify-center">
        <Button
          color="info"
          className="hover:scale-110"
          startIcon={<LockResetIcon />}
        >
          Reset password
        </Button>
      </div>
    </div>
  );
};

export default ProfileDrawer;
