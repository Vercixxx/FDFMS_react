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
  const [darkMode, setDarkMode] = React.useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  // Theme

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="theme-transition">
          <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
          </Provider>
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
