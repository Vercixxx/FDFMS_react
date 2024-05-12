import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Axios
import "./config/axios";

// Router
import router from "./router/router";
import { RouterProvider } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);