import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeDrawer } from '../../store/drawerSlice';
import { Drawer } from 'antd';

const MyDrawer = (props) => {
  const dispatch = useDispatch();
  const { isOpen, title, component } = useSelector((state) => state.drawer);

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer
      title={title}
      onClose={handleClose}
      open={isOpen}
      maskClosable={false}
      className=""
    >
      {component}
    </Drawer>
  );
};

export default MyDrawer;