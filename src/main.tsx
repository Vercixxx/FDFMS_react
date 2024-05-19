import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Theme
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeContext } from "./config/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";

// Axios
import axios from "axios";
import "./config/axios";

// Router
import router from "./router/router";
import { RouterProvider } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store/index";

// Snackbars
import { SnackbarProvider } from "notistack";
import { SnackbarProvider as CustomSnackbarProvider } from "./components/SnackbarContext";

// Drawer
import { DrawerProvider } from "./pages/Other/Drawer";

function App() {
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token && token.access) {
      axios.defaults.headers.common["Authorization"] = `JWT ${token.access}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }

    document.body.classList.add("theme-transition");
  }, []);

  // Theme
  const [darkMode, setDarkMode] = React.useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleTheme = () => {
    localStorage.setItem("darkMode", String(!darkMode));
    setDarkMode(!darkMode);
  };
  // Theme

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="theme-transition">
          <DrawerProvider>
            <Provider store={store}>
              <SnackbarProvider maxSnack={3}>
                <CustomSnackbarProvider>
                  <RouterProvider router={router}></RouterProvider>
                </CustomSnackbarProvider>
              </SnackbarProvider>
            </Provider>
          </DrawerProvider>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
