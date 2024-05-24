import React from "react";
import { Modal, ConfigProvider } from "antd";

// Theme
import { ThemeContext } from "../../config/ThemeContext";

import Button from "@mui/material/Button";

interface DialogDeleteData {
  title: string;
  content: string;
  okText: string;
  cancelText: string;
  onOk: () => void;
  onCancel: () => void;
}

interface DeleteConfirmModalProps {
  dialogDeleteData: DialogDeleteData;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  dialogDeleteData,
  open,
  setOpen,
}) => {
  const { title, content, okText, cancelText, onOk, onCancel } =
    dialogDeleteData;

  const handleOk = () => {
    onOk();
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setOpen(false);
  };

  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme

  return (
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
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={okText}
        cancelText={cancelText}
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
              {cancelText}
            </Button>
            <Button
              variant="contained"
              color="error"
              className="hover:scale-105 w-48"
              onClick={handleOk}
            >
              {okText}
            </Button>
          </div>,
        ]}
      >
        {content}
      </Modal>
    </ConfigProvider>
  );
};

export default DeleteConfirmModal;
