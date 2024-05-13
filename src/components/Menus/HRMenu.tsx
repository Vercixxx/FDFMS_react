import * as React from "react";
import { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { setCurrentMainComponent } from "../../store/currentMainComponentSlice";

// Ant Design
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu } from "antd";

// Icons
import GroupIcon from "@mui/icons-material/Group";

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

const ExampleMenu: React.FC = () => {
  const [current, setCurrent] = useState("");

  const dispatch = useDispatch();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    switch (e.key) {
      case "HRAddUserComponent":
        dispatch(
          setCurrentMainComponent({ value: e.key, props: { adding: true } })
        );
        break;
      case "ManageUsersComponent":
        dispatch(
          setCurrentMainComponent({ value: e.key, props: { managing: true } })
        );
        break;
      default:
        console.log("No component selected");
    }
  };

  return (
    <div>
      <h1 align="center">HR Menu</h1>

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
          className="bg-transparent text-xl"
        />
      </ConfigProvider>
    </div>
  );
};

export default ExampleMenu;
