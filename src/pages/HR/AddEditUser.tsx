import React from "react";

// Theme
import { ThemeContext } from "../../config/ThemeContext";

// Snackbars
import { useSnackbarContext } from "./../../components/SnackbarContext";

// i18n
import { useTranslation } from "react-i18next";

const AddEditUserComponent: React.FC = () => {
  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme

  // i18n
  const { t } = useTranslation();

  // Snackbars
  const { showSnackbar } = useSnackbarContext();

  return <div className={darkMode ? "text-white" : "text-black"}></div>;
};

export default AddEditUserComponent;
