import React, { useState } from "react";
import { ConfigProvider, Modal, Space } from "antd";
import Button from "@mui/material/Button";

// LogOutScript
import { SignOutUser } from "../scripts/user";

// Router
import { useNavigate } from "react-router-dom";

// Theme
import { ThemeContext } from "../config/ThemeContext";

// i18n
import { useTranslation } from "react-i18next";

interface LogOutModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const LogOutModal: React.FC<LogOutModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  //Navigate
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await SignOutUser();
    navigate("/");
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme

  // i18n
  const { t } = useTranslation();

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              colorBgMask: "rgba(0, 0, 0, 0.6)",
              contentBg: darkMode ? "#333" : "#fff",
              headerBg: darkMode ? "#333" : "#fff",
              titleColor: darkMode ? "#fff" : "#333",
              titleFontSize: "1.4rem",
              colorText: darkMode ? "#fff" : "#333",
            },
          },
        }}
      >
        {" "}
        <Modal
          open={openModal}
          title="Logout"
          onOk={handleLogOut}
          onCancel={handleCancel}
          closable={false}
          maskClosable={false}
          footer={[
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="text"
                color="success"
                className="hover:scale-105 w-48"
                onClick={handleCancel}
              >
                {t("No")}
              </Button>
              <Button
                variant="contained"
                color="error"
                className="hover:scale-105 w-48"
                onClick={handleLogOut}
              >
                {t("Yes")}
              </Button>
            </div>,
          ]}
        >
            {t("Are you sure you want to logout?")}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default LogOutModal;
