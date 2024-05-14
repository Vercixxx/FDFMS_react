import * as React from "react";
import { useState } from "react";

// List
import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

// Logo
import logo from "../../assets/logo.png";

// Redux
import { useDispatch } from "react-redux";
import { setCurrentMainComponent } from "../../store/currentMainComponentSlice";

// Icons
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GrainIcon from "@mui/icons-material/Grain";
import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";

type MenuItem = Required<typeof List>["items"][number];

const items: MenuItem[] = [
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
      { label: "Manage states", key: "ManageStates", icon: <LocationCityIcon />},
    ],
  },
  {
    label: "Mailbox",
    key: "mail",
    icon: <EmailIcon />,
  },
];

const HRMenu: React.FC = () => {
  // New list
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = React.useState(items[0]);

  const handleClick = (item: MenuItem) => {
    setSelectedItem(item);

    const isRootItem = items.some((rootItem) => rootItem.key === item.key);

    if (item.children) {
      if (isRootItem) {
        setOpenKeys(openKeys.includes(item.key) ? [] : [item.key]);
      } else if (openKeys.includes(item.key)) {
        setOpenKeys(openKeys.filter((key) => key !== item.key));
        setSelectedItem(item);
      } else {
        setOpenKeys([...openKeys, item.key]);
      }
    } else {
      setOpenKeys([]);
      setSelectedItem(item);
      console.log(item);

      switch (item.key) {
        case "HRAddUserComponent":
          dispatch(
            setCurrentMainComponent({
              value: item.key,
              props: { adding: true },
            })
          );
          break;
        case "ManageUsersComponent":
          dispatch(
            setCurrentMainComponent({
              value: item.key,
              props: { managing: true },
            })
          );
          break;
      }
    }
  };

  const dispatch = useDispatch();

  const goHome = () => {
    const homePath = [
      {
        title: "Home",
        component: "HomePage",
        icon: HomeIcon,
      },
    ];
    dispatch(setCurrentMainComponent({ value: "HomePage" }));
  };

  const renderMenuItem = (item, level = 0) => (
    <div key={item.key}>
      <ListItemButton disableRipple
        onClick={() => handleClick(item)}
        sx={{ color: "white", pl: level * 2 }}
      >
        <ListItem 
          className={`hover:scale-105 active:scale-100 ${
            item.label === selectedItem.label
              ? "transition-colors duration-300 ease-in-out bg-blue-800/50"
              : "transition-colors duration-300 ease-in-out bg-transparent"
          }`}
          sx={{ borderRadius: 2 }}
        >
          <ListItemIcon>
            <span style={{ color: "white", fontSize: "20px" }}>
              {item.icon}
            </span>
          </ListItemIcon>
          <ListItemText primary={item.label} />
          {item.children &&
            (openKeys.includes(item.key) ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
      </ListItemButton>

      {/* SubMenu */}
      {item.children && (
        <Collapse in={openKeys.includes(item.key)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => renderMenuItem(child, level + 1))}
          </List>
        </Collapse>
      )}
    </div>
  );

  return (
    <div>
      {/* 1 */}
      <div className="flex ps-4 ">
        <div>
          <img src={logo} alt="logo" className="h-16 rounded-full" />
        </div>

        <div className=" flex justify-center items-center font-black ">
          HR Management
        </div>
      </div>
      {/* 1 */}
      <div>{selectedItem.label}</div>
      <div className="ms-4">
        <List
          sx={{ width: "100%", maxWidth: 360 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {items.map((item) => renderMenuItem(item))}
        </List>
      </div>
    </div>
  );
};
export default HRMenu;
