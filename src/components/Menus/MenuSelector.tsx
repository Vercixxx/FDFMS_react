import * as React from "react";
import { useState } from "react";

// List
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Logo
import logo from "../../assets/NewLogo.png";

// Redux
import { useDispatch } from "react-redux";
import { setCurrentMainComponent } from "../../store/currentMainComponentSlice";

// Import menus
import { useHRMenuItems } from '../Menus/HRMenu';


type MenuItem = Required<typeof List>["items"][number];

const MyMenu: React.FC = () => {
  const UserMenu = () => {
    const user = sessionStorage.getItem("userData");
    const userObj = JSON.parse(user);
    const userRole = userObj.user_role;

    switch (userRole) {
      case "HR":
        return useHRMenuItems();
      default:
        return [];
    }
  };

  const items = UserMenu();

  // New list
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = React.useState(
    items.length > 0 ? items[0] : null
  );
  const dispatch = useDispatch();

  const goHome = () => {
    dispatch(
      setCurrentMainComponent({
        value: "HomePage",
        props: {},
      })
    );
  };

  const handleClick = (item: MenuItem) => {
    const isRootItem = items.some((rootItem) => rootItem.key === item.key);

    if (item.children) {
      if (isRootItem) {
        if (openKeys.includes(item.key)) {
          setOpenKeys(openKeys.filter((key) => key !== item.key));
        } else {
          setOpenKeys([item.key]);
        }
      } else {
        if (!openKeys.includes(item.key)) {
          setOpenKeys([...openKeys, item.key]);
        }
      }
    } else {
      const selectedParentKey = items.find((rootItem) =>
        rootItem.children?.some((child) =>
          child.children?.some((grandChild) => grandChild.key === item.key)
        )
      )?.key;
      if (selectedParentKey && !openKeys.includes(selectedParentKey)) {
        setOpenKeys([...openKeys, selectedParentKey]);
      }

      setSelectedItem(item);
      console.log(item.key);

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
        case "ManageCountriesComponent":
          dispatch(
            setCurrentMainComponent({
              value: item.key,
              props: {},
            })
          );
          break;
        case "ManageStatesComponent":
          dispatch(
            setCurrentMainComponent({
              value: item.key,
              props: {},
            })
          );
          break;
      }
    }
  };

  const renderMenuItem = (item, level = 0) => (
    <div key={item.key}>
      <ListItemButton
        disableRipple
        onClick={() => handleClick(item)}
        sx={{ color: "white", pl: level * 2 }}
      >
        <ListItem
          className={`hover:scale-105 hover:bg-blue-800/50 active:scale-100 ${
            item.label === selectedItem.label
              ? "transition-colors duration-150 ease-in-out bg-blue-800/50"
              : "transition-colors duration-150 ease-in-out bg-transparent"
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
      <div className="flex items-center cursor-pointer" onClick={goHome}>
        <div>
          <img src={logo} alt="logo" className="w-32 rounded-full" />
        </div>

        <div className=" justify-center items-center font-black text-white">
          <div className="font-bold text-sm ">
            Food Delivery Fleet Management System
          </div>
          <div className="text-sm font-extralight">HR Management</div>
        </div>
      </div>
      {/* 1 */}

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

export default MyMenu;
