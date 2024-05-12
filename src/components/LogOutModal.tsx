import React, { useState } from "react";
import { Button, Modal, Space } from "antd";

// LogOutScript
import { SignOutUser } from "../scripts/user";

// Router
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <Modal
        open={openModal}
        title="Logout"
        onOk={handleLogOut}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        Are you sure you want to logout?
      </Modal>
    </>
  );
};

export default LogOutModal;
