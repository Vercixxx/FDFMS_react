import * as React from "react";
import { useState } from "react";

// Ant Design
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
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
          { label: "HR", key: "AddHRUser" },
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
        children: [{ label: "Manage", key: "ManageUsers" }],
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

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
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
  );
};

export default ExampleMenu;
