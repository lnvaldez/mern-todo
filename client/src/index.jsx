import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TasksContextProvider } from "./context/TasksContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TasksContextProvider>
      <App />
    </TasksContextProvider>
  </React.StrictMode>
);
