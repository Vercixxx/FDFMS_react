import * as React from "react";

// Mui
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

// i18n
import { useTranslation } from "react-i18next";

// Theme
import { ThemeContext } from "../../config/ThemeContext";
import styled from "@emotion/styled";
import Switch from "@mui/material/Switch";
import { alpha } from "@mui/material";

interface ManageUsersSettingsDialogProps {
  selectedPageSize: number;
  pageSizeOptions: number[];
  changePageSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedExportType: string;
  changeExportTypeOptions: any[];
  changeExportType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  exportDetails: boolean;
  switchExportDetails: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRole: string;
  roleOptions: any[];
  changeRole: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedStatus: string;
  statusOptions: any[];
  changeStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  exportDetails,
  switchExportDetails,
  selectedRole,
  roleOptions,
  changeRole,
  selectedStatus,
  statusOptions,
  changeStatus,
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
    <div className={`space-y-8 ${darkMode ? "text-white" : "text-black"}`}>
      {/* Items per page */}
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

      {/* Export type */}
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

      {/* Export with details */}
      <TextField
        fullWidth
        id="outlined-select-exportDetails"
        select
        label={t("Export with details")}
        defaultValue={exportDetails.toString()}
        onChange={switchExportDetails}
        disabled={true}
      >
        <MenuItem key={false} value={false}>
          {t("No")}
        </MenuItem>
        <MenuItem key={true} value={true}>
          {t("Yes")}
        </MenuItem>
      </TextField>

      {/* User role */}
      <TextField
        fullWidth
        id="outlined-select-role"
        select
        label={t("User role")}
        defaultValue={selectedRole}
        onChange={changeRole}
      >
        {roleOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* User status */}
      <TextField
        fullWidth
        id="outlined-select-status"
        select
        label={t("User status")}
        defaultValue={selectedStatus}
        onChange={changeStatus}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.text}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};
