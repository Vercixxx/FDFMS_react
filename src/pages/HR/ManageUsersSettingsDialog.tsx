import * as React from "react";

// Mui
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

// i18n
import { useTranslation } from "react-i18next";

// Theme
import { ThemeContext } from "../../config/ThemeContext";

interface ManageUsersSettingsDialogProps {
  selectedPageSize: number;
  pageSizeOptions: number[];
  changePageSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedExportType: string;
  changeExportTypeOptions: any[];
  changeExportType: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ManageUsersSettingsDialog: React.FC<
  ManageUsersSettingsDialogProps
> = ({
  selectedPageSize,
  pageSizeOptions,
  changePageSize,
  selectedExportType,
  changeExportTypeOptions,
  changeExportType,
}) => {
  const setPageSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePageSize(e);
  };

  const setExportType = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeExportType(e);
  };

  // i18n
  const { t } = useTranslation();

  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme

  return (
    <div className={`space-y-8 ${darkMode ? 'text-white' : 'text-black'}`}>

      <TextField
        fullWidth
        id="outlined-select-PageSize"
        select
        label={t("Items per page")}
        defaultValue={selectedPageSize}
        onChange={setPageSize}
      >
        {pageSizeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        id="outlined-select-exportType"
        select
        label={t("Export type")}
        defaultValue={selectedExportType}
        onChange={setExportType}
      >
        {changeExportTypeOptions.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {t(option.text)}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};
