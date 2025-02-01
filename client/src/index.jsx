import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TasksContextProvider } from "./context/TasksContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
