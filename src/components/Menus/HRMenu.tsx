import * as React from "react";

// Icons
import GroupIcon from "@mui/icons-material/Group";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GrainIcon from "@mui/icons-material/Grain";
import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";

// i18n
import { useTranslation } from "react-i18next";

type MenuItem = Required<typeof List>["items"][number];

export const useHRMenuItems = (): MenuItem[] => {
  const { t } = useTranslation();

  return [
    {
      label: t("Users"),
      key: "SubMenu",
      icon: <GroupIcon />,
      children: [
        {
          type: "group",
          label: t("Add User"),
          icon: <PersonAddAltIcon />,
          children: [
            { label: t("HR"), key: "HRAddUserComponent" },
            { label: t("Payroll"), key: "AddPayrollUser" },
            { label: t("Asset"), key: "AddAssetUser" },
            { label: t("Client"), key: "AddClientUser" },
            { label: t("Manager"), key: "AddManagerUser" },
            { label: t("Driver"), key: "AddDriverUser" },
          ],
        },
        {
          type: "group",
          label: t("Manage Users"),
          icon: <ManageAccountsIcon />,
        },
      ],
    },
    {
      label: t("Other"),
      key: "otherMenu",
      icon: <GrainIcon />,
      children: [
        {
          label: t("Manage countries"),
          key: "ManageCountriesComponent",
          icon: <FlagIcon />,
        },
        {
          label: t("Manage states"),
          key: "ManageStatesComponent",
          icon: <LocationCityIcon />,
        },
      ],
    },
    {
      label: t("Mailbox"),
      key: "mail",
      icon: <EmailIcon />,
    },
  ];
};