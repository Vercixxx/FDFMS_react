import * as React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";


// Menus
import HRDrawer from "./Menus/HRMenu";

export default function MyDrawer() {
  return (
    <div>
        <HRDrawer />
    </div>
  );
}
