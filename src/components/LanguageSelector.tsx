import React, { useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Ant
import type { MenuProps } from "antd";
import { ConfigProvider, Dropdown, Space, Typography } from "antd";

// Theme
import { ThemeContext } from "../config/ThemeContext";

import { useTranslation } from "react-i18next";

const items: MenuProps["items"] = [
  { key: "EN", label: "English" },
  { key: "PL", label: "Polish" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = React.useState("");

  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme

  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    i18n.changeLanguage(savedLanguage);
    setLanguage(savedLanguage);
  }, [i18n]);

  const handleChange = async (key: MenuInfo) => {
    const newLanguage = key.key || "en";

    setLanguage(newLanguage);

    await i18n.changeLanguage(newLanguage);
    localStorage.setItem("i18nextLng", newLanguage);
    window.location.reload();
  };



    

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Dropdown: {
              colorBgElevated: darkMode ? "#333" : "#fff",
              colorText: darkMode ? "#fff" : "#111",
              controlItemBgActive: darkMode ? "#555" : "#f0f0f0",
              controlItemBgHover: darkMode ? "#444" : "#f0f0f0",
              
              colorPrimary: darkMode ? "#fff" : "#333",
              fontSize: 18,
              paddingBlock: 8,
            },
          },
        }}
      >
        <Dropdown
          menu={{
            items,
            selectable: true,
            onClick: handleChange,
          }}
          
        >
          <Typography.Link>
            <Space>
              <span className={darkMode ? 'text-white rounded-full px-3 py-3 ':'text-black rounded-3xl px-3 py-3 '}>
              {language === "EN" ? "EN" : "PL"}
              </span>
              {/* FLAG??? */}
            </Space>
          </Typography.Link>
        </Dropdown>
      </ConfigProvider>
    </div>
  );
};

export default LanguageSelector;
