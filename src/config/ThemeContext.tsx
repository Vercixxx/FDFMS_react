import React from "react";
import { createTheme, Theme } from "@mui/material/styles";

export const ThemeContext = React.createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: createTheme(),
  toggleTheme: () => {},
});
