import * as React from "react";

// Icons
import GroupIcon from "@mui/icons-material/Group";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GrainIcon from "@mui/icons-material/Grain";
import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";

type MenuItem = Required<typeof List>["items"][number];

const HRMenuItems: MenuItem[] = [
  {
    label: "Users",
    key: "SubMenu",
    icon: <GroupIcon />,
    children: [
      {
        type: "group",
        label: "Add User",
        icon: <PersonAddAltIcon />,
        children: [
          { label: "HR", key: "HRAddUserComponent" },
          { label: "Payroll", key: "AddPayrollUser" },
          { label: "Asset", key: "AddAssetUser" },
          { label: "Client", key: "AddClientUser" },
          { label: "Manager", key: "AddManagerUser" },
          { label: "Driver", key: "AddDriverUser" },
        ],
      },
      {
        type: "group",
        label: "Manage Users",
        icon: <ManageAccountsIcon />,
      },
    ],
  },
  {
    label: "Other",
    key: "otherMenu",
    icon: <GrainIcon />,
    children: [
      { label: "Manage countries", key: "ManageCountries", icon: <FlagIcon /> },
      {
        label: "Manage states",
        key: "ManageStates",
        icon: <LocationCityIcon />,
      },
    ],
  },
  {
    label: "Mailbox",
    key: "mail",
    icon: <EmailIcon />,
  },
];


export default HRMenuItems;
