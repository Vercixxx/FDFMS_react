import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

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
    const token = JSON.parse(sessionStorage.getItem('token'));
    if (token && token.access) {
        axios.defaults.headers.common['Authorization'] = `JWT ${token.access}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
  }, []); 

  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);