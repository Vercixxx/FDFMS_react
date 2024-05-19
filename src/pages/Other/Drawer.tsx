import React, { createContext, useState, useContext, ReactNode } from "react";
import { Drawer } from "antd";

interface DrawerContextProps {
  open: boolean;
  showDrawer: () => void;
  closeDrawer: () => void;
  setDrawerContent: (content: ReactNode) => void;
  drawerContent: ReactNode;
}

const DrawerContext = createContext<DrawerContextProps>({
  open: false,
  showDrawer: () => {
    console.log("Show Drawer");
  },
  closeDrawer: () => {},
  setDrawerContent: () => {},
  drawerContent: null,
});

const DrawerProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<ReactNode>(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <DrawerContext.Provider
      value={{ open, showDrawer, closeDrawer, setDrawerContent, drawerContent }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

const DrawerComponent: React.FC = () => {
  const { open, closeDrawer, drawerContent } = useContext(DrawerContext);

  return (
    <Drawer title="Basic Drawer" onClose={closeDrawer} visible={open}>
      {drawerContent || <p>Some contents...</p>}
    </Drawer>
  );
};

export { DrawerProvider, DrawerComponent, DrawerContext };
