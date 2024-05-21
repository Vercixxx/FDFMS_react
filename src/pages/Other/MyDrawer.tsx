import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../../store/drawerSlice";
import { ConfigProvider, Drawer } from "antd";

// Theme
import { ThemeContext } from "../../config/ThemeContext";

const MyDrawer = (props) => {
  const dispatch = useDispatch();
  const { isOpen, title, component, width, loading } = useSelector((state) => state.drawer);

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme

  return (
    <ConfigProvider
      theme={{
        components: {
          Drawer: {
            colorText: darkMode ? "#fff" : "#333",
            colorIcon: darkMode ? "#fff" : "#333",
            colorIconHover: darkMode ? "#ccc" : "#111",
            fontSizeLG: 20,
          },
        },
      }}
    >
      <Drawer
        title={title}
        width={width}
        loading={loading}
        onClose={handleClose}
        open={isOpen}
        maskClosable={false}
        styles={{
          content: {
            backgroundColor: darkMode ? "#333" : "#fff",
            color: darkMode ? "#333" : "#333",
          },

          mask: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(1px)",
          },
        }}
      >
        {component}
      </Drawer>
    </ConfigProvider>
  );
};

export default MyDrawer;
