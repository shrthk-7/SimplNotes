import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthContextProvider } from "./context/auth-context";
import { ToastContextProvider } from "./context/toast-context";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ToastContextProvider>
);
