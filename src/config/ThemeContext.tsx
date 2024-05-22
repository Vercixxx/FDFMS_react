import React from "react";
import { createTheme, Theme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: 'light',

  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#222', 
    },
  },
});

export const ThemeContext = React.createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: darkTheme,
  toggleTheme: () => {},
});