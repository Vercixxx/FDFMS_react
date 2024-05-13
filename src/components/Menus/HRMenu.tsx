import * as React from "react";
import { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { setCurrentMainComponent } from "../../store/currentMainComponentSlice";

// Ant Design
import type { MenuProps } from "antd";
import { ConfigProvider, Menu, Button } from "antd";

// Icons
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Users",
    key: "SubMenu",
    icon: <GroupIcon />,
    children: [
      {
        type: "group",
        label: "Add User",
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
        children: [{ label: "Manage", key: "ManageUsersComponent" }],
      },
    ],
  },
  {
    label: "Other",
    key: "otherMenu",
    icon: <AppstoreOutlined />,
    children: [
      { label: "Manage countries", key: "ManageCountries" },
      { label: "Manage states", key: "ManageStates" },
    ],
  },
  {
    label: "Mailbox",
    key: "mail",
    icon: <MailOutlined />,
  },
];

const HRMenu: React.FC = () => {
  const [current, setCurrent] = useState("");

  const dispatch = useDispatch();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);

    switch (e.key) {
      case "HRAddUserComponent":
        dispatch(
          setCurrentMainComponent({
            value: e.key,
            props: { adding: true },
          })
        );
        break;
      case "ManageUsersComponent":
        dispatch(
          setCurrentMainComponent({
            value: e.key,
            props: { managing: true },
          })
        );
        break;
    }
  };

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
  return (
    <div>
      <div align="center">
        <button
          className="mx-2 mt-2 px-3 py-1 rounded-lg hover:scale-105 bg-green-500 flex tracking-wide"
          onClick={goHome}
        >
          <HomeIcon />
          Home
        </button>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Menu: {
              iconSize: 20,
              groupTitleFontSize: 18,
            },
          },
        }}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={items}
          className="bg-transparent text-xl tracking-wide"
        />
      </ConfigProvider>
    </div>
  );
};

export default HRMenu;
